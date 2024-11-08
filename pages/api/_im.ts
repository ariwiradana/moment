import { Blob } from "@/lib/types";
import { list } from "@vercel/blob";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs/promises";

const getLocalImages = async (pathname: string) => {
  try {
    const directoryPath = path.join(process.cwd(), "public/uploads", pathname);
    const files = await fs.readdir(directoryPath);
    const validImageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    const imageFiles = files.filter((file) =>
      validImageExtensions.some((ext) => file.endsWith(ext))
    );
    const imageBlobs = imageFiles.map((file) => ({
      url: `/uploads/${pathname}/${file}`,
    }));

    return imageBlobs;
  } catch (err) {
    console.error("Error reading directory:", err);
    throw new Error(`Failed to retrieve local images`);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { pathname } = req.query;
  try {
    if (!pathname) {
      return res
        .status(404)
        .json({ success: false, message: "Pathname required" });
    }

    let imageBlobs: Blob[] | { url: string }[] = [];
    if (process.env.NODE_ENV === "production") {
      const { blobs } = await list({
        mode: "folded",
        prefix: `${pathname as string}/`,
      });

      const validImageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
      imageBlobs = blobs
        .filter((blob) =>
          validImageExtensions.some((ext) => blob.url.endsWith(ext))
        )
        .sort(
          (a, b) =>
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        );
    } else {
      imageBlobs = await getLocalImages(pathname as string);
    }
    console.log({ imageBlobs });
    return res.status(200).json({ success: true, blobs: imageBlobs });
  } catch (error) {
    return res.status(404).json(error);
  }
};

export default handler;
