import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { createSlug } from "@/utils/createSlug";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method, query } = req;

    if (method !== "GET") {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }

    const rawSlug = query.slug as string | undefined;
    if (!rawSlug)
      return handleError(res, new Error("Link undangan wajib diisi."));

    const slug = createSlug(rawSlug);

    const { rows: clientRows } = await sql.query(
      `SELECT * FROM clients WHERE slug = $1 LIMIT 1;`,
      [slug]
    );

    if (clientRows.length > 0) {
      return res.status(404).json({
        success: false,
        message: `Link ${slug} sudah terpakai.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Link ${slug} dapat digunakan.`,
    });
  } catch (error) {
    return handleError(res, error);
  }
}
