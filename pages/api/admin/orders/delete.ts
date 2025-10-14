import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/lib/db";
import handleError from "@/lib/errorHandling";
import { ApiHandler } from "@/lib/types";
import { authenticateUser } from "@/lib/middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "DELETE") {
      res.setHeader("Allow", ["DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { id } = req.query;

    const {
      rows: [order],
    } = await sql.query(`SELECT * FROM orders WHERE id = $1`, [Number(id)]);

    if (!order) {
      throw new Error("Order tidak ditemukan");
    }

    const {
      rows: [deleted],
    } = await sql.query(`DELETE FROM orders WHERE id = $1 returning *`, [
      Number(id),
    ]);

    if (!deleted) {
      throw new Error("Gagal menghapus order");
    }

    return res.status(200).json({
      success: true,
      data: deleted,
      message: "Order berhasil dihapus.",
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export default authenticateUser(handler as ApiHandler);
