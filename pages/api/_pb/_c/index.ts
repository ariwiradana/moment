import handleError from "@/lib/errorHandling";
import { Client, Package, Review, Theme, ThemeCategory } from "@/lib/types";
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

        let query = `SELECT * FROM clients`;
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

        query += ` ORDER BY status DESC, updated_at DESC`;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const offset = (pageNumber - 1) * limitNumber;
        const valueIndex = values.length + 1;
        query += ` LIMIT $${valueIndex} OFFSET $${valueIndex + 1}`;
        values.push(limitNumber, offset);

        const { rows } = await sql.query(query, values);
        const { rows: total } = await sql.query(countQuery, countValues);

        const clientIds = rows.map((client) => client.id);

        const { rows: participants } = await sql.query(
          `
            SELECT p.*
            FROM participants p
            JOIN clients c ON p.client_id = c.id
            WHERE c.id = ANY($1::int[])
            ORDER BY p.updated_at DESC
        `,
          [clientIds]
        );

        const { rows: events } = await sql.query(
          `
            SELECT e.*
            FROM events e
            JOIN clients c ON e.client_id = c.id
            WHERE c.id = ANY($1::int[])
            ORDER BY e.start_time::time ASC
        `,
          [clientIds]
        );

        const { rows: themes } = await sql.query(`SELECT * FROM themes`);
        const { rows: wishes } = await sql.query(`SELECT * FROM wishes`);
        const { rows: packages } = await sql.query(`SELECT * FROM packages`);
        const { rows: themeCategories } = await sql.query(
          `SELECT * FROM theme_categories`
        );

        const clients = rows.map((client: Client) => {
          const clientParticipants = participants.filter(
            (p) => p.client_id === client.id
          );
          const clientEvents = events.filter((e) => e.client_id === client.id);
          const clientTheme: Theme[] = themes.find(
            (th) => th.id === client.theme_id
          );
          const clientPackages: Package[] = packages.find(
            (pk) => pk.id === client.package_id
          );
          const clientThemeCategories: ThemeCategory[] = themeCategories.find(
            (tc) => tc.id === client.theme_category_id
          );
          const clientwishes: Review[] = wishes.filter(
            (r) => r.client_id === client.id
          );
          return {
            ...client,
            participants: clientParticipants,
            events: clientEvents,
            theme: clientTheme,
            wishes: clientwishes,
            package: clientPackages,
            theme_category: clientThemeCategories,
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
