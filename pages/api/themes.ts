import handleError from "@/lib/errorHandling";
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
        const query = `
          SELECT *
          FROM themes
          ${id ? `WHERE id = $1` : ""};
        `;

        const { rows } = await sql.query(query, id ? [id] : []);
        return res.status(200).json({ success: true, data: rows });
      } catch (error) {
        handleError(res, error);
      }

    case "POST":
    case "PUT":
    case "DELETE":

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
