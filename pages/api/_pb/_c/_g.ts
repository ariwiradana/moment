import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  switch (request.method) {
    case "POST":
      const { guest, slug } = request.body;

      try {
        const query = `
          UPDATE clients
          SET guests = array_cat(guests, $1::TEXT[])
          WHERE slug = $2
        `;
        const { rowCount } = await sql.query(query, [[guest], slug]);

        return response.status(200).json({
          success: true,
          data: { rowCount },
        });
      } catch (error) {
        handleError(response, error);
      }

    case "DELETE":
      const { slug: deletedSlug, guest: deletedGuest } = request.body;

      try {
        const deletedQuery = `
          UPDATE clients
          SET guests = array_remove(guests, $1)
          WHERE slug = $2
          RETURNING *;
        `;

        const { rows, rowCount } = await sql.query(deletedQuery, [
          deletedGuest,
          deletedSlug,
        ]);

        return response.status(200).json({
          success: true,
          data: rowCount === 1 ? rows[0] : null,
        });
      } catch (error) {
        handleError(response, error);
      }

    default:
      response.setHeader("Allow", ["GET"]);
      return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
};

export default handler;
