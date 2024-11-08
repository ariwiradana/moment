import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";
import { ApiHandler } from "@/lib/types";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { theme_category } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const values = [];

        let query = `
        SELECT p.id, p.name AS category, COUNT(DISTINCT t.id)::int AS amount
        FROM themes t
        JOIN UNNEST(ARRAY(SELECT DISTINCT unnest(t.package_ids))) AS package_id ON TRUE
        JOIN packages p ON p.id = package_id
      `;
        if (theme_category) {
          query += ` WHERE t.category = $1`;
          values.push(theme_category);
        }

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
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authenticateUser(handler as ApiHandler);
