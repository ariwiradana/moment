import { NextApiRequest, NextApiResponse } from "next";
import sql from "@/lib/db";
import handleError from "@/lib/errorHandling";
import { Order } from "@/lib/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const order: Order = req.body;

    if (!order.order_id) throw new Error("ID order wajib diisi.");
    if (!order.client_id) throw new Error("ID klien wajib diisi.");

    const {
      rows: [newOrder],
    } = await sql.query(
      `
      INSERT INTO orders (
        order_id, client_id, price, discount, admin_fee, status
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (order_id)
      DO UPDATE SET
        client_id = EXCLUDED.client_id,
        price = EXCLUDED.price,
        discount = EXCLUDED.discount,
        admin_fee = EXCLUDED.admin_fee,
        status = EXCLUDED.status,
        updated_at = NOW()
      RETURNING *;
      `,
      [
        order.order_id,
        order.client_id,
        order.price,
        order.discount,
        order.admin_fee,
        order.status,
      ]
    );

    return res.status(200).json({
      success: true,
      data: newOrder,
      message: newOrder
        ? "Pesananmu berhasil disimpan."
        : "Tidak ada perubahan pada pesanan.",
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export default handler;
