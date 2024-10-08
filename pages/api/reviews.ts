import handleError from "@/lib/errorHandling";
import { withHostCheck } from "@/lib/middleware";
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const { client_id, page = 1, limit = 10 } = req.query;

        if (!client_id) {
          return handleError(res, new Error("Client id is required"));
        }

        let query = `SELECT * FROM reviews WHERE client_id = $1`;
        const countQuery = `SELECT COUNT(*) FROM reviews WHERE client_id = $1`;

        const values: (number | string)[] = [Number(client_id)];
        const countValues: (number | string)[] = [Number(client_id)];

        query += ` ORDER BY updated_at DESC`;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const offset = (pageNumber - 1) * limitNumber;
        query += ` LIMIT $2 OFFSET $3`;
        values.push(limitNumber, offset);

        const { rows } = await sql.query(query, values);
        const { rows: total } = await sql.query(countQuery, countValues);

        return res.status(200).json({
          success: true,
          data: rows,
          total_rows: Number(total[0].count),
          page: pageNumber,
          limit: limitNumber,
        });
      } catch (error) {
        return handleError(res, error);
      }

    case "POST":
      try {
        const { client_id, name, wishes, attendant } = req.body;

        const { rows } = await sql.query(
          `INSERT INTO reviews (client_id, name, wishes, attendant) VALUES ($1, $2, $3, $4) RETURNING *;`,
          [client_id, name, wishes, attendant]
        );

        return res.status(200).json({
          success: true,
          data: rows[0],
        });
      } catch (error) {
        return handleError(res, error);
      }

    case "PUT":
      try {
        const { client_id, name, attendant, wishes, id } = req.body;

        if (!client_id || !id) {
          return handleError(
            res,
            new Error("Client id and review id are required")
          );
        }

        const { rows } = await sql.query(
          `
          UPDATE reviews
          SET client_id = $1, name = $2, attendant = $3, wishes = $4
          WHERE id = $5
          RETURNING *;
          `,
          [client_id, name, attendant, wishes, id]
        );

        return res.status(200).json({
          success: true,
          data: rows[0],
        });
      } catch (error) {
        return handleError(res, error);
      }

    case "DELETE":
      try {
        const { id } = req.query;

        if (!id || isNaN(Number(id))) {
          return handleError(res, new Error("Invalid ID provided."));
        }

        // Fetch review before deleting
        const { rows } = await sql.query(
          `SELECT * FROM reviews WHERE id = $1`,
          [Number(id)]
        );

        if (rows.length === 0) {
          return handleError(res, new Error("Review not found"));
        }

        // Delete review
        await sql.query(`DELETE FROM reviews WHERE id = $1`, [Number(id)]);

        return res.status(200).json({
          success: true,
          message: "Review deleted successfully",
        });
      } catch (error) {
        return handleError(res, error);
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default withHostCheck(handler);
