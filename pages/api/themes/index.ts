import { checkApiKey } from "@/lib/apiKey";

import handleError from "@/lib/errorHandling";

import { Theme } from "@/lib/types";
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
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!checkApiKey(req, res)) return;

  switch (req.method) {
    case "GET":
      try {
        const {
          id,
          page = 1,
          limit = 10,
          order = "ASC",
          slug,
          category,
        }: Query = req.query;

        let query = `SELECT * FROM themes`;
        let countQuery = `SELECT COUNT(*) FROM themes`;

        const values: (number | string)[] = [];
        const countValues: (number | string)[] = [];

        if (id) {
          const valueIndex = values.length + 1;
          query += ` WHERE id = $${valueIndex}`;
          countQuery += ` WHERE id = $${valueIndex}`;
          values.push(Number(id));
          countValues.push(Number(id));
        }

        if (slug) {
          const valueIndex = values.length + 1;
          query += ` WHERE slug = $${valueIndex}`;
          countQuery += ` WHERE slug = $${valueIndex}`;
          values.push(slug);
          countValues.push(slug);
        }

        if (category) {
          const valueIndex = values.length + 1;
          query += ` WHERE category = $${valueIndex}`;
          countQuery += ` WHERE category = $${valueIndex}`;
          values.push(category);
          countValues.push(category);
        }

        query += ` ORDER BY updated_at ${order}`;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const offset = (pageNumber - 1) * limitNumber;
        const valueIndex = values.length + 1;
        query += ` LIMIT $${valueIndex} OFFSET $${valueIndex + 1}`;
        values.push(limitNumber, offset);

        const { rows } = await sql.query(query, values);
        const { rows: total } = await sql.query(countQuery, countValues);
        return res.status(200).json({
          success: true,
          data: rows,
          total_rows: Number(total[0].count),
          page: pageNumber,
          limit: limitNumber,
        });
      } catch (error) {
        handleError(res, error);
      }

    case "POST":
      try {
        const { name, thumbnail, category } = req.body;

        const slug = createSlug(name);

        const { rows } = await sql.query(
          `INSERT INTO themes (name, slug, thumbnail, category) VALUES ($1, $2, $3, $4) RETURNING *;`,
          [name, slug, thumbnail, category]
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
        const { id, name, thumbnail, category } = req.body;

        if (!id && !name && !thumbnail && !category) {
          return handleError(
            res,
            new Error("Required fields: id, name, thumbnail, category.")
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
          SET name = $1, slug = $2, thumbnail = $3, category = $4
          WHERE id = $5
          RETURNING *;`;

        const slug = createSlug(name);

        const { rows } = await sql.query({
          text,
          values: [name, slug, thumbnail, category, id],
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

export default handler;
