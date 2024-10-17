import { put } from "@vercel/blob";
import type { NextApiResponse, NextApiRequest, PageConfig } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
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
