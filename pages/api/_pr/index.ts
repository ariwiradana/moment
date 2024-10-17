import handleError from "@/lib/errorHandling";
import { authenticateUser } from "@/lib/middleware";
import { ApiHandler } from "@/lib/types";
import { del } from "@vercel/blob";
import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    let result;

    switch (method) {
      case "DELETE":
        const { id: deleteId, image_url } = req.query;

        if (!deleteId || isNaN(Number(deleteId))) {
          throw new Error("Invalid ID provided");
        }

        const { rows: reviewRows } = await sql.query(
          `SELECT * FROM participants WHERE id = $1`,
          [Number(deleteId)]
        );

        if (reviewRows.length === 0) {
          throw new Error("Participant not found");
        }

        await sql.query(`DELETE FROM participants WHERE id = $1`, [
          Number(deleteId),
        ]);

        if (image_url) await del(image_url as string);

        result = {
          success: true,
          message: "Participant deleted successfully",
        };
        break;

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }

    return res.status(200).json(result);
  } catch (error) {
    return handleError(res, error);
  }
};

export default authenticateUser(handler as ApiHandler);
