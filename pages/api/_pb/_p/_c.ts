import handleError from "@/lib/errorHandling";
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const values: (number | string)[] = [];

        let query = `
          SELECT p.id, p.name AS category, COUNT(DISTINCT t.id)::int AS amount
          FROM themes t
          JOIN UNNEST(ARRAY(SELECT DISTINCT unnest(t.package_ids))) AS package_id ON TRUE
          JOIN packages p ON p.id = package_id
        `;

        query += ` GROUP BY p.name, p.id;`;

        const { rows } = await sql.query(query, values);

        return res.status(200).json({
          success: true,
          data: rows,
        });
      } catch (error) {
        handleError(res, error);
      }

    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
