import { Client } from "@/lib/types";
import React from "react";
import Theme1 from "./Theme1/theme";

export const themes: Record<
  string,
  (client: Client, untuk: string) => JSX.Element
> = {
  Aakarshana: (client: Client, untuk: string) => (
    <Theme1 client={client} untuk={untuk} />
  ),
};
