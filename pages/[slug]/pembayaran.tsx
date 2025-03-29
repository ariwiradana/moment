import Seo from "@/components/dashboard/elements/seo";
import Layout from "@/components/dashboard/layout";
import { PaymentMethod, paymentMethods } from "@/constants/paymentMethod";
import { sosmedURLs } from "@/constants/sosmed";
import useDashboardStore from "@/store/useDashboardStore";
import { redhat } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import toast from "react-hot-toast";
import { BiLogoWhatsapp } from "react-icons/bi";
import AOS from "aos";
import "aos/dist/aos.css";
import { GetServerSideProps } from "next";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Client } from "@/lib/types";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { getDiscountPrice } from "@/utils/getDiscountPrice";
import { BsCopy } from "react-icons/bs";
import ButtonWhite from "@/components/admin/elements/button.white";

interface DashboardPaymentProps {
  slug: string;
}

const DashboardPayment: FC<DashboardPaymentProps> = ({ slug }) => {
  const { setActiveSection } = useDashboardStore();

  useEffect(() => setActiveSection("section6"), []);

  const { data } = useSWR(slug ? `/api/_pb/_c?slug=${slug}` : null, fetcher);

  const client: Client | null = data?.data?.length ? data.data[0] : null;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 0,
    });
  }, []);

  return (
    <Layout>
      <Seo
        url={`https://momentinvitation.com/${slug}`}
        title="Pembayaran | Moment"
        description={`Proses pembayaran undangan digital di Moment sangat mudah dan aman. Pilih paket yang Anda inginkan, lakukan pembayaran dengan berbagai metode yang tersedia, dan segera mulai membuat undangan Anda.`}
        keywords={`pembayaran undangan digital Bali, cara bayar undangan digital, pembayaran undangan pernikahan Bali, pembayaran undangan mempandes Bali, metode pembayaran undangan digital, bayar undangan Bali, pembayaran aman undangan Bali, transaksi undangan digital Bali, undangan Bali pembayaran mudah`}
        image="https://res.cloudinary.com/dwitznret/image/upload/v1734241503/seo_xftrjs.webp"
      />

      <div className="max-w-screen-xl mx-auto px-4 md:px-12 lg:px-4 py-8 md:py-10 lg:py-16 mt-12 md:mt-16 lg:mt-20">
        <div>
          <div data-aos="fade-up">
            <h1
              className={`${redhat.className} text-2xl md:text-3xl lg:text-4xl whitespace-nowrap font-semibold text-dashboard-dark`}
            >
              Cara Melakukan
              <br />
              Pembayaran
            </h1>
            <p
              className={`${redhat.className} text-sm text-dashboard-dark/70 mt-2 lg:max-w-[70%]`}
            >
              Pembayaran dapat dilakukan melalui bank transfer
              {client && (
                <>
                  {" "}
                  dengan harga promo{" "}
                  <span className="text-dashboard-dark font-semibold">
                    {formatToRupiah(
                      getDiscountPrice(client?.package?.price || 0, 20)
                    )}
                  </span>{" "}
                  sesuai dengan{" "}
                  <span className="text-dashboard-dark font-semibold">
                    Paket {client?.package?.name}
                  </span>{" "}
                  yang dipilih
                </>
              )}
              . Setelah transfer, konfirmasikan pembayaranmu dengan mengirimkan
              bukti transfer pada pesan WhatsApp.
            </p>
          </div>
          <div
            className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 my-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {paymentMethods.map((payment) => (
              <BankCard
                color={payment.color}
                key={payment.paymentProvider}
                accountName={payment.accountName}
                accountNumber={payment.accountNumber}
                iconSrc={payment.iconSrc}
                paymentProvider={payment.paymentProvider}
              />
            ))}
          </div>
        </div>

        <div
          className="w-full p-8 md:p-10 bg-dashboard-dark"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h1
            className={`${redhat.className} text-2xl md:text-3xl lg:text-4xl text-white font-semibold`}
          >
            Konfirmasi Pembayaran
          </h1>
          <p
            className={`${redhat.className} text-sm text-white/70 mt-2 lg:max-w-[50%] mb-6`}
          >
            Setelah melakukan pembayaran, kirim bukti transfer Anda langsung
            melalui WhatsApp untuk proses verifikasi yang lebih cepat!.
          </p>
          <Link target="_blank" href={sosmedURLs.whatsapp}>
            <ButtonWhite
              className="bg-white text-dashboard-dark"
              type="submit"
              title=" Konfirmasi Pembayaran"
              icon={<BiLogoWhatsapp />}
            />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

const BankCard: FC<PaymentMethod> = ({
  paymentProvider,
  accountName,
  accountNumber,
  iconSrc,
}) => {
  const handleCopyPayment = (accountNumber: number) => {
    navigator.clipboard
      .writeText(accountNumber.toString())
      .then(() => {
        toast.success("Berhasil disalin.", {
          className: `${redhat.className} text-sm border border-white/20`,
          style: {
            boxShadow: "none",
            bottom: 0,
            backgroundColor: "#101010",
            color: "white",
            borderRadius: 100,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Gagal menyalin metode pembayaran");
      });
  };

  return (
    <div className={``}>
      <div className="flex justify-between items-end md:items-center">
        <div className="flex items-center gap-3 lg:gap-4">
          <div
            className={`w-16 lg:w-20 aspect-[3/2] flex justify-center items-center relative border border-dashboard-dark/10`}
          >
            <Image
              sizes="100px"
              alt={paymentProvider}
              src={iconSrc}
              fill
              className="object-contain p-1"
            />
          </div>
          <div>
            <h5
              className={`${redhat.className} text-base text-dashboard-dark font-semibold`}
            >
              {accountName}
            </h5>
            <p className={`${redhat.className} text-sm text-dashboard-dark/70`}>
              {accountNumber}
            </p>
          </div>
        </div>
        <button
          onClick={() =>
            handleCopyPayment(parseInt(accountNumber.replaceAll("-", "")))
          }
          className={`${redhat.className} text-xs flex items-center gap-x-2 outline-none border whitespace-nowrap bg-dashboard-dark text-white rounded-full px-4 py-2`}
        >
          Salin
          <BsCopy />
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  return {
    props: {
      slug,
    },
  };
};

export default DashboardPayment;
