import { Option } from "@/lib/types";

export const orderStatus: Option[] = [
  { label: "Pending", value: "pending" },
  { label: "Settlement", value: "settlement" },
  { label: "Expire", value: "expire" },
  { label: "Cancel", value: "cancel" },
  { label: "Expire", value: "expire" },
  { label: "Deny", value: "deny" },
  { label: "Failure", value: "failure" },
];
