import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { ThemeUsage } from "@/lib/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const query = `
          SELECT 
            t.*,
            c.slug AS client_slug,
            p_min.price AS start_from,
            p_min.discount AS discount,
            (
              SELECT COUNT(*)::int
              FROM clients c2
              JOIN themes t2 ON t2.id = c2.theme_id
              WHERE t2.slug = t.slug
            ) AS usage_count
          FROM themes t
          JOIN clients c
              ON c.theme_id = t.id
          JOIN LATERAL (
              SELECT p.*
              FROM packages p
              WHERE p.id = ANY(t.package_ids)
              ORDER BY p.price ASC
              LIMIT 1
          ) p_min ON true
          WHERE c.is_preview = $1
          ORDER BY t.updated_at DESC;
        `;

        const { rows: themes } = await sql.query<ThemeUsage>(query, [true]);

        return res.status(200).json({
          success: true,
          data: themes,
        });
      } catch (error) {
        return handleError(res, error);
      }

    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
