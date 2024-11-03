import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";

import { sql } from "@vercel/postgres";
import type { NextApiResponse, NextApiRequest } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { url, id } = request.body;

  try {
    if (!url && !id) {
      return handleError(response, new Error("ID and url required"));
    }

    const query = `
      UPDATE clients
      SET journey_image = $1
      WHERE id = $2;
    `;

    await sql.query(query, [url, id]);

    return response.status(200).json({
      success: true,
      message: "Journey image setted successfully",
    });
  } catch (error) {
    handleError(response, error);
  }
};
export default authenticateUser(handler);
