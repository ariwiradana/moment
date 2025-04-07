import "@/styles/globals.css";
import "moment/locale/id";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { redhat } from "@/lib/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster
        toastOptions={{
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
