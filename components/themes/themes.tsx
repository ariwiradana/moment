import React from "react";
import Samaya from "./Samaya/theme";
import Aruna from "./Aruna/theme";
import Nirvaya from "./Nirvaya/theme";
import Luma from "./Luma/theme";

export type ThemeName = "Samaya" | "Aruna" | "Nirvaya" | "Luma";

export const themes: Record<ThemeName, React.FC<{ untuk: string }>> = {
  Samaya: Samaya,
  Aruna: Aruna,
  Nirvaya: Nirvaya,
  Luma: Luma,
};
