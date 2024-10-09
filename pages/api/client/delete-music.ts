import handleError from "@/lib/errorHandling";

import { del } from "@vercel/blob";
import { sql } from "@vercel/postgres";
import type { NextApiResponse, NextApiRequest } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { url, id } = request.body;

  try {
    if (!url && !id) {
      return handleError(response, new Error("ID and url required"));
    }

    const { rows: client } = await sql.query(
      `SELECT * FROM clients WHERE id = $1`,
      [Number(id)]
    );

    if (!client[0]) {
      return handleError(response, new Error("Client not found"));
    }

    await sql.query(`UPDATE clients SET music = $1 WHERE id = $2 RETURNING *`, [
      null,
      Number(id),
    ]);

    await del(url);

    return response.status(200).json({
      success: true,
      message: "Gallery updated successfully",
    });
  } catch (error) {
    handleError(response, error);
  }
};

export default handler;
