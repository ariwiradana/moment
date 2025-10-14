import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { authenticateUser } from "@/lib/middleware";
import { ApiHandler } from "@/lib/types";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  switch (request.method) {
    case "GET":
      const { slug: getSlug, limit, page, search } = request.query;

      try {
        const query = `SELECT guests FROM clients WHERE slug = $1`;

        const { rows } = await sql.query(query, [getSlug]);
        const guests = rows[0].guests;

        const filteredGuests = search
          ? guests.filter((guest: string) =>
              guest.toLowerCase().includes((search as string).toLowerCase())
            )
          : guests;

        const startIndex = (Number(page) - 1) * Number(limit);
        const endIndex = startIndex + Number(limit);

        const paginatedGuests = filteredGuests?.slice(startIndex, endIndex);
        const totalRows = search ? filteredGuests?.length : guests.length;

        return response.status(200).json({
          success: true,
          data: paginatedGuests,
          totalRows,
        });
      } catch (error) {
        handleError(response, error);
      }
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

export default authenticateUser(handler as ApiHandler);
