import React from "react";
import Samaya from "./Samaya/theme";
import Aruna from "./Aruna/theme";
import Nirvaya from "./Nirvaya/theme";
import Luma from "./Luma/theme";

export const themes: Record<string, (untuk: string) => JSX.Element> = {
  Samaya: (untuk: string) => <Samaya untuk={untuk} />,
  Aruna: (untuk: string) => <Aruna untuk={untuk} />,
  Nirvaya: (untuk: string) => <Nirvaya untuk={untuk} />,
  Luma: (untuk: string) => <Luma untuk={untuk} />,
};
