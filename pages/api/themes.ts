import handleError from "@/lib/errorHandling";
import { del } from "@vercel/blob";
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

interface Query {
  id?: number;
  page?: number;
  limit?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const { id, page = 1, limit = 10 }: Query = req.query;

        let query = `SELECT * FROM themes`;
        let countQuery = `SELECT COUNT(*) FROM themes`;

        const values: (number | string)[] = [];
        const countValues: (number | string)[] = [];

        if (id) {
          const valueIndex = values.length + 1;
          query += ` WHERE id = $${valueIndex}`;
          countQuery += ` WHERE id = $${valueIndex}`;
          values.push(Number(id));
          countValues.push(Number(id));
        }

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const offset = (pageNumber - 1) * limitNumber;
        const valueIndex = values.length + 1;
        query += ` LIMIT $${valueIndex} OFFSET $${valueIndex + 1}`;
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
        handleError(res, error);
      }

    case "POST":
      try {
        const { name, price, thumbnail } = req.body;

        const { rows } =
          await sql`INSERT INTO themes (name, price, thumbnail) VALUES (${name}, ${price}, ${thumbnail}) RETURNING *;`;

        return res.status(200).json({
          success: true,
          data: rows[0],
          name,
          thumbnail,
        });
      } catch (error) {
        handleError(res, error);
      }
    case "PUT":
      try {
        const { id, price, name } = req.body;

        if (!id && !name) {
          return handleError(res, new Error("Required fields: id, name."));
        }

        const text = `
          UPDATE themes
          SET name = $1, price = $2
          WHERE id = $3
          RETURNING *;`;

        const { rows } = await sql.query({ text, values: [name, price, id] });

        return res.status(200).json({
          success: true,
          data: rows[0],
        });
      } catch (error) {
        handleError(res, error);
      }
    case "DELETE":
      try {
        const { id } = req.query;

        if (!id || isNaN(Number(id))) {
          return handleError(res, new Error("Invalid ID provided."));
        }

        const { rows: currentTheme } = await sql`
          SELECT * FROM themes WHERE id = ${Number(id)}
        `;

        if (!currentTheme.length) {
          return handleError(
            res,
            new Error("Theme does not exist with the provided ID.")
          );
        }

        const thumbnailURL = currentTheme[0].thumbnail;
        if (thumbnailURL) await del(thumbnailURL);

        const { rows } = await sql`
          DELETE FROM themes WHERE id = ${Number(id)} RETURNING *;
        `;

        return res.status(200).json({
          success: true,
          data: rows[0],
        });
      } catch (error) {
        handleError(res, error);
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}