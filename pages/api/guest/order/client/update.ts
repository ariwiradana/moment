import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/lib/db";
import handleError from "@/lib/errorHandling";
import { Client, MediaForm } from "@/lib/types";
import { createSlug } from "@/utils/createSlug";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "PUT") {
      res.setHeader("Allow", ["PUT"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const client: Client = req.body;
    if (!client.id) throw new Error("ID undangan wajib diisi.");
    if (!client.slug) throw new Error("Link undangan wajib diisi.");

    const slug = createSlug(client.slug);

    // 🔹 Cek slug unik selain dirinya sendiri
    const { rows: slugExists } = await sql.query(
      `SELECT 1 FROM clients WHERE slug = $1 AND id != $2 LIMIT 1;`,
      [slug, client.id]
    );
    if (slugExists.length > 0)
      throw new Error(`Undangan dengan link ${client.slug} sudah terpakai.`);

    // 🔹 Update data utama klien
    const {
      rows: [updatedClient],
    } = await sql.query(
      `
      UPDATE clients
      SET slug = $1,
          name = $2,
          phone = $3,
          theme_id = $4,
          theme_category_id = $5,
          status = $6,
          package_id = $7,
          opening_title = $8,
          opening_description = $9,
          closing_title = $10,
          closing_description = $11,
          gift_bank_name = $12,
          gift_account_name = $13,
          gift_account_number = $14,
          email = $15,
          updated_at = NOW()
      WHERE id = $16
      RETURNING *;
      `,
      [
        slug,
        client.name,
        client.phone || null,
        client.theme_id,
        client.theme_category_id,
        client.status,
        client.package_id,
        client.opening_title,
        client.opening_description,
        client.closing_title,
        client.closing_description,
        client.gift_bank_name || null,
        client.gift_account_name || null,
        client.gift_account_number || null,
        client.email,
        client.id,
      ]
    );

    // 🔹 Update / insert media
    const { rows: existingMedia } = await sql.query(
      `SELECT id FROM media WHERE client_id = $1;`,
      [client.id]
    );
    const { music_title, image_link, video_link } = client.media as MediaForm;

    if (existingMedia.length > 0) {
      await sql.query(
        `
        UPDATE media
        SET
          music_title = $2,
          image_link = $3,
          video_link = $4,
          updated_at = NOW()
        WHERE client_id = $1;
        `,
        [client.id, music_title, image_link, video_link]
      );
    } else {
      await sql.query(
        `
        INSERT INTO media (client_id, music_title, image_link, video_link)
        VALUES ($1, $2, $3, $4);
        `,
        [client.id, music_title, image_link, video_link]
      );
    }

    // 🔹 Update participants
    if (Array.isArray(client.participants)) {
      await sql.query(`DELETE FROM participants WHERE client_id = $1;`, [
        client.id,
      ]);

      if (client.participants.length > 0) {
        const participantValues = client.participants.map((p) => [
          client.id,
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
          )
          VALUES ${participantValues
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
    }

    // 🔹 Update events
    if (Array.isArray(client.events)) {
      await sql.query(`DELETE FROM events WHERE client_id = $1;`, [client.id]);

      if (client.events.length > 0) {
        const eventValues = client.events.map((e) => [
          client.id,
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
          )
          VALUES ${eventValues
            .map(
              (_, i) =>
                `(${Array.from(
                  { length: 8 },
                  (_, j) => `$${i * 8 + j + 1}`
                ).join(", ")})`
            )
            .join(", ")}
          RETURNING *;
        `;
        await sql.query(eventQuery, eventValues.flat());
      }
    }

    return res.status(200).json({
      success: true,
      message: "Undanganmu berhasil disimpan.",
      data: {
        ...updatedClient,
        media: { music_title: video_link, image_link },
        participants: client.participants || [],
        events: client.events || [],
      },
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export default handler;
