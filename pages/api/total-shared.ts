import { checkApiKey } from "@/lib/apiKey";

import handleError from "@/lib/errorHandling";
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!checkApiKey(req, res)) return;

  try {
    const { method } = req;

    switch (method) {
      case "GET":
        const { rows: events } = await sql.query(`SELECT COUNT(*) FROM events`);
        const { rows: guest } = await sql.query(
          `SELECT COUNT(*) FROM reviews WHERE attendant = 'Hadir'`
        );
        const { rows: wishes } = await sql.query(
          `SELECT COUNT(*) FROM reviews`
        );

        return res.status(200).json({
          success: true,
          events: Number(events[0].count),
          guest: Number(guest[0].count),
          wishes: Number(wishes[0].count),
        });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    return handleError(res, error);
  }
};

export default handler;
