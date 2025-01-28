import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;

    switch (method) {
      case "POST":
        const client = req.body;
        // const { events, participants } = client;

        const { rows: clientResult } = await sql.query(
          `INSERT INTO clients (
            slug,
            name,
            theme_id,
            theme_category_id,
            status,
            gallery,
            videos,
            cover,
            music,
            package_id,
            opening_title,
            opening_description,
            closing_title,
            closing_description,
            gift_bank_name,
            gift_account_name,
            gift_account_number
          ) VALUES ($1, $2)`
        );

        return res.status(200).json({
          success: true,
          data: client,
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
