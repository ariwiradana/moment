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

  const start = performance.now();

  try {
    const { slug }: Query = req.query;
    if (!slug) return handleError(res, new Error("Missing slug."));

    console.time("⏱ Optimized main query");

    const { rows } = await sql.query(
      `
      SELECT 
        c.*,

        json_build_object(
          'id', t.id,
          'slug', t.slug,
          'name', t.name,
          'thumbnail', t.thumbnail,
          'phone_thumbnail', t.phone_thumbnail,
          'features', t.features,
          'is_preview', t.is_preview
        ) AS theme,

        json_build_object(
          'id', p.id,
          'name', p.name,
          'custom_opening_closing', p.custom_opening_closing,
          'unlimited_revisions', p.unlimited_revisions,
          'unlimited_guest_names', p.unlimited_guest_names,
          'max_events', p.max_events,
          'max_gallery_photos', p.max_gallery_photos,
          'contact_social_media', p.contact_social_media,
          'background_sound', p.background_sound,
          'max_videos', p.max_videos,
          'rsvp_and_greetings', p.rsvp_and_greetings,
          'digital_envelope', p.digital_envelope,
          'google_maps_integration', p.google_maps_integration,
          'add_to_calendar', p.add_to_calendar,
          'countdown', p.countdown,
          'price', p.price,
          'discount', p.discount
        ) AS package,

        json_build_object(
          'id', tc.id,
          'slug', tc.slug,
          'name', tc.name
        ) AS theme_category,

        COALESCE(pr.participants, '[]'::jsonb) AS participants,
        COALESCE(ev.events, '[]'::jsonb) AS events,
        COALESCE(ws.wishes, '[]'::jsonb) AS wishes

      FROM clients c
      LEFT JOIN themes t ON t.id = c.theme_id
      LEFT JOIN packages p ON p.id = c.package_id
      LEFT JOIN theme_categories tc ON tc.id = c.theme_category_id

      LEFT JOIN LATERAL (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', id,
            'name', name,
            'nickname', nickname,
            'address', address,
            'child', child,
            'parents_male', parents_male,
            'parents_female', parents_female,
            'image', image,
            'role', role,
            'facebook', facebook,
            'twitter', twitter,
            'instagram', instagram,
            'tiktok', tiktok
          ) ORDER BY id
        ) AS participants
        FROM participants
        WHERE client_id = c.id
      ) pr ON TRUE

      LEFT JOIN LATERAL (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', id,
            'name', name,
            'date', date,
            'start_time', start_time,
            'end_time', end_time,
            'address', address,
            'address_url', address_url,
            'image', image
          ) ORDER BY date ASC, start_time::time ASC
        ) AS events
        FROM events
        WHERE client_id = c.id
      ) ev ON TRUE

      LEFT JOIN LATERAL (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', id,
            'name', name,
            'attendant', attendant,
            'wishes', wishes
          ) ORDER BY id
        ) AS wishes
        FROM wishes
        WHERE client_id = c.id
      ) ws ON TRUE

      WHERE c.slug = $1
      LIMIT 1;
      `,
      [slug]
    );

    console.timeEnd("⏱ Optimized main query");

    const client = rows[0] || null;
    console.log(`🔥 Total time: ${(performance.now() - start).toFixed(2)} ms`);

    return res.status(200).json({ success: true, data: client });
  } catch (error) {
    handleError(res, error);
  }
};

export default handler;
