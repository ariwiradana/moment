import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const values: (string | number)[] = [];

        let query = `
        SELECT tc.id, tc.name AS category, COUNT(DISTINCT t.id)::int AS amount
        FROM themes t
        JOIN UNNEST(ARRAY(SELECT DISTINCT unnest(t.theme_category_ids))) AS theme_category_id ON TRUE
        JOIN theme_categories tc ON tc.id = theme_category_id
      `;

        query += ` GROUP BY tc.name, tc.id;`;

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
