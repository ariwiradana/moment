import handleError from "@/lib/errorHandling";
import { sql } from "@vercel/postgres";
import type { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { status, id } = request.body;

  try {
    if (!status && !id) {
      return handleError(response, new Error("ID and status required"));
    }

    const query = `
      UPDATE clients
      SET status = $1
      WHERE id = $2;
    `;

    await sql.query(query, [status, id]);

    return response.status(200).json({
      success: true,
      message: "Status setted successfully",
    });
  } catch (error) {
    handleError(response, error);
  }
}
