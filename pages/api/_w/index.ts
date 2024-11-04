import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";
import { ApiHandler } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    let result;

    switch (method) {
      case "GET":
        const { client_id, page = 1, limit = 10 } = req.query;

        let query = `SELECT * FROM wishes`;
        let countQuery = `SELECT COUNT(*) FROM wishes`;

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

      case "PUT":
        const { client_id: putClientId, id, ...updateFields } = req.body;

        if (!putClientId || !id) {
          throw new Error("Client ID and review ID are required");
        }

        const updateQuery = `
          UPDATE wishes 
          SET client_id = $1, name = $2, attendant = $3, wishes = $4 
          WHERE id = $5 
          RETURNING *
        `;
        const updateValues = [
          putClientId,
          updateFields.name,
          updateFields.attendant,
          updateFields.wishes,
          id,
        ];

        const { rows: updatedRows } = await sql.query(
          updateQuery,
          updateValues
        );

        result = {
          success: true,
          data: updatedRows[0],
        };
        break;

      case "DELETE":
        const { id: deleteId } = req.query;

        if (!deleteId || isNaN(Number(deleteId))) {
          throw new Error("Invalid ID provided");
        }

        // Fetch review before deleting
        const { rows: reviewRows } = await sql.query(
          `SELECT * FROM wishes WHERE id = $1`,
          [Number(deleteId)]
        );

        if (reviewRows.length === 0) {
          throw new Error("Review not found");
        }

        // Delete review
        await sql.query(`DELETE FROM wishes WHERE id = $1`, [Number(deleteId)]);

        result = {
          success: true,
          message: "Review deleted successfully",
        };
        break;

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }

    return res.status(200).json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

export default authenticateUser(handler as ApiHandler);
