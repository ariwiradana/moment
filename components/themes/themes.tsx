import { Client } from "@/lib/types";
import React from "react";
import Samaya from "./Samaya/theme";
import Aakarshana from "./Akarshana/theme";

export const themes: Record<
  string,
  (client: Client, untuk: string) => JSX.Element
> = {
  Aakarshana: (client: Client, untuk: string) => (
    <Aakarshana client={client} untuk={untuk} />
  ),
  Samaya: (client: Client, untuk: string) => (
    <Samaya client={client} untuk={untuk} />
  ),
};
