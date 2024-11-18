import handleError from "@/lib/errorHandling";
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

        let query = `SELECT * FROM packages`;

        const values: (number | string)[] = [];

        if (id) {
          const valueIndex = values.length + 1;
          query += ` WHERE id = $${valueIndex}`;
          values.push(Number(id));
        }

        query += ` ORDER BY id ASC`;

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
