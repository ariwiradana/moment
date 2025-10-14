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
    if (!order.theme_id) throw new Error("ID tema wajib diisi.");
    if (!order.package_id) throw new Error("ID paket wajib diisi.");

    const {
      rows: [newOrder],
    } = await sql.query(
      `INSERT INTO orders (
        order_id, client_id, name, phone, theme_id, package_id, price,
        discount, admin_fee
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `,
      [
        order.order_id,
        order.client_id,
        order.name,
        order.phone,
        order.theme_id,
        order.package_id,
        order.price,
        order.discount,
        order.admin_fee,
      ]
    );

    return res.status(200).json({
      success: true,
      data: newOrder,
      message: "Pesanan Anda telah berhasil diproses.",
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export default handler;
