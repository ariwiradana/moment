import { put } from "@vercel/blob";
import type { NextApiResponse, NextApiRequest, PageConfig } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { filename } = request.query;

  const data = await put(`meundang/${filename}`, request, {
    access: "public",
  });

  return response.status(200).json({ success: true, data });
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
