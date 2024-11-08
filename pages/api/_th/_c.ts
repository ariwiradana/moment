import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";
import { ApiHandler } from "@/lib/types";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        const query = `
          SELECT category, COUNT(*)::int AS amount
          FROM themes
          GROUP BY category;`;

        const { rows } = await sql.query(query);

        return res.status(200).json({
          success: true,
          data: rows,
        });
      } catch (error) {
        handleError(res, error);
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authenticateUser(handler as ApiHandler);
