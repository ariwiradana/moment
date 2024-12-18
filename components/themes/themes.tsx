import React from "react";
import Samaya from "./Samaya/theme";
import Aruna from "./Aruna/theme";

export const themes: Record<string, (untuk: string) => JSX.Element> = {
  Samaya: (untuk: string) => <Samaya untuk={untuk} />,
  Aruna: (untuk: string) => <Aruna untuk={untuk} />,
};
