import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";

import { ApiHandler, Theme } from "@/lib/types";
import { createSlug } from "@/utils/createSlug";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import { getCloudinaryID } from "@/utils/getCloudinaryID";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const env = process.env.NODE_ENV || "development";

interface Query {
  id?: number;
  page?: number;
  limit?: number;
  order?: string;
  slug?: string;
  package_id?: number;
  theme_category_id?: number;
  active?: string;
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
          package_id,
          theme_category_id,
          active,
        }: Query = req.query;

        const filters: string[] = [];
        const values: (number | string | boolean)[] = [];

        const addFilter = (
          condition: string,
          value: number | string | boolean
        ) => {
          filters.push(condition.replace("?", `$${values.length + 1}`));
          values.push(value);
        };

        if (id) addFilter("id = ?", Number(id));
        if (slug) addFilter("slug = ?", slug);
        if (package_id) addFilter("? = ANY(package_ids)", Number(package_id));
        if (theme_category_id)
          addFilter("? = ANY(theme_category_ids)", Number(theme_category_id));
        if (active) addFilter("active = ?", active === "true");

        let query = "SELECT * FROM themes";
        let countQuery = "SELECT COUNT(*) FROM themes";

        if (filters.length) {
          const where = " WHERE " + filters.join(" AND ");
          query += where;
          countQuery += where;
        }

        query += ` ORDER BY updated_at ${order}`;

        if (page && limit) {
          const limitNum = Number(limit);
          const offset = (Number(page) - 1) * limitNum;
          values.push(limitNum, offset);
          query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;
        }

        const [
          themesResult,
          packagesResult,
          themeCategoriesResult,
          countResult,
        ] = await Promise.all([
          sql.query(query, values),
          sql.query("SELECT * FROM packages"),
          sql.query("SELECT * FROM theme_categories"),
          sql.query(countQuery, values.slice(0, filters.length)),
        ]);

        const packages = packagesResult.rows;
        const themeCategories = themeCategoriesResult.rows;

        const themes = themesResult.rows.map((theme: Theme) => ({
          ...theme,
          packages: packages.filter((p) => theme.package_ids?.includes(p.id)),
          theme_categories: themeCategories.filter((c) =>
            theme.theme_category_ids?.includes(c.id)
          ),
        }));

        return res.status(200).json({
          success: true,
          data: themes,
          total_rows: Number(countResult.rows[0].count),
          ...(page && limit
            ? { page: Number(page), limit: Number(limit) }
            : {}),
        });
      } catch (error) {
        handleError(res, error);
      }

    case "POST":
      try {
        const {
          name,
          thumbnail,
          phone_thumbnail,
          package_ids,
          theme_category_ids,
          active,
          features,
        } = req.body;

        if (!name) return handleError(res, new Error("Name is required."));

        const slug = createSlug(name);

        const {
          rows: [theme],
        } = await sql.query(
          `INSERT INTO themes 
            (name, slug, thumbnail, phone_thumbnail, package_ids, theme_category_ids, active, features)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *`,
          [
            name,
            slug,
            thumbnail,
            phone_thumbnail,
            package_ids,
            theme_category_ids,
            active,
            features,
          ]
        );

        return res.status(201).json({
          success: true,
          message: "Theme created successfully",
          data: theme,
        });
      } catch (error) {
        handleError(res, error);
      }

    case "PUT":
      try {
        const {
          id,
          name,
          thumbnail,
          phone_thumbnail,
          package_ids,
          theme_category_ids,
          active,
          features,
        } = req.body;

        if (!id || !name)
          return handleError(res, new Error("Missing required fields."));

        const {
          rows: [theme],
        } = await sql.query(`SELECT * FROM themes WHERE id = $1`, [Number(id)]);

        if (!theme) return handleError(res, new Error("Theme not found."));

        const destroyIfChanged = async (
          oldUrl: string | null,
          newUrl: string | null
        ) => {
          if (oldUrl && oldUrl !== newUrl) {
            const publicId = getCloudinaryID(oldUrl);
            await cloudinary.uploader.destroy(`${env}/${publicId}`);
          }
        };

        await Promise.all([
          destroyIfChanged(theme.thumbnail, thumbnail),
          destroyIfChanged(theme.phone_thumbnail, phone_thumbnail),
        ]);

        const slug = createSlug(name);
        const {
          rows: [updated],
        } = await sql.query(
          `UPDATE themes
          SET name = $1, slug = $2, thumbnail = $3, theme_category_ids = $4,
              package_ids = $5, active = $6, phone_thumbnail = $7, features = $8
          WHERE id = $9
          RETURNING *`,
          [
            name,
            slug,
            thumbnail,
            theme_category_ids,
            package_ids,
            active,
            phone_thumbnail,
            features,
            id,
          ]
        );

        return res.status(200).json({
          success: true,
          message: "Theme updated successfully",
          data: updated,
        });
      } catch (error) {
        handleError(res, error);
      }

    case "DELETE":
      try {
        const id = Number(req.query.id);
        if (!id) return handleError(res, new Error("Invalid ID provided."));

        const {
          rows: [theme],
        } = await sql.query(`SELECT * FROM themes WHERE id = $1`, [id]);
        if (!theme) return handleError(res, new Error("Theme not found."));

        for (const key of ["thumbnail", "phone_thumbnail"]) {
          const url = theme[key];
          if (url) {
            const publicId = getCloudinaryID(url);
            const result = await cloudinary.uploader.destroy(
              `${env}/${publicId}`
            );
            console.log({ [`${key}Result`]: result });
          }
        }

        const {
          rows: [deleted],
        } = await sql.query(`DELETE FROM themes WHERE id = $1 RETURNING *`, [
          id,
        ]);
        return res.status(200).json({
          success: true,
          message: "Theme deleted successfully",
          data: deleted,
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
