import { authenticateUser } from "@/lib/middleware";
import handleError from "@/lib/errorHandling";
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
  const { url, id, flag } = request.body;

  try {
    if (!url && !id && !flag) {
      return handleError(response, new Error("ID, url, flag required"));
    }

    const { rows: themes } = await sql.query(
      `SELECT * FROM themes WHERE id = $1`,
      [Number(id)]
    );

    if (!themes[0]) {
      return handleError(response, new Error("Theme not found"));
    }

    await sql.query(`UPDATE themes SET ${flag} = $1 WHERE id = $2`, [
      null,
      Number(id),
    ]);

    const publicId = getCloudinaryID(url as string);
    const env = process.env.NODE_ENV || "development";
    const deleteResult = await cloudinary.uploader.destroy(
      `${env}/${publicId}`
    );

    return response.status(200).json({
      success: true,
      message: "theme thumbnail updated successfully",
      data: deleteResult,
      publicId,
    });
  } catch (error) {
    handleError(response, error);
  }
};

export default authenticateUser(handler);
