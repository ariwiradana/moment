import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";

import { Client } from "@/lib/types";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
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

    const currentClient: Client = client[0];

    const videos: string[] = currentClient.videos as string[];
    const filteredVideos = videos.filter((g) => g !== url);

    await sql.query(
      `UPDATE clients SET videos = $1 WHERE id = $2 RETURNING *`,
      [filteredVideos, Number(id)]
    );

    if (!isYoutubeVideo(url)) {
      await del(url);
    }

    return response.status(200).json({
      success: true,
      message: "Gallery updated successfully",
    });
  } catch (error) {
    handleError(response, error);
  }
};

export default authenticateUser(handler);
