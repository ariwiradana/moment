import { put } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import getRawBody from "raw-body";
import type { NextApiResponse, NextApiRequest, PageConfig } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { filename } = req.query;

    if (typeof filename !== "string") {
      return res
        .status(400)
        .json({ success: false, error: "Filename is required" });
    }

    try {
      const rawBody = await getRawBody(req);

      if (process.env.NODE_ENV === "production") {
        const data = await put(filename, rawBody, {
          access: "public",
          multipart: true,
        });
        return res.status(200).json({ success: true, data });
      } else {
        const url = path.join(process.cwd(), "public/uploads", filename);
        await fs.mkdir(path.dirname(url), { recursive: true });
        await fs.writeFile(url, rawBody);

        return res.status(200).json({
          success: true,
          data: { url: `/uploads/${filename}` },
        });
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
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export default handler;
