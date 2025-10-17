import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const query = `
          SELECT name, thumbnail
          FROM themes
          WHERE active = $1
          AND thumbnail IS NOT NULL 
          AND thumbnail <> ''`;

        const { rows: thumbnails } = await sql.query(query, [true]);

        return res.status(200).json({
          success: true,
          data: thumbnails,
          message: "Berhasil mendapatkan data thumbnail",
        });
      } catch (error) {
        handleError(res, error);
      }

    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
