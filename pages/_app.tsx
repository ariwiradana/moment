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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
