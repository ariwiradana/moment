import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { createSlug } from "@/utils/createSlug";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method, query } = req;

    if (method !== "GET") {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }

    const rawSlug = query.slug as string | undefined;
    if (!rawSlug)
      return handleError(res, new Error("Slug undangan wajib diisi."));

    const slug = createSlug(rawSlug);

    const { rows: clientRows } = await sql.query(
      `SELECT * FROM clients WHERE slug = $1 LIMIT 1;`,
      [slug]
    );

    if (clientRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Klien /${slug} tidak ditemukan.`,
      });
    }

    const client = clientRows[0];

    const [formRes, participantsRes, eventsRes, packageRes, themeRes] =
      await Promise.all([
        sql.query(`SELECT * FROM media WHERE client_id = $1;`, [
          client.id,
        ]),
        sql.query(`SELECT * FROM participants WHERE client_id = $1;`, [
          client.id,
        ]),
        sql.query(`SELECT * FROM events WHERE client_id = $1;`, [client.id]),
        sql.query(`SELECT * FROM packages WHERE id = $1;`, [client.package_id]),
        sql.query(
          `SELECT 
            id,
            name,
            thumbnail,
            package_ids,
            (
              SELECT json_agg(p.*)
              FROM packages p
              WHERE p.id = ANY(themes.package_ids)
            ) AS packages
          FROM themes
          WHERE id = $1;`,
          [client.theme_id]
        ),
      ]);

    const fullClientData = {
      ...client,
      media: formRes.rows[0] ?? null,
      participants: participantsRes.rows ?? [],
      events: eventsRes.rows ?? [],
      package: packageRes.rows[0] ?? null,
      theme: themeRes.rows[0] ?? null,
    };

    return res.status(200).json({
      success: true,
      message: "Data undangan berhasil diambil.",
      data: fullClientData,
    });
  } catch (error) {
    return handleError(res, error);
  }
}
