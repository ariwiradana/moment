import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";

import sql from "@/lib/db";
import type { NextApiResponse, NextApiRequest } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { is_preview, id } = request.body;

  try {
    if (!is_preview && !id) {
      return handleError(response, new Error("ID and status required"));
    }

    const query = `
      UPDATE clients
      SET is_preview = $1
      WHERE id = $2;
    `;

    await sql.query(query, [is_preview, id]);

    return response.status(200).json({
      success: true,
      message: "Preview setted successfully",
    });
  } catch (error) {
    handleError(response, error);
  }
};

export default authenticateUser(handler);
