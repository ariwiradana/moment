import { NextApiRequest, NextApiResponse } from "next";
import handleError from "@/lib/errorHandling";
import { Order } from "@/lib/types";
import midtransClient from "midtrans-client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const order: Order = req.body;

    if (!order.order_id) throw new Error("ID order wajib diisi.");
    if (!order.price) throw new Error("Harga wajib diisi.");

    const clientKey = process.env.MIDTRANS_CLIENT_KEY as string;
    const serverKey = process.env.MIDTRANS_SERVER_KEY as string;

    if (!clientKey && !serverKey) throw new Error("Key wajib diisi.");

    const snap = new midtransClient.Snap({
      isProduction: process.env.NODE_ENV === "production",
      serverKey,
      clientKey,
    });

    const parameter = {
      transaction_details: {
        order_id: order.order_id,
        gross_amount: order.price - order.discount,
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
    });
  } catch (error) {
    return handleError(res, error);
  }
};

export default handler;
