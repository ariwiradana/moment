import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";
import { ApiHandler, Package } from "@/lib/types";
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

        const { rows } = await sql.query(query, values);
        return res.status(200).json({
          success: true,
          data: rows,
        });
      } catch (error) {
        handleError(res, error);
      }
    case "PUT":
      const body: Package = req.body;

      const fields = [];
      const values = [];
      let valueIndex = 1;

      for (const [key, value] of Object.entries(body)) {
        if (
          key !== "id" &&
          key !== "created_at" &&
          key !== "updated_at" &&
          key !== "userId"
        ) {
          fields.push(`${key} = $${valueIndex}`);
          values.push(value);
          valueIndex++;
        }
      }
      const setClause = fields.join(", ");
      const query = `UPDATE packages SET ${setClause} WHERE id = $${valueIndex}`;

      values.push(body.id);

      try {
        const { rows } = await sql.query(query, values);
        return res.status(200).json({
          success: true,
          data: rows,
          message: `Package ${body.name} successfully updated`,
        });
      } catch (error) {
        handleError(res, error);
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authenticateUser(handler as ApiHandler);
