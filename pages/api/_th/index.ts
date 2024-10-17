import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";

import { ApiHandler, Theme } from "@/lib/types";
import { createSlug } from "@/utils/createSlug";
import { del } from "@vercel/blob";
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

interface Query {
  id?: number;
  page?: number;
  limit?: number;
  order?: string;
  slug?: string;
  category?: string;
  package_id?: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const {
          id,
          page,
          limit,
          order = "ASC",
          slug,
          category,
          package_id,
        }: Query = req.query;

        let query = `SELECT * FROM themes`;
        let countQuery = `SELECT COUNT(*) FROM themes`;

        const values: (number | string)[] = [];
        const countValues: (number | string)[] = [];

        const conditions = [];
        const countConditions = [];

        if (id) {
          const valueIndex = values.length + 1;
          conditions.push(`id = $${valueIndex}`);
          countConditions.push(`id = $${valueIndex}`);
          values.push(Number(id));
          countValues.push(Number(id));
        }

        if (slug) {
          const valueIndex = values.length + 1;
          conditions.push(`slug = $${valueIndex}`);
          countConditions.push(`slug = $${valueIndex}`);
          values.push(slug);
          countValues.push(slug);
        }

        if (category) {
          const valueIndex = values.length + 1;
          conditions.push(`category = $${valueIndex}`);
          countConditions.push(`category = $${valueIndex}`);
          values.push(category);
          countValues.push(category);
        }

        if (package_id) {
          const valueIndex = values.length + 1;
          conditions.push(`$${valueIndex} = ANY(package_ids)`);
          countConditions.push(`$${valueIndex} = ANY(package_ids)`);
          values.push(package_id);
          countValues.push(package_id);
        }

        if (conditions.length > 0) {
          query += " WHERE " + conditions.join(" AND ");
          countQuery += " WHERE " + countConditions.join(" AND ");
        }

        query += ` ORDER BY updated_at ${order}`;

        if (page && limit) {
          const limitNumber = Number(limit);
          const pageNumber = Number(page);
          const offset = (pageNumber - 1) * limitNumber;
          const valueIndex = values.length + 1;
          query += ` LIMIT $${valueIndex} OFFSET $${valueIndex + 1}`;
          values.push(limitNumber, offset);
        }

        const { rows } = await sql.query(query, values);
        const { rows: packages } = await sql.query(`SELECT * FROM packages`);

        const themes = rows.map((theme: Theme) => {
          const packageIdsSet = new Set(theme.package_ids);
          const filteredPackage = packages.filter((pkg) =>
            packageIdsSet.has(pkg.id)
          );

          return {
            ...theme,
            packages: filteredPackage,
          };
        });

        const { rows: total } = await sql.query(countQuery, countValues);

        if (limit && page) {
          return res.status(200).json({
            success: true,
            data: themes,
            total_rows: Number(total[0].count),
            page: Number(page),
            limit: Number(page),
          });
        } else {
          return res.status(200).json({
            success: true,
            data: themes,
            total_rows: Number(total[0].count),
          });
        }
      } catch (error) {
        handleError(res, error);
      }

    case "POST":
      try {
        const { name, thumbnail, category, package_ids } = req.body;

        const slug = createSlug(name);

        const { rows } = await sql.query(
          `
            INSERT INTO themes (name, slug, thumbnail, category, package_ids) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *;`,
          [name, slug, thumbnail, category, package_ids]
        );

        return res.status(200).json({
          success: true,
          data: rows[0],
          name,
          thumbnail,
          category,
        });
      } catch (error) {
        handleError(res, error);
      }
    case "PUT":
      try {
        const { id, name, thumbnail, category, package_ids } = req.body;

        if (!id && !name && !thumbnail && !category) {
          return handleError(
            res,
            new Error("Please fill up the required field.")
          );
        }

        const { rows: currentThemes } = await sql.query(
          `SELECT * FROM themes WHERE id = $1`,
          [Number(id)]
        );

        if (!currentThemes[0]) {
          return handleError(res, new Error("Theme not found"));
        }

        const theme: Theme = currentThemes[0];

        if (theme.thumbnail && theme.thumbnail !== thumbnail) {
          await del(theme.thumbnail);
        }

        const text = `
          UPDATE themes
          SET name = $1, slug = $2, thumbnail = $3, category = $4, package_ids = $5
          WHERE id = $6
          RETURNING *;`;

        const slug = createSlug(name);

        const { rows } = await sql.query({
          text,
          values: [name, slug, thumbnail, category, package_ids, id],
        });

        return res.status(200).json({
          success: true,
          data: rows[0],
        });
      } catch (error) {
        handleError(res, error);
      }
    case "DELETE":
      try {
        const { id } = req.query;

        if (!id || isNaN(Number(id))) {
          return handleError(res, new Error("Invalid ID provided."));
        }

        const { rows: currentTheme } = await sql`
          SELECT * FROM themes WHERE id = ${Number(id)}
        `;

        if (!currentTheme.length) {
          return handleError(
            res,
            new Error("Theme does not exist with the provided ID.")
          );
        }

        const thumbnailURL = currentTheme[0].thumbnail;
        if (thumbnailURL) await del(thumbnailURL);

        const { rows } = await sql`
          DELETE FROM themes WHERE id = ${Number(id)} RETURNING *;
        `;

        return res.status(200).json({
          success: true,
          message: "Theme deleted successfully",
          data: rows[0],
        });
      } catch (error) {
        handleError(res, error);
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authenticateUser(handler as ApiHandler);
