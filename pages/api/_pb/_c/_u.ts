import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

interface Query {
  slug?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { slug }: Query = req.query;

    // Ambil client + theme + package + theme_category sekaligus
    const { rows } = await sql.query(
      `
      SELECT c.*, 
        t.id AS theme_id, t.slug AS theme_slug, t.name AS theme_name, t.thumbnail AS theme_thumbnail, t.phone_thumbnail AS theme_phone_thumbnail, t.cover_video AS theme_cover_video, t.is_preview AS theme_is_preview,
        p.id AS package_id, p.name AS package_name, p.price AS package_price, p.discount AS package_discount, p.custom_opening_closing AS package_custom_opening_closing, p.unlimited_revisions AS package_unlimited_revisions,
        tc.id AS theme_category_id, tc.slug AS theme_category_slug, tc.name AS theme_category_name
      FROM clients c
      LEFT JOIN themes t ON c.theme_id = t.id
      LEFT JOIN packages p ON c.package_id = p.id
      LEFT JOIN theme_categories tc ON c.theme_category_id = tc.id
      WHERE c.slug = $1
      `,
      [slug]
    );

    const client = rows[0];

    if (!client) return res.status(200).json({ success: true, data: null });

    const [participantsRes, eventsRes, wishesRes] = await Promise.all([
      sql.query(
        "SELECT * FROM participants WHERE client_id = $1 ORDER BY id ASC",
        [client.id]
      ),
      sql.query(
        "SELECT * FROM events WHERE client_id = $1 ORDER BY date ASC, start_time::time ASC",
        [client.id]
      ),
      sql.query("SELECT * FROM wishes WHERE client_id = $1", [client.id]),
    ]);

    client.participants = participantsRes.rows;
    client.events = eventsRes.rows;
    client.wishes = wishesRes.rows;

    // Format theme, package, theme_category
    client.theme = {
      id: client.theme_id,
      slug: client.theme_slug,
      name: client.theme_name,
      thumbnail: client.theme_thumbnail,
      phone_thumbnail: client.theme_phone_thumbnail,
      cover_video: client.theme_cover_video,
      is_preview: client.theme_is_preview,
    };

    client.package = {
      id: client.package_id,
      name: client.package_name,
      price: client.package_price,
      discount: client.package_discount,
      custom_opening_closing: client.package_custom_opening_closing,
      unlimited_revisions: client.package_unlimited_revisions,
    };

    client.theme_category = {
      id: client.theme_category_id,
      slug: client.theme_category_slug,
      name: client.theme_category_name,
    };

    return res.status(200).json({ success: true, data: client });
  } catch (error) {
    handleError(res, error);
  }
};

export default handler;
