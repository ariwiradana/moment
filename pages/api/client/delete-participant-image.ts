import { checkApiKey } from "@/lib/apiKey";

import handleError from "@/lib/errorHandling";

import { del } from "@vercel/blob";
import { sql } from "@vercel/postgres";
import type { NextApiResponse, NextApiRequest } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (!checkApiKey(request, response)) return;

  const { url, id } = request.body;

  try {
    if (!url && !id) {
      return handleError(response, new Error("ID and url required"));
    }

    const { rows: participant } = await sql.query(
      `SELECT * FROM participants WHERE id = $1`,
      [Number(id)]
    );

    if (!participant[0]) {
      return handleError(response, new Error("Participant not found"));
    }

    await sql.query(`UPDATE participants SET image = $1 WHERE id = $2`, [
      null,
      Number(id),
    ]);

    await del(url);

    return response.status(200).json({
      success: true,
      message: "Participant image deleted successfully",
    });
  } catch (error) {
    handleError(response, error);
  }
};

export default handler;
