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
          (
            SELECT COUNT(DISTINCT c2.id)
            FROM clients c2
            WHERE c2.theme_id = t.id
          )::int AS usage_count,
          MIN(c.slug) AS client_slug,
          json_agg(
            json_build_object(
              'id', ts.id,
              'name', ts.name,
              'comments', ts.comments,
              'created_at', ts.created_at,
              'updated_at', ts.updated_at
            )
          ) FILTER (WHERE ts.id IS NOT NULL) AS testimonials
        FROM themes t
        JOIN clients c ON c.theme_id = t.id
        LEFT JOIN testimonials ts ON ts.client_id = c.id
        WHERE t.active = TRUE
          AND c.is_preview = TRUE
        GROUP BY t.id, t.slug, t.name, t.active, t.updated_at
        ORDER BY t.updated_at DESC;
        `;

        const { rows } = await sql.query(query);

        const { rows: packages } = await sql.query(
          `SELECT * FROM packages ORDER BY id ASC`
        );

        const themes = rows.map((theme: ThemeUsage) => {
          const packageIdsSet = new Set(theme.package_ids);
          const filteredPackage = packages.filter((pkg) =>
            packageIdsSet.has(pkg.id)
          );

          return {
            ...theme,
            packages: filteredPackage,
          };
        });

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
