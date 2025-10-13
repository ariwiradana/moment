import sql from "@/lib/db";
import { getEventNames } from "@/utils/getEventNames";
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
          c.id, c.name, c.status, c.is_preview, c.theme_id,
          c.opening_title, c.opening_description, c.seo,
          t.name as theme_name,
          COALESCE(
            json_agg(
              json_build_object(
                'name', e.name
              )
            ) FILTER (WHERE e.id IS NOT NULL),
            '[]'
          ) AS events
        FROM clients c
        JOIN themes t ON c.theme_id = t.id
        LEFT JOIN events e ON e.client_id = c.id
        WHERE c.slug = $1
        GROUP BY c.id, t.name
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
        ? `Preview Undangan Tema ${theme_name} | Moment ${
            client.event_names || ""
          }`
        : `${name} | Undangan ${getEventNames(client.event_names) || ""}`;

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
