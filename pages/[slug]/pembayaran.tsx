import ButtonPrimary from "@/components/dashboard/elements/button.primary";
import ButtonSecondary from "@/components/dashboard/elements/button.secondary";
import Seo from "@/components/dashboard/elements/seo";
import Layout from "@/components/dashboard/layout";
import { PaymentMethod, paymentMethods } from "@/constants/paymentMethod";
import { sosmedURLs } from "@/constants/sosmed";
import useDashboardStore from "@/store/useDashboardStore";
import { afacad, dm } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import toast from "react-hot-toast";
import { BiCheck, BiCopyAlt, BiLogoWhatsapp } from "react-icons/bi";
import AOS from "aos";
import "aos/dist/aos.css";
import { GetServerSideProps } from "next";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Client } from "@/lib/types";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { getDiscountPrice } from "@/utils/getDiscountPrice";

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

      <div className="max-w-screen-2xl mx-auto pt-16 md:pt-20 lg:pt-24 px-6 md:px-12 lg:px-24">
        <div className="py-16">
          <div data-aos="fade-up">
            <h1
              className={`${dm.className} text-4xl md:text-5xl lg:text-6xl font-bold`}
            >
              Cara Melakukan <br />
              Pembayaran
            </h1>
            <p
              className={`${afacad.className} text-gray-500 text-lg md:text-xl mt-3 lg:max-w-[70%]`}
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

            <p
              className={`${afacad.className} text-gray-500 text-lg md:text-xl mt-3 lg:max-w-[70%]`}
            ></p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {paymentMethods.map((payment) => (
              <BankCard
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
          className="w-full rounded-lg p-8 lg:p-16 bg-dashboard-dark mt-6 mb-16"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h1
            className={`${dm.className} text-3xl lg:text-4xl text-white font-semibold`}
          >
            Konfirmasi Pembayaran
          </h1>
          <p
            className={`${afacad.className} text-white text-lg md:text-xl mt-3 mb-8`}
          >
            Setelah melakukan pembayaran, kirim bukti transfer Anda langsung
            melalui WhatsApp untuk proses verifikasi yang lebih cepat!.
          </p>
          <Link target="_blank" href={sosmedURLs.whatsapp}>
            <ButtonPrimary
              title="Konfirmasi Pembayaran"
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
        toast.success(`Berhasil disalin.`, {
          icon: (
            <div className="p-1 rounded bg-dashboard-primary">
              <BiCheck />
            </div>
          ),
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Gagal menyalin metode pembayaran");
      });
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="200"
      className={`p-6 rounded-lg bg-white border`}
    >
      <div className="flex justify-between items-end md:items-center">
        <div className="flex md:flex-row flex-col gap-4 lg:gap-8 md:items-center">
          <div className="relative w-20 lg:w-28 aspect-video rounded-lg">
            <Image
              alt={paymentProvider}
              src={iconSrc}
              className="object-contain -ml-2 md:ml-0"
              fill
            />
          </div>
          <div>
            <h1
              className={`${afacad.className} text-dashboard-dark text-lg lg:text-xl font-bold`}
            >
              {accountName}
            </h1>
            <p
              className={`${afacad.className} text-zinc-400 text-base lg:text-lg font-semibold`}
            >
              *****{accountNumber?.slice(4)}
            </p>
          </div>
        </div>
        <ButtonSecondary
          title="Salin"
          onClick={() =>
            handleCopyPayment(parseInt(accountNumber.replaceAll("-", "")))
          }
          size="small"
          icon={<BiCopyAlt />}
        />
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
