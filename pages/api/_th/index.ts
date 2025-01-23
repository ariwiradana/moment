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

        if (package_id) {
          const valueIndex = values.length + 1;
          conditions.push(`$${valueIndex} = ANY(package_ids)`);
          countConditions.push(`$${valueIndex} = ANY(package_ids)`);
          values.push(package_id);
          countValues.push(package_id);
        }

        if (theme_category_id) {
          const valueIndex = values.length + 1;
          conditions.push(`$${valueIndex} = ANY(theme_category_ids)`);
          countConditions.push(`$${valueIndex} = ANY(theme_category_ids)`);
          values.push(theme_category_id);
          countValues.push(theme_category_id);
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
        const { rows: themeCategories } = await sql.query(
          `SELECT * FROM theme_categories`
        );

        const themes = rows.map((theme: Theme) => {
          const packageIdsSet = new Set(theme.package_ids);
          const filteredPackage = packages.filter((pkg) =>
            packageIdsSet.has(pkg.id)
          );

          const themeCategoryIdsSet = new Set(theme.theme_category_ids);
          const filteredThemeCategory = themeCategories.filter((tc) =>
            themeCategoryIdsSet.has(tc.id)
          );

          return {
            ...theme,
            packages: filteredPackage,
            theme_categories: filteredThemeCategory,
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
        const {
          name,
          thumbnail,
          phone_thumbnail,
          package_ids,
          theme_category_ids,
          cover_video,
          active,
        } = req.body;

        const slug = createSlug(name);

        const { rows } = await sql.query(
          `
            INSERT INTO themes (name, slug, thumbnail, phone_thumbnail, package_ids, theme_category_ids, cover_video, active) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *;`,
          [
            name,
            slug,
            thumbnail,
            phone_thumbnail,
            package_ids,
            theme_category_ids,
            cover_video,
            active,
          ]
        );

        return res.status(200).json({
          success: true,
          data: rows[0],
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
          cover_video,
          active,
        } = req.body;

        if (!id && !name && !thumbnail && !phone_thumbnail) {
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
          const thumbnailPublicId = getCloudinaryID(theme.thumbnail as string);
          await cloudinary.uploader.destroy(`${env}/${thumbnailPublicId}`);
        }

        if (
          theme.phone_thumbnail &&
          theme.phone_thumbnail !== phone_thumbnail
        ) {
          const phoneThumbnailPublicId = getCloudinaryID(
            theme.phone_thumbnail as string
          );

          await cloudinary.uploader.destroy(`${env}/${phoneThumbnailPublicId}`);
        }

        const text = `
          UPDATE themes
          SET name = $1, slug = $2, thumbnail = $3, theme_category_ids = $4, package_ids = $5, cover_video = $6, phone_thumbnail = $7, active = $8
          WHERE id = $9
          RETURNING *;`;

        const slug = createSlug(name);

        const { rows } = await sql.query({
          text,
          values: [
            name,
            slug,
            thumbnail,
            theme_category_ids,
            package_ids,
            cover_video,
            phone_thumbnail,
            active,
            id,
          ],
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

        const { rows: currentTheme } = await sql.query(`
          SELECT * FROM themes WHERE id = ${Number(id)}
        `);

        if (!currentTheme.length) {
          return handleError(
            res,
            new Error("Theme does not exist with the provided ID.")
          );
        }

        const thumbnailURL = currentTheme[0].thumbnail;
        const phoneThumbnailURL = currentTheme[0].phone_thumbnail;

        if (thumbnailURL) {
          const thumbnailPublicId = getCloudinaryID(thumbnailURL as string);
          const thumbnailResult = await cloudinary.uploader.destroy(
            `${env}/${thumbnailPublicId}`
          );
          console.log({ thumbnailResult });
        }

        if (phoneThumbnailURL) {
          const phoneThumbnailPublicId = getCloudinaryID(
            phoneThumbnailURL as string
          );
          const phoneThumbnailResult = await cloudinary.uploader.destroy(
            `${env}/${phoneThumbnailPublicId}`
          );
          console.log({ phoneThumbnailResult });
        }

        const { rows } = await sql.query(`
          DELETE FROM themes WHERE id = ${Number(id)} RETURNING *;
        `);

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
