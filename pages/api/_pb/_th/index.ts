import handleError from "@/lib/errorHandling";
import { Theme } from "@/lib/types";
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

        query += ` ORDER BY created_at ${order}`;

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

    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
