import handleError from "@/lib/errorHandling";
import { Participant } from "@/lib/types";
import { del } from "@vercel/blob";
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

    const { rows: participant } = await sql.query(
      `SELECT * FROM participants WHERE id = $1`,
      [Number(id)]
    );

    if (!participant[0]) {
      return handleError(response, new Error("Participant not found"));
    }

    let image: string = "";
    if (participant[0] as Participant) {
      image = participant[0].image;
    }

    await sql.query(`UPDATE participants SET image = $1 WHERE id = $2`, [
      image,
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
}
