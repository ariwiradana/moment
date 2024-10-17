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

        let query = `
            SELECT t.*, c.name as client_name, c.cover as client_cover, th.name as theme_name, th.category as theme_category
            FROM testimonials t
            JOIN clients c ON c.id = t.client_id
            JOIN themes th ON th.id = c.theme_id
        `;

        let countQuery = `
            SELECT COUNT(*)
            FROM testimonials t
            JOIN clients c ON c.id = t.client_id
            JOIN themes th ON th.id = c.theme_id`;

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
        query += ` ORDER BY t.updated_at DESC LIMIT $${valueIndex} OFFSET $${
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
        const { client_id: clientId, name, comments } = req.body;

        if (!clientId || !name || !comments) {
          throw new Error("All fields are required");
        }

        if (clientId) {
          const checkClient = await sql.query(
            `SELECT EXISTS (SELECT 1 FROM clients WHERE id = $1);`,
            [Number(clientId)]
          );

          if (!checkClient.rows[0].exists) {
            return handleError(
              res,
              new Error("Client not found with the provided ID.")
            );
          }
        }

        const insertQuery = `
          INSERT INTO testimonials (client_id, name, comments) 
          VALUES ($1, $2, $3) 
          RETURNING *
        `;
        const insertValues = [clientId, name, comments];

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
          UPDATE reviews 
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
          `SELECT * FROM reviews WHERE id = $1`,
          [Number(deleteId)]
        );

        if (reviewRows.length === 0) {
          throw new Error("Review not found");
        }

        // Delete review
        await sql.query(`DELETE FROM reviews WHERE id = $1`, [
          Number(deleteId),
        ]);

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

export default handler;
