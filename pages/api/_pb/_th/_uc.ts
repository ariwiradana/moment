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
    COUNT(DISTINCT c.id)::int AS usage_count,
    MIN(c.slug) AS client_slug -- ambil salah satu slug (yang terkecil misalnya)
  FROM themes t
  JOIN clients c ON c.theme_id = t.id
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
