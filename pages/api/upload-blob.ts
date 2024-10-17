import { authenticateUser } from "@/lib/middleware";
import { put } from "@vercel/blob";
import type { NextApiResponse, NextApiRequest, PageConfig } from "next";

const MAX_PAYLOAD_SIZE = 5 * 1024 * 1024;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const contentLength = req.headers["content-length"];
    if (contentLength && parseInt(contentLength) > MAX_PAYLOAD_SIZE) {
      return res.status(413).json({
        success: false,
        error: "Payload too large. Maximum size is 3 MB.",
      });
    }

    console.log({ cookiesss: req.headers.cookie });

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

export default authenticateUser(handler);
