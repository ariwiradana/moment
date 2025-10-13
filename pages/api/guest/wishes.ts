import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    let result;

    switch (method) {
      case "GET": {
        const { client_id, page = 1, limit = 10 } = req.query;
        if (!client_id)
          return res
            .status(400)
            .json({ success: false, message: "client_id required" });

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const offset = (pageNumber - 1) * limitNumber;

        const query = `
          SELECT *, COUNT(*) OVER() AS total_count
          FROM wishes
          WHERE client_id = $1
          ORDER BY updated_at DESC
          LIMIT $2 OFFSET $3
        `;
        const values = [Number(client_id), limitNumber, offset];
        const { rows } = await sql.query(query, values);

        const totalRows = rows[0]?.total_count ?? 0;

        return res.status(200).json({
          success: true,
          data: rows,
          total_rows: totalRows,
          page: pageNumber,
          limit: limitNumber,
        });
      }

      case "POST":
        const { client_id: postClientId, name, wishes, attendant } = req.body;

        if (!postClientId || !name || !wishes || !attendant) {
          throw new Error("All fields are required");
        }

        const insertQuery = `
          INSERT INTO wishes (client_id, name, wishes, attendant) 
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
