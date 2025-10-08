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

    console.time("⏱ Main query (JOIN + JSON_AGG)");
    const { rows } = await sql.query(
      `SELECT 
        c.*,
        -- Theme
        json_build_object(
          'id', t.id,
          'slug', t.slug,
          'name', t.name,
          'thumbnail', t.thumbnail,
          'phone_thumbnail', t.phone_thumbnail,
          'cover_video', t.cover_video,
          'is_preview', t.is_preview
        ) AS theme,

        -- Package
        json_build_object(
          'id', p.id,
          'name', p.name,
          'price', p.price,
          'discount', p.discount,
          'custom_opening_closing', p.custom_opening_closing,
          'unlimited_revisions', p.unlimited_revisions
        ) AS package,

        -- Theme Category
        json_build_object(
          'id', tc.id,
          'slug', tc.slug,
          'name', tc.name
        ) AS theme_category,

        -- Participants
        COALESCE(pr.participants, '[]'::jsonb) AS participants,

        -- Events
        COALESCE(ev.events, '[]'::jsonb) AS events,

        -- Wishes
        COALESCE(ws.wishes, '[]'::jsonb) AS wishes

      FROM clients c
      LEFT JOIN themes t ON c.theme_id = t.id
      LEFT JOIN packages p ON c.package_id = p.id
      LEFT JOIN theme_categories tc ON c.theme_category_id = tc.id

      -- LATERAL SUBQUERIES (each only executes once per client)
      LEFT JOIN LATERAL (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', p2.id,
            'name', p2.name,
            'nickname', p2.nickname,
            'address', p2.address,
            'child', p2.child,
            'parents_male', p2.parents_male,
            'parents_female', p2.parents_female,
            'image', p2.image,
            'role', p2.role,
            'facebook', p2.facebook,
            'twitter', p2.twitter,
            'instagram', p2.instagram,
            'tiktok', p2.tiktok
          ) ORDER BY p2.id
        ) AS participants
        FROM participants p2
        WHERE p2.client_id = c.id
      ) pr ON TRUE

      LEFT JOIN LATERAL (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', e2.id,
            'name', e2.name,
            'date', e2.date,
            'start_time', e2.start_time,
            'end_time', e2.end_time,
            'address', e2.address,
            'address_url', e2.address_url,
            'image', e2.image
          ) ORDER BY e2.date ASC, e2.start_time::time ASC
        ) AS events
        FROM events e2
        WHERE e2.client_id = c.id
      ) ev ON TRUE

      LEFT JOIN LATERAL (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', w2.id,
            'name', w2.name,
            'attendant', w2.attendant,
            'wishes', w2.wishes
          ) ORDER BY w2.id
        ) AS wishes
        FROM wishes w2
        WHERE w2.client_id = c.id
      ) ws ON TRUE

      WHERE c.slug = $1
      LIMIT 1;
      `,
      [slug]
    );

    console.timeEnd("⏱ Main query (JOIN + JSON_AGG)");

    const client = rows[0];
    console.log(
      `🔥 Total API time: ${(performance.now() - start).toFixed(2)} ms`
    );

    return res.status(200).json({ success: true, data: client || null });
  } catch (error) {
    handleError(res, error);
  }
};

export default handler;
