import { Client } from "@/lib/types";
import React from "react";
import Samaya from "./Samaya/theme";
import Nirvaya from "./Nirvaya/theme";
import Aruna from "./Aruna/theme";

export const themes: Record<
  string,
  (client: Client, untuk: string) => JSX.Element
> = {
  Samaya: (client: Client, untuk: string) => (
    <Samaya client={client} untuk={untuk} />
  ),
  Nirvaya: (client: Client, untuk: string) => (
    <Nirvaya client={client} untuk={untuk} />
  ),
  Aruna: (client: Client, untuk: string) => (
    <Aruna client={client} untuk={untuk} />
  ),
};
