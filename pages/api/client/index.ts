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
          `SELECT * FROM clients WHERE slug = $1`,
          [slug]
        );
        const client: (Client & { wishes: Review[] }) | null = rows[0] || null;

        if (client) {
          const { rows: themes } = await sql.query(
            `SELECT *
            FROM themes
            WHERE id = $1`,
            [client.theme_id]
          );
          client["theme"] = themes[0];
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
