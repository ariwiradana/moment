import sql from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { slug } = req.query;
    if (!slug || typeof slug !== "string") {
      return res.status(400).json({ error: "Invalid slug" });
    }

    const query = `
      SELECT 
        c.name,
        c.slug,
        c.opening_title,
        c.opening_description,
        c.status,
        c.is_preview,
        c.seo,
        c.cover,
        t.name AS theme_name,
        (
          SELECT string_agg(e.name, ', ')
          FROM events e
          WHERE e.client_id = c.id
        ) AS event_names
      FROM clients c
      LEFT JOIN themes t ON t.id = c.theme_id
      WHERE c.slug = $1
      LIMIT 1;
    `;

    const result = await sql.query(query, [slug]);
    const client = result.rows[0];

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    // === Generate SEO fields ===
    const name = client.name || "";
    const theme_name = client.theme_name || "";
    const description = `${client.opening_title || ""}, ${
      client.opening_description || ""
    }`;
    const seo_image = client.seo || client.cover || "/default-cover.jpg";
    const url = `https://momentinvitation.com/${encodeURIComponent(slug)}`;
    const page_title =
      client.status === "unpaid"
        ? `Preview ${name} | Undangan ${theme_name}`
        : client.is_preview
        ? `Preview Undangan Tema ${theme_name} | Moment`
        : `${name} | Undangan ${client.event_names || ""}`;

    const seo = {
      name,
      theme_name,
      description,
      page_title,
      seo_image,
      url,
    };

    return res.status(200).json({ data: seo });
  } catch (error) {
    console.error("SEO API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
