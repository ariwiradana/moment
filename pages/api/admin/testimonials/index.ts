import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticateUser } from "@/lib/middleware";
import { ApiHandler } from "@/lib/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    let result;

    switch (method) {
      case "GET":
        const { client_id, page = 1, limit = 10 } = req.query;

        let query = `
            SELECT t.*, c.name as client_name, c.cover as client_cover, th.name as theme_name
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

      case "DELETE":
        const { id: deleteId } = req.query;

        if (!deleteId || isNaN(Number(deleteId))) {
          throw new Error("Invalid ID provided");
        }

        const { rows: testimonialRows } = await sql.query(
          `SELECT * FROM testimonials WHERE id = $1`,
          [Number(deleteId)]
        );

        if (testimonialRows.length === 0) {
          throw new Error("Testimonials not found");
        }

        await sql.query(`DELETE FROM testimonials WHERE id = $1`, [
          Number(deleteId),
        ]);

        result = {
          success: true,
          message: "Testimonial deleted successfully",
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
