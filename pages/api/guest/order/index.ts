import handleError from "@/lib/errorHandling";
import sql from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { Order } from "@/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method, query } = req;

    if (method !== "GET") {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }

    const orderId = query.order_id as string | undefined;
    if (!orderId) return handleError(res, new Error("ID Pesanan wajib diisi."));

    const {
      rows: [order],
    } = await sql.query<Order>(
      `SELECT * FROM orders WHERE order_id = $1 LIMIT 1;`,
      [orderId]
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Pesanan /${orderId} tidak ditemukan.`,
      });
    }

    const [
      clientRes,
      formRes,
      participantsRes,
      eventsRes,
      packageRes,
      themeRes,
    ] = await Promise.all([
      // Ambil client
      sql.query(`SELECT * FROM clients WHERE id = $1;`, [order.client_id]),

      // Ambil media/form
      sql.query(`SELECT * FROM media WHERE client_id = $1;`, [order.client_id]),

      // Ambil participants
      sql.query(`SELECT * FROM participants WHERE client_id = $1;`, [
        order.client_id,
      ]),

      // Ambil events
      sql.query(`SELECT * FROM events WHERE client_id = $1;`, [
        order.client_id,
      ]),

      // Ambil package berdasarkan package_id yang ada di client
      sql.query(
        `SELECT * FROM packages WHERE id = (
          SELECT package_id FROM clients WHERE id = $1
        );`,
        [order.client_id]
      ),

      // Ambil theme berdasarkan theme_id yang ada di client
      sql.query(
        `SELECT 
          id,
          slug,
          name,
          phone_thumbnail,
          package_ids,
          (
            SELECT json_agg(p.*)
            FROM packages p
            WHERE p.id = ANY(themes.package_ids)
          ) AS packages
        FROM themes
        WHERE id = (
          SELECT theme_id FROM clients WHERE id = $1
        );`,
        [order.client_id]
      ),
    ]);

    const fullOrderData = {
      ...order,
      client: {
        ...clientRes.rows[0],
        participants: participantsRes.rows ?? [],
        events: eventsRes.rows ?? [],
        media: formRes.rows[0] ?? null,
        package: packageRes.rows[0] ?? null,
        theme: themeRes.rows[0] ?? null,
      },
    };

    return res.status(200).json({
      success: true,
      message: "Data pesanan berhasil diambil.",
      data: fullOrderData,
    });
  } catch (error) {
    return handleError(res, error);
  }
}
