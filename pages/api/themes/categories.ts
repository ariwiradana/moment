import { checkApiKey } from "@/lib/apiKey";
import handleError from "@/lib/errorHandling";
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!checkApiKey(req, res)) return;

  switch (req.method) {
    case "GET":
      try {
        const query = `
          SELECT category, COUNT(*) as amount
          FROM themes
          GROUP BY category;`;

        const { rows } = await sql.query(query);

        return res.status(200).json({
          success: true,
          data: rows,
        });
      } catch (error) {
        handleError(res, error);
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;