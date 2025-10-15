import { Order } from "@/lib/types";

export const sampleOrder: Order = {
  client_id: 1,
  order_id: "MOM-INV-0001",
  price: 750000,
  discount: 1000,
  admin_fee: 1000,
  created_at: new Date().toISOString(),
  status: "pending",
};
