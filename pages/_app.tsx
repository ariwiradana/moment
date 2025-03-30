import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cards";
import "swiper/css/grid";
import "swiper/css/pagination";
import "moment/locale/id";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { redhat } from "@/lib/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 4000,
          className: `${redhat.className} text-sm border border-white/20`,
          style: {
            boxShadow: "none",
            bottom: 0,
            backgroundColor: "#101010",
            color: "white",
            borderRadius: 100,
          },
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
