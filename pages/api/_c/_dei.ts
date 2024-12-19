import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";
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

    const { rows: events } = await sql.query(
      `SELECT * FROM events WHERE id = $1`,
      [Number(id)]
    );

    if (!events[0]) {
      return handleError(response, new Error("Event not found"));
    }

    await sql.query(`UPDATE events SET image = $1 WHERE id = $2`, [
      null,
      Number(id),
    ]);

    const publicId = getCloudinaryID(url as string);
    const env = process.env.NODE_ENV || "development";
    await cloudinary.uploader.destroy(`${env}/${publicId}`);

    return response.status(200).json({
      success: true,
      message: "Event image deleted successfully",
    });
  } catch (error) {
    handleError(response, error);
  }
};

export default authenticateUser(handler);
