import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "moment/locale/id";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
