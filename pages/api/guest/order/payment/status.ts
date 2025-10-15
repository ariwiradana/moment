import type { NextApiRequest, NextApiResponse } from "next";
import handleError from "@/lib/errorHandling";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { order_id } = req.query;
    if (!order_id) throw new Error("order_id wajib diisi.");

    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) throw new Error("Server key belum dikonfigurasi.");

    const authHeader = Buffer.from(`${serverKey}:`).toString("base64");

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://api.midtrans.com/v2"
        : "https://api.sandbox.midtrans.com/v2";

    const response = await fetch(`${baseUrl}/${order_id}/status`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: data.status_message || "Gagal mengambil status transaksi",
        data,
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return handleError(res, error);
  }
}
