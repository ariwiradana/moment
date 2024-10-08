import { withHostCheck } from "@/lib/middleware";
import { list } from "@vercel/blob";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pathname } = req.query;
  try {
    if (!pathname) {
      return res
        .status(404)
        .json({ success: false, message: "Pathname required" });
    }

    const { blobs } = await list({
      mode: "folded",
      prefix: `${pathname as string}/`,
    });

    const validImageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    const imageBlobs = blobs.filter((blob) =>
      validImageExtensions.some((ext) => blob.url.endsWith(ext))
    );

    return res.status(200).json({ success: true, blobs: imageBlobs });
  } catch (error) {
    return res.status(404).json(error);
  }
};

export default withHostCheck(handler);
