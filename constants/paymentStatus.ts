import { Option } from "@/lib/types";

export const paymentStatus: Option[] = [
  { label: "Pending", value: "pending" },
  { label: "Lunas", value: "paid" },
  { label: "Batal", value: "cancelled" },
];
