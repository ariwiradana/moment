import handleError from "@/lib/errorHandling";
import { Client, Review } from "@/lib/types";
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
        const { slug }: Query = request.query;

        const { rows } = await sql.query(
          "SELECT * FROM clients WHERE slug = $1",
          [slug]
        );
        const client: (Client & { wishes: Review[] }) | null = rows[0] || null;

        if (client) {
          const { rows: participants } = await sql.query(
            `
            SELECT *
            FROM participants
            WHERE client_id = $1
            ORDER BY id ASC`,
            [client.id]
          );

          const { rows: events } = await sql.query(
            `
            SELECT *
            FROM events
            WHERE client_id = $1
            ORDER BY date ASC, start_time::time ASC`,
            [client.id]
          );

          const { rows: themes } = await sql.query(
            `
            SELECT *
            FROM themes
            WHERE id = $1`,
            [client.theme_id]
          );
          const { rows: wishes } = await sql.query(
            `
            SELECT *
            FROM wishes
            WHERE client_id = $1`,
            [client.id]
          );
          const { rows: packages } = await sql.query(
            `
            SELECT *
            FROM packages
            WHERE id = $1`,
            [client.package_id]
          );
          const { rows: themeCategories } = await sql.query(
            `
            SELECT * 
            FROM theme_categories
            WHERE id = $1`,
            [client.theme_category_id]
          );

          client["participants"] = participants;
          client["events"] = events;
          client["theme"] = themes[0];
          client["wishes"] = wishes;
          client["package"] = packages[0];
          client["theme_category"] = themeCategories[0];
        }

        return response.status(200).json({
          success: true,
          data: client,
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
