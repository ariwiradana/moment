import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;

    switch (method) {
      case "POST":
        const { slug } = req.body;

        if (!slug) {
          return handleError(res, new Error("Link undangan wajib diisi."));
        }

        if (slug) {
          const checkSlug = await sql.query(
            `SELECT EXISTS (SELECT 1 FROM clients WHERE slug = $1);`,
            [slug]
          );
          if (checkSlug.rows.length > 0 && checkSlug.rows[0].exists) {
            return handleError(
              res,
              new Error(`Undangan dengan link ${slug} sudah terpakai.`)
            );
          }
        }

        return res.status(200).json({
          success: true,
          data: null,
        });

      default:
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    return handleError(res, error);
  }
};

export default handler;
