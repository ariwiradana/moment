import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";
import { ApiHandler } from "@/lib/types";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

interface Query {
  id?: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const { id }: Query = req.query;

        let query = `SELECT * FROM theme_categories`;

        const values: (number | string)[] = [];

        if (id) {
          const valueIndex = values.length + 1;
          query += ` WHERE id = $${valueIndex}`;
          values.push(Number(id));
        }

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
