import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

// Get Best Seller Theme based on number of clients using the theme
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const query = `
          SELECT 
            t.id, 
            t.slug,
            t.name,
            COUNT(c.theme_id)::int AS usage_count
          FROM themes t
          JOIN clients c ON c.theme_id = t.id
          GROUP BY t.id, t.slug, t.name
          ORDER BY usage_count DESC;
        `;

        const { rows } = await sql.query(query);

        return res.status(200).json({
          success: true,
          data: rows,
        });
      } catch (error) {
        handleError(res, error);
      }

    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
