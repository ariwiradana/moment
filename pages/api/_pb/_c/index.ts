import handleError from "@/lib/errorHandling";

import { Client, Package, Review, Theme } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

interface Query {
  slug?: string;
  page?: number;
  limit?: number;
  id?: number;
  status?: Client["status"];
}

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  switch (request.method) {
    case "GET":
      try {
        const { slug, page = 1, id, limit = 10, status }: Query = request.query;

        let query = `SELECT * FROM clients`;
        let countQuery = `SELECT COUNT(*) FROM clients`;

        const values: (number | string | boolean)[] = [];
        const countValues: (number | string | boolean)[] = [];

        if (id) {
          const valueIndex = values.length + 1;
          query += ` WHERE id = $${valueIndex}`;
          countQuery += ` WHERE id = $${valueIndex}`;
          values.push(id);
          countValues.push(id);
        }

        if (slug) {
          const valueIndex = values.length + 1;
          query += ` WHERE slug = $${valueIndex}`;
          countQuery += ` WHERE slug = $${valueIndex}`;
          values.push(slug);
          countValues.push(slug);
        }

        if (status) {
          const valueIndex = values.length + 1;

          query += ` WHERE status = $${valueIndex} AND is_preview = $${
            valueIndex + 1
          }`;
          countQuery += ` WHERE status = $${valueIndex} AND is_preview = $${
            valueIndex + 1
          }`;

          values.push(status, false);
          countValues.push(status, false);
        }

        query += ` ORDER BY updated_at DESC`;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const offset = (pageNumber - 1) * limitNumber;
        const valueIndex = values.length + 1;
        query += ` LIMIT $${valueIndex} OFFSET $${valueIndex + 1}`;
        values.push(limitNumber, offset);

        const { rows } = await sql.query(query, values);
        const { rows: total } = await sql.query(countQuery, countValues);

        const clientIds = rows.map((client) => client.id);

        const { rows: participants } = await sql.query(
          `
            SELECT p.*
            FROM participants p
            JOIN clients c ON p.client_id = c.id
            WHERE c.id = ANY($1::int[])
            ORDER BY c.created_at ASC
        `,
          [clientIds]
        );

        const { rows: events } = await sql.query(
          `
            SELECT e.*
            FROM events e
            JOIN clients c ON e.client_id = c.id
            WHERE c.id = ANY($1::int[])
            ORDER BY e.date ASC, e.start_time::time ASC
        `,
          [clientIds]
        );

        const { rows: journey } = await sql.query(
          `
            SELECT j.*
            FROM journey j
            JOIN clients c ON j.client_id = c.id
            WHERE c.id = ANY($1::int[])
            ORDER BY j.date ASC
        `,
          [clientIds]
        );

        const { rows: themes } = await sql.query(`SELECT * FROM themes`);
        const { rows: wishes } = await sql.query(`SELECT * FROM wishes`);
        const { rows: packages } = await sql.query(`SELECT * FROM packages`);

        const clients = rows.map((client: Client) => {
          const clientParticipants = participants.filter(
            (p) => p.client_id === client.id
          );
          const clientEvents = events.filter((e) => e.client_id === client.id);
          const clientJourney = journey.filter(
            (j) => j.client_id === client.id
          );
          const clientTheme: Theme[] = themes.find(
            (t) => t.id === client.theme_id
          );
          const clientPackages: Package[] = packages.find(
            (t) => t.id === client.package_id
          );
          const clientwishes: Review[] = wishes.filter(
            (r) => r.client_id === client.id
          );
          return {
            ...client,
            participants: clientParticipants,
            events: clientEvents,
            journey: clientJourney,
            theme: clientTheme,
            wishes: clientwishes,
            packages: clientPackages,
          };
        });

        return response.status(200).json({
          success: true,
          data: clients,
          total_rows: Number(total[0].count),
          page: pageNumber,
          limit: limitNumber,
        });
      } catch (error) {
        handleError(response, error);
      }

    default:
      response.setHeader("Allow", ["GET"]);
      return response.status(405).end(`Method ${request.method} Not Allowed`);
  }
};

export default handler;
