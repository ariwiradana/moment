import { checkApiKey } from "@/lib/apiKey";
import { put } from "@vercel/blob";
import type { NextApiResponse, NextApiRequest, PageConfig } from "next";

const MAX_PAYLOAD_SIZE = 3 * 1024 * 1024; // 3 MB in bytes

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!checkApiKey(req, res)) return;

  if (req.method === "POST") {
    const contentLength = req.headers["content-length"];
    if (contentLength && parseInt(contentLength) > MAX_PAYLOAD_SIZE) {
      return res.status(413).json({
        success: false,
        error: "Payload too large. Maximum size is 3 MB.",
      });
    }

    const { filename } = req.query;

    const data = await put(filename as string, req, {
      access: "public",
      multipart: true,
    });

    return res.status(200).json({ success: true, data });
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
