import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cards";
import "swiper/css/grid";
import "moment/locale/id";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        ></meta>
      </Head>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}
