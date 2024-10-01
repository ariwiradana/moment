import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "moment/locale/id";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}
