import type { NextApiResponse, NextApiRequest, PageConfig } from "next";
import { v2 as cloudinary } from "cloudinary";
import { IncomingForm, Fields, Files } from "formidable";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const parsedForm = await new Promise<{ fields: Fields; files: Files }>(
      (resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      }
    );

    const { files } = parsedForm;
    const { file } = files as Files;

    const folder = process.env.NODE_ENV || "development";

    try {
      if (file?.length) {
        const result = await cloudinary.uploader.upload(file[0].filepath, {
          resource_type: "auto",
          folder,
        });
        return res.status(200).json({ success: true, data: result });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export default handler;
