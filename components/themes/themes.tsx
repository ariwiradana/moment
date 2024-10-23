import { Client } from "@/lib/types";
import React from "react";
import Samaya from "./Samaya/theme";
import Aakarshana from "./Akarshana/theme";
import Flora from "./Flora/theme";

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
  Flora: (client: Client, untuk: string) => (
    <Flora client={client} untuk={untuk} />
  ),
};
