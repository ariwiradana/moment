import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";
import { Client } from "@/lib/types";
import sql from "@/lib/db";
import type { NextApiResponse, NextApiRequest } from "next";
import { v2 as cloudinary } from "cloudinary";
import { getCloudinaryID } from "@/utils/getCloudinaryID";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

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

    const gallery: string[] = currentClient.gallery as string[];
    const filteredGallery = gallery.filter((g) => g !== url);

    await sql.query(
      `UPDATE clients SET gallery = $1, cover = $2, seo = $3 WHERE id = $4`,
      [
        filteredGallery,
        currentClient.cover === url ? null : currentClient.cover,
        currentClient.seo === url ? null : currentClient.seo,
        Number(id),
      ]
    );

    const publicId = getCloudinaryID(url as string);
    const env = process.env.NODE_ENV || "development";
    await cloudinary.uploader.destroy(`${env}/${publicId}`);

    return response.status(200).json({
      success: true,
      message: "Gallery updated successfully",
      gallery: filteredGallery,
    });
  } catch (error) {
    handleError(response, error);
  }
};

export default authenticateUser(handler);
