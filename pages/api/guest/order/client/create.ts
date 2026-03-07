import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/lib/db";
import handleError from "@/lib/errorHandling";
import { Client } from "@/lib/types";
import { createSlug } from "@/utils/createSlug";
import { Resend } from "resend";

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
      [slug],
    );
    if (slugExists.length > 0)
      throw new Error(`Undangan dengan link ${client.slug} sudah terpakai.`);

    // 🔹 Insert client data
    const {
      rows: [newClient],
    } = await sql.query(
      `
      INSERT INTO clients (
        slug, name, phone, email, theme_id, theme_category_id, status, package_id,
        opening_title, opening_description, closing_title, closing_description,
        gift_bank_name, gift_account_name, gift_account_number, payment_status
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
      RETURNING *;
    `,
      [
        slug,
        client.name,
        client.phone,
        client.email,
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
        client.payment_status,
      ],
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
      ],
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
                (_, j) => `$${i * 14 + j + 1}`,
              ).join(", ")})`,
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
                ", ",
              )})`,
          )
          .join(", ")}
        RETURNING *;
      `;

      await sql.query(eventQuery, eventValues.flat());
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Order <onboarding@resend.dev>",
      to: ["moment.invitations@gmail.com"],
      subject: "Pesanan Baru Masuk 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; background:#f6f7fb; padding:40px 20px;">
          
          <div style="max-width:520px; margin:auto; background:#ffffff; border-radius:10px; padding:30px; border:1px solid #eee;">
            
            <h2 style="margin:0 0 10px; color:#111;">Pesanan Baru Masuk 🎉</h2>
            <p style="color:#555; margin-bottom:25px;">
              Ada pesanan baru dari website <strong>Moment Invitation</strong>.
            </p>

            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0; color:#777;">Nama</td>
                <td style="padding:10px 0; font-weight:600; color:#111;">
                  ${client.name}
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0; color:#777;">Email</td>
                <td style="padding:10px 0; color:#111;">
                  ${client.email}
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0; color:#777;">No. HP / WhatsApp</td>
                <td style="padding:10px 0; color:#111;">
                  ${client.phone}
                </td>
              </tr>
            </table>

            <div style="margin-top:30px; padding-top:20px; border-top:1px solid #eee; font-size:12px; color:#888;">
              Email ini dikirim otomatis oleh sistem Moment Invitation.
            </div>

          </div>
        </div>
      `,
    });
    // 🔹 Final response
    return res.status(200).json({
      success: true,
      message: "Undanganmu berhasil disimpan.",
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
