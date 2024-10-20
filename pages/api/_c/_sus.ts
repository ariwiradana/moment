import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";

import { sql } from "@vercel/postgres";
import type { NextApiResponse, NextApiRequest } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { is_using_service, id } = request.body;

  try {
    if (!is_using_service && !id) {
      return handleError(response, new Error("ID and status required"));
    }

    const query = `
      UPDATE clients
      SET is_using_service = $1
      WHERE id = $2;
    `;

    await sql.query(query, [is_using_service, id]);

    return response.status(200).json({
      success: true,
      message: "Using service setted successfully",
    });
  } catch (error) {
    handleError(response, error);
  }
};

export default authenticateUser(handler);
