import handleError from "@/lib/errorHandling";
import { ClientV2, Participant } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

interface QueryResult {
  id: number;
  name: string;
  slug: string;
  address: string;
  address_url: string;
  address_full: string;
  date: string;
  time: string;
  participant_id: number;
  participant_name: string;
  nickname: string;
  participant_address: string;
  child: string;
  parents_male: string;
  parents_female: string;
  participant_gender: "male" | "female";
  theme_id: number;
  theme_name: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const { slug } = req.query;

        const query = `
      SELECT 
        c.id,
        c.name,
        c.slug,
        c.address,
        c.address_url,
        c.address_full,
        c.date,
        c.time,
        p.id AS participant_id,
        p.name AS participant_name,
        p.nickname,
        p.address AS participant_address,
        p.child,
        p.parents_male,
        p.parents_female,
        p.gender AS participant_gender,
        t.id AS theme_id,
        t.name AS theme_name
      FROM 
        clients c
      LEFT JOIN 
        participants p ON p.client_id = c.id
      LEFT JOIN 
        themes t ON t.id = c.theme_id
      ${slug ? `WHERE c.slug = $1` : ""} 
      ORDER BY 
        c.id;
    `;

        const { rows } = await sql.query(query, slug ? [slug] : []);

        const clients: ClientV2[] = rows.reduce(
          (acc: ClientV2[], row: QueryResult) => {
            const { id } = row;

            let clientData = acc.find((c) => c.id === id);
            if (!clientData) {
              clientData = {
                id,
                slug: row.slug,
                name: row.name,
                address: row.address,
                address_url: row.address_url,
                address_full: row.address_full,
                participants: [],
                date: row.date,
                time: row.time,
                theme: row.theme_id
                  ? { id: row.theme_id, name: row.theme_name }
                  : null,
              };
              acc.push(clientData);
            }

            if (row.participant_id) {
              const participant: Participant = {
                participant_id: row.participant_id,
                name: row.participant_name,
                nickname: row.nickname,
                address: row.participant_address,
                child: row.child,
                parents_male: row.parents_male,
                parents_female: row.parents_female,
                gender: row.participant_gender,
              };
              clientData.participants.push(participant);
            }

            return acc;
          },
          []
        );

        return res.status(200).json({ success: true, data: clients });
      } catch (error) {
        handleError(res, error);
      }

    case "POST":
    case "PUT":
    case "DELETE":

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
