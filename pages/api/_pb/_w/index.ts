import handleError from "@/lib/errorHandling";
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    let result;

    switch (method) {
      case "GET":
        const { client_id, page = 1, limit = 10 } = req.query;

        let query = `SELECT * FROM reviews`;
        let countQuery = `SELECT COUNT(*) FROM reviews`;

        const values: (string | number)[] = [];
        const countValues: (string | number)[] = [];

        if (client_id) {
          const valueIndex = values.length + 1;
          query += ` WHERE client_id = $${valueIndex}`;
          countQuery += ` WHERE client_id = $${valueIndex}`;
          values.push(Number(client_id));
          countValues.push(Number(client_id));
        }

        const valueIndex = values.length + 1;
        query += ` ORDER BY updated_at DESC LIMIT $${valueIndex} OFFSET $${
          valueIndex + 1
        }`;
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const offset = (pageNumber - 1) * limitNumber;
        values.push(limitNumber, offset);

        const { rows } = await sql.query(query, values);
        const { rows: total } = await sql.query(countQuery, countValues);

        result = {
          success: true,
          data: rows,
          total_rows: Number(total[0].count),
          page: pageNumber,
          limit: limitNumber,
        };
        break;

      case "POST":
        const { client_id: postClientId, name, wishes, attendant } = req.body;

        if (!postClientId || !name || !wishes || !attendant) {
          throw new Error("All fields are required");
        }

        const insertQuery = `
          INSERT INTO reviews (client_id, name, wishes, attendant) 
          VALUES ($1, $2, $3, $4) 
          RETURNING *
        `;
        const insertValues = [postClientId, name, wishes, attendant];

        const { rows: insertedRows } = await sql.query(
          insertQuery,
          insertValues
        );

        result = {
          success: true,
          data: insertedRows[0],
        };
        break;

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }

    return res.status(200).json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

export default handler;
