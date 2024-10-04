import handleError from "@/lib/errorHandling";
import { Client } from "@/lib/types";
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

    const { rows: client } = await sql.query(
      `SELECT * FROM clients WHERE id = $1`,
      [Number(id)]
    );

    if (!client[0]) {
      return handleError(response, new Error("Client not found"));
    }

    const currentClient: Client = client[0];

    const gallery: string[] = currentClient.gallery as string[];
    const filteredGallery = gallery.filter((g) => g !== url);

    await sql.query(
      `UPDATE clients SET gallery = $1, cover = $2 WHERE id = $3`,
      [
        filteredGallery,
        currentClient.cover === url ? null : currentClient.cover,
        Number(id),
      ]
    );

    await del(url);

    return response.status(200).json({
      success: true,
      message: "Gallery updated successfully",
      gallery: filteredGallery,
    });
  } catch (error) {
    handleError(response, error);
  }
}
