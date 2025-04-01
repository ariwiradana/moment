import handleError from "@/lib/errorHandling";
import { Participant } from "@/lib/types";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

interface Query {
  client_id?: number;
}

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  switch (request.method) {
    case "GET":
      try {
        const { client_id }: Query = request.query;

        const { rows } = await sql.query<Participant>(
          `SELECT * FROM events WHERE client_id = $1`,
          [client_id]
        );

        return response.status(200).json({
          success: true,
          data: rows,
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
