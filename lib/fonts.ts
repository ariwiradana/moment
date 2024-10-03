import {
  Comfortaa,
  Tangerine,
  Montserrat,
  Alex_Brush,
  Playfair_Display,
  Satisfy,
  Poppins,
} from "next/font/google";

export const tangerine = Tangerine({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const comforta = Comfortaa({
  subsets: ["latin"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
});

export const alexbrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
});

export const satisfy = Satisfy({
  subsets: ["latin"],
  weight: ["400"],
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
});

export const poppins = Poppins({
  weight: ["400", "700", "100", "200", "300", "500", "600", "800", "900"],
  subsets: ["latin"],
});
