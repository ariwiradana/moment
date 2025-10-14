import handleError from "@/lib/errorHandling";

import sql from "@/lib/db";
import type { NextApiResponse, NextApiRequest } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { snap_token, id } = request.body;

  try {
    if (!snap_token && !id) {
      return handleError(response, new Error("ID dan status wajib diisi"));
    }

    const query = `
      UPDATE orders
      SET snap_token = $1
      WHERE id = $2;
    `;

    await sql.query(query, [snap_token, id]);

    return response.status(200).json({
      success: true,
      message: "Snap token berhasil diubah.",
    });
  } catch (error) {
    handleError(response, error);
  }
};

export default handler;
