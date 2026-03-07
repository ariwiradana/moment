import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";

import sql from "@/lib/db";
import type { NextApiResponse, NextApiRequest } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { paymentStatus, id } = request.body;

  try {
    if (!paymentStatus && !id) {
      return handleError(response, new Error("ID and status required"));
    }

    const query = `
      UPDATE clients
      SET payment_status = $1
      WHERE id = $2;
    `;

    await sql.query(query, [paymentStatus, id]);

    return response.status(200).json({
      success: true,
      message: "Payment status setted successfully",
    });
  } catch (error) {
    handleError(response, error);
  }
};

export default authenticateUser(handler);
