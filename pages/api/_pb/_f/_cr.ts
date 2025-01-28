import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { Client, Event, Participant } from "@/lib/types";
import { createSlug } from "@/utils/createSlug";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;

    switch (method) {
      case "POST":
        const client: Client = req.body;

        if (!client.slug) {
          return handleError(res, new Error("Link undangan wajib diisi."));
        }

        if (client.slug) {
          const checkSlug = await sql.query(
            `SELECT EXISTS (SELECT 1 FROM clients WHERE slug = $1);`,
            [createSlug(client.slug)]
          );
          if (checkSlug.rows.length > 0 && checkSlug.rows[0].exists) {
            return handleError(
              res,
              new Error(`Undangan dengan link ${client.slug} sudah terpakai.`)
            );
          }
        }

        const { rows: clientResult } = await sql.query(
          `INSERT INTO clients (
            slug,
            name,
            theme_id,
            theme_category_id,
            status,
            package_id,
            opening_title,
            opening_description,
            closing_title,
            closing_description,
            gift_bank_name,
            gift_account_name,
            gift_account_number,
            gallery,
            videos
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
          [
            createSlug(client.slug),
            client.name,
            client.theme_id,
            client.theme_category_id,
            client.status,
            client.package_id,
            client.opening_title,
            client.opening_description,
            client.closing_title,
            client.closing_description,
            client.gift_bank_name,
            client.gift_account_name,
            client.gift_account_number,
            client.gallery,
            client.videos,
          ]
        );

        const clientId = clientResult[0].id;

        if (!clientId) {
          return handleError(res, new Error("Gagal menambahkan klien."));
        }

        const participants: Participant[] = client.participants;
        const participantPromises = participants.map(async (p: Participant) => {
          const addParticipantQuery = `
            INSERT INTO participants (
            client_id,
            name,
            nickname,
            address,
            child,
            parents_male,
            parents_female,
            gender,
            role,
            image,
            facebook,
            twitter,
            instagram,
            tiktok
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          RETURNING *;
        `;

          await sql.query(addParticipantQuery, [
            clientId,
            p.name,
            p.nickname,
            p.address,
            p.child,
            p.parents_male,
            p.parents_female,
            p.gender,
            p.role,
            p.image,
            p.facebook,
            p.twitter,
            p.instagram,
            p.tiktok,
          ]);
        });
        await Promise.all(participantPromises);

        const events: Event[] = client.events;
        const eventPromises = events.map(async (e: Event) => {
          const addEventQuery = `
            INSERT INTO events (client_id, name, date, start_time, end_time, address, address_url, image)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
          `;

          await sql.query(addEventQuery, [
            clientId,
            e.name,
            e.date,
            e.start_time,
            e.end_time,
            e.address,
            e.address_url,
            e.image,
          ]);
        });
        await Promise.all(eventPromises);

        const newClient = clientResult[0];

        newClient["participants"] = participants.map((participant) => ({
          ...participant,
          client_id: clientId,
        }));

        newClient["events"] = events.map((event) => ({
          ...event,
          client_id: clientId,
        }));

        return res.status(200).json({
          success: true,
          data: newClient,
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
