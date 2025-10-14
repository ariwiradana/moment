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

    const { slug } = req.query;
    const order: Order = req.body;

    if (!order.order_id) throw new Error("ID order wajib diisi.");
    if (!order.price) throw new Error("Harga wajib diisi.");

    const snap = new midtransClient.Snap({
      isProduction: process.env.NODE_ENV === "production",
      serverKey: process.env.MIDTRANS_SERVER_KEY as string,
      clientKey: process.env.MIDTRANS_CLIENT_KEY as string,
    });

    const parameter = {
      transaction_details: {
        order_id: order.order_id,
        gross_amount: order.price - order.discount,
      },
      customer_details: {
        first_name: order.name,
        email: order.email,
        phone: order.phone,
      },
      callbacks: {
        finish: `${process.env.BASE_URL}/${slug}/order/berhasil`,
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
