import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/lib/db";
import handleError from "@/lib/errorHandling";
import { Client } from "@/lib/types";
import { createSlug } from "@/utils/createSlug";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const client: Client = req.body;

    // 🔹 Basic validation
    if (!client.slug) throw new Error("Link undangan wajib diisi.");

    const slug = createSlug(client.slug);

    // 🔹 Check duplicate slug
    const { rows: slugExists } = await sql.query(
      `SELECT 1 FROM clients WHERE slug = $1 LIMIT 1;`,
      [slug]
    );
    if (slugExists.length > 0)
      throw new Error(`Undangan dengan link ${client.slug} sudah terpakai.`);

    // 🔹 Insert client data
    const {
      rows: [newClient],
    } = await sql.query(
      `
      INSERT INTO clients (
        slug, name, phone, theme_id, theme_category_id, status, package_id,
        opening_title, opening_description, closing_title, closing_description,
        gift_bank_name, gift_account_name, gift_account_number
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      RETURNING *;
    `,
      [
        slug,
        client.name,
        client.phone,
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
      ]
    );

    const clientId = newClient?.id;

    if (!clientId) throw new Error("Gagal menambahkan klien.");

    const { rows: mediaForm } = await sql.query(
      `INSERT INTO media (client_id, image_link, video_link, music_title)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
      [
        clientId,
        client.media?.image_link,
        client.media?.video_link,
        client.media?.music_title,
      ]
    );

    // 🔹 Insert participants
    if (Array.isArray(client.participants) && client.participants.length > 0) {
      const participantValues = client.participants.map((p) => [
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

      const participantQuery = `
        INSERT INTO participants (
          client_id, name, nickname, address, child, parents_male, parents_female,
          gender, role, image, facebook, twitter, instagram, tiktok
        ) VALUES ${participantValues
          .map(
            (_, i) =>
              `(${Array.from(
                { length: 14 },
                (_, j) => `$${i * 14 + j + 1}`
              ).join(", ")})`
          )
          .join(", ")}
        RETURNING *;
      `;

      await sql.query(participantQuery, participantValues.flat());
    }

    // 🔹 Insert events
    if (Array.isArray(client.events) && client.events.length > 0) {
      const eventValues = client.events.map((e) => [
        clientId,
        e.name,
        e.date,
        e.start_time,
        e.end_time,
        e.address,
        e.address_url,
        e.image,
      ]);

      const eventQuery = `
        INSERT INTO events (
          client_id, name, date, start_time, end_time, address, address_url, image
        ) VALUES ${eventValues
          .map(
            (_, i) =>
              `(${Array.from({ length: 8 }, (_, j) => `$${i * 8 + j + 1}`).join(
                ", "
              )})`
          )
          .join(", ")}
        RETURNING *;
      `;

      await sql.query(eventQuery, eventValues.flat());
    }

    // 🔹 Final response
    return res.status(200).json({
      success: true,
      data: {
        ...newClient,
        media: mediaForm[0],
        participants: client.participants,
        events: client.events,
      },
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export default handler;
