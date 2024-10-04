import handleError from "@/lib/errorHandling";
import { sql } from "@vercel/postgres";
import type { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { url, id } = request.body;

  try {
    if (!url && !id) {
      return handleError(response, new Error("ID and url required"));
    }

    const query = `
      UPDATE clients
      SET cover = $1
      WHERE id = $2;
    `;

    await sql.query(query, [url, id]);

    return response.status(200).json({
      success: true,
      message: "Cover image setted successfully",
    });
  } catch (error) {
    handleError(response, error);
  }
}
