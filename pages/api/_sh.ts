import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;

    switch (method) {
      case "GET":
        const { rows: events } = await sql.query(`SELECT COUNT(*) FROM events`);
        const { rows: clients } = await sql.query(
          `SELECT COUNT(*) FROM clients`
        );
        const { rows: guest } = await sql.query(
          `SELECT COUNT(*) FROM wishes WHERE attendant = 'Hadir'`
        );
        const { rows: wishes } = await sql.query(`SELECT COUNT(*) FROM wishes`);

        return res.status(200).json({
          success: true,
          events: Number(events[0].count),
          clients: Number(clients[0].count),
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
