import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { capitalizeWords } from "@/utils/capitalizeWords";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;

    switch (method) {
      case "GET":
        const { category } = req.query;

        if (!category) {
          return handleError(res, new Error("Kategori wajib diisi."));
        }

        if (category) {
          const checkCategory = await sql.query(
            `SELECT EXISTS (SELECT 1 FROM theme_categories WHERE slug = $1);`,
            [category]
          );
          if (checkCategory.rows.length === 0) {
            return handleError(
              res,
              new Error(
                `Kategori ${capitalizeWords(
                  category as string
                )} tidak ditemukan.`
              )
            );
          }
        }

        return res.status(200).json({
          success: true,
          data: null,
        });

      default:
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    return handleError(res, error);
  }
};

export default handler;
