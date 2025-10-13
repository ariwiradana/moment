import sql from "@/lib/db";
import handleError from "@/lib/errorHandling";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;

    switch (method) {
      case "GET":
        const { slug } = req.query;

        if (!slug) {
          return handleError(res, new Error("Slug is required"));
        }
        const { rows } = await sql.query(
          `SELECT username FROM users WHERE username = $1`,
          [slug]
        );

        if (!rows.length) {
          res.status(200).json(null);
        }

        return res.status(200).json(rows[0]);

      default:
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    return handleError(res, error);
  }
};

export default handler;
