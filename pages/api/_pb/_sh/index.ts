import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const { rows: clients } = await sql.query(
          `SELECT COUNT(*) FROM clients WHERE is_preview = $1`,
          [false]
        );
        const { rows: events } = await sql.query(`SELECT COUNT(*) FROM events`);
        const { rows: wishes } = await sql.query(`SELECT COUNT(*) FROM wishes`);
        const { rows: allClients } = await sql.query(
          `SELECT guests FROM clients`
        );
        const totalGuests = allClients.reduce((acc, client) => {
          const guestsCount = Array.isArray(client.guests)
            ? client.guests.length
            : 0;
          return acc + guestsCount;
        }, 0);

        return res.status(200).json({
          success: true,
          data: {
            clients: clients[0].count,
            wishes: wishes[0].count * 2,
            guests: totalGuests * 2,
            events: events[0].count * 2,
          },
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
