import { Client } from "@/lib/types";
import React from "react";
import Theme1 from "./Theme1/theme";

export const themes: Record<
  string,
  (client: Client, to: string) => JSX.Element
> = {
  Aakarshana: (client: Client, to: string) => (
    <Theme1 client={client} to={to} />
  ),
};
