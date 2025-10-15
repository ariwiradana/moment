import { NextApiRequest, NextApiResponse } from "next";
import handleError from "@/lib/errorHandling";
import { Order } from "@/lib/types";
import midtransClient from "midtrans-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const order: Order = req.body;

    if (!order.order_id) throw new Error("ID order wajib diisi.");
    if (!order.price) throw new Error("Harga wajib diisi.");

    const clientKey = process.env.MIDTRANS_CLIENT_KEY;
    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    if (!clientKey || !serverKey)
      throw new Error("MIDTRANS key belum dikonfigurasi.");

    const snap = new midtransClient.Snap({
      isProduction: process.env.NODE_ENV === "production",
      serverKey,
      clientKey,
    });

    const grossAmount = order.price - (order.discount || 0);

    const parameter = {
      transaction_details: {
        order_id: order.order_id,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: order.client?.name,
        email: order.client?.email,
        phone: order.client?.phone,
      },
      callbacks: {
        finish: `${process.env.BASE_URL}/order/${order.order_id}`,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return res.status(200).json({
      success: true,
      data: transaction,
      env: process.env.NODE_ENV,
    });
  } catch (error) {
    return handleError(res, error);
  }
}
