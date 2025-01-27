import handleError from "@/lib/errorHandling";
import { Client, ThemeCategory } from "@/lib/types";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

interface Query {
  slug?: string;
  page?: number;
  limit?: number;
  id?: number;
  status?: Client["status"];
  is_preview?: Client["is_preview"];
}

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  switch (request.method) {
    case "GET":
      try {
        const {
          slug,
          page = 1,
          id,
          limit = 10,
          status,
          is_preview,
        }: Query = request.query;

        let query = `SELECT id, slug, name, cover, theme_category_id FROM clients`;
        let countQuery = `SELECT COUNT(*) FROM clients`;

        const values: (number | string | boolean)[] = [];
        const countValues: (number | string | boolean)[] = [];

        let hasCondition = false;

        if (id) {
          const valueIndex = values.length + 1;
          query += ` WHERE id = $${valueIndex}`;
          countQuery += ` WHERE id = $${valueIndex}`;
          values.push(id);
          countValues.push(id);
          hasCondition = true;
        }

        if (slug) {
          const valueIndex = values.length + 1;
          query += hasCondition ? ` AND` : ` WHERE`;
          query += ` slug = $${valueIndex}`;
          countQuery += hasCondition ? ` AND` : ` WHERE`;
          countQuery += ` slug = $${valueIndex}`;
          values.push(slug);
          countValues.push(slug);
          hasCondition = true;
        }

        if (status) {
          const valueIndex = values.length + 1;
          query += hasCondition ? ` AND` : ` WHERE`;
          query += ` status = $${valueIndex}`;
          countQuery += hasCondition ? ` AND` : ` WHERE`;
          countQuery += ` status = $${valueIndex}`;
          values.push(status);
          countValues.push(status);
          hasCondition = true;
        }

        if (is_preview) {
          const valueIndex = values.length + 1;
          const is_preview_bool = String(is_preview) === "true";
          query += hasCondition ? ` AND` : ` WHERE`;
          query += ` is_preview = $${valueIndex}`;
          countQuery += hasCondition ? ` AND` : ` WHERE`;
          countQuery += ` is_preview = $${valueIndex}`;
          values.push(is_preview_bool);
          countValues.push(is_preview_bool);
          hasCondition = true;
        }

        query += ` ORDER BY id DESC`;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const offset = (pageNumber - 1) * limitNumber;
        const valueIndex = values.length + 1;
        query += ` LIMIT $${valueIndex} OFFSET $${valueIndex + 1}`;
        values.push(limitNumber, offset);

        const { rows } = await sql.query(query, values);
        const { rows: total } = await sql.query(countQuery, countValues);

        const { rows: themeCategories } = await sql.query(
          `SELECT * FROM theme_categories`
        );

        const clients = rows.map((client: Client) => {
          const clientThemeCategory: ThemeCategory = themeCategories.find(
            (tc) => tc.id === client.theme_category_id
          );
          return {
            ...client,
            theme_category: {
              name: clientThemeCategory.name,
            },
          };
        });

        return response.status(200).json({
          success: true,
          data: clients,
          total_rows: Number(total[0].count),
          page: pageNumber,
          limit: limitNumber,
        });
      } catch (error) {
        handleError(response, error);
      }

    default:
      response.setHeader("Allow", ["GET"]);
      return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
};

export default handler;
