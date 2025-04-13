import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

interface Query {
  slug?: string;
}

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  switch (request.method) {
    case "GET":
      try {
        const { slug }: Query = request.query;

        const { rows } = await sql.query(
          `SELECT name
          FROM clients
          WHERE slug = $1`,
          [slug]
        );

        if (rows.length === 0) {
          return handleError(response, new Error("Klien tidak ditemukan."));
        }

        const name = rows[0] || null;

        return response.status(200).json(name);
      } catch (error) {
        handleError(response, error);
      }

    default:
      response.setHeader("Allow", ["GET"]);
      return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
};

export default handler;
