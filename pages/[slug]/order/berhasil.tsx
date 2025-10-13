import ButtonPrimary from "@/components/dashboard/elements/button.primary";
import Seo from "@/components/dashboard/elements/seo";
import Layout from "@/components/dashboard/layout";
import { redhat } from "@/lib/fonts";
import useOrderStore from "@/store/useOrderStore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiCheckCircle, BiHomeAlt } from "react-icons/bi";

const OrderComplete = () => {
  const router = useRouter();
  const { slug } = router.query as { slug?: string };
  const store = useOrderStore();

  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <>
      <Seo
        url={`https://momentinvitation.com/${slug}/order/berhasil`}
        title={`Order Berhasil | Moment Invitation`}
        description="Terima kasih! Pembayaran kamu telah berhasil. Undangan digitalmu kini sedang diproses dan akan segera aktif. Tim Moment akan segera menghubungimu untuk langkah selanjutnya."
        keywords={`order berhasil undangan digital, pembayaran berhasil undangan pernikahan Bali, aktivasi undangan online, sukses order Moment, konfirmasi pembayaran Moment, undangan digital aktif, pesanan undangan selesai, moment invitation`}
        image="https://res.cloudinary.com/dsbmvj2s3/image/upload/v1759919489/seo_cvsy5o.webp"
        noIndex
      />
      <Layout>
        <div
          className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-6 text-center ${redhat.className}`}
        >
          <div className="bg-white shadow-xl shadow-dashboard-dark/5 p-8 max-w-md w-full">
            <div className="flex justify-center mb-6">
              <BiCheckCircle className="w-16 h-16 text-admin-success" />
            </div>

            <h1 className="text-2xl font-semibold text-dashboard-dark mb-2">
              Pembayaran Berhasil 🎉
            </h1>

            <p className="text-dashboard-dark/60 mb-6">
              Terima kasih,{" "}
              <span className="font-medium">{store.form.name || "Client"}</span>
              ! Pesananmu telah kami terima dan akan segera diproses. Tim Moment
              akan menghubungimu dalam waktu dekat. 💌
            </p>

            <div className="bg-dashboard-dark/[0.02] border border-dashboard-dark/10 p-4 text-left mb-6">
              <p className="text-sm text-dashboard-dark/50 mb-1">
                Nomor Invoice
              </p>
              <p className="font-medium text-dashboard-dark">
                {"INV-MOMENT-XXXX"}
              </p>
            </div>

            <div className="flex justify-center">
              <Link href="/">
                <ButtonPrimary
                  title="Kembali ke Beranda"
                  icon={<BiHomeAlt />}
                />
              </Link>
            </div>
            <p className="text-xs text-dashboard-dark/40 mt-4">
              Kamu akan diarahkan otomatis dalam {countdown} detik...
            </p>
          </div>

          <p
            className={`${redhat.className} text-zinc-400 text-center p-3 mt-2 text-xs`}
          >
            © 2025 Moment | Designed with ❤️ by Moment
          </p>
        </div>
      </Layout>
    </>
  );
};

export default OrderComplete;
