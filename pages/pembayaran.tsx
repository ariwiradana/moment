import ButtonPrimary from "@/components/dashboard/elements/button.primary";
import Seo from "@/components/dashboard/elements/seo";
import Layout from "@/components/dashboard/layout";
import { paymentMethods, PaymentProvider } from "@/constants/paymentMethod";
import { sosmedURLs } from "@/constants/sosmed";
import useDashboardStore from "@/lib/dashboardStore";
import { afacad, dm } from "@/lib/fonts";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiCheck, BiCopyAlt } from "react-icons/bi";

const DashboardPayment: FC = () => {
  const { setActiveSection } = useDashboardStore();

  useEffect(() => setActiveSection("section6"), []);

  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    setUrl(
      `${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ""
      }`
    );
  }, []);

  return (
    <Layout>
      <Seo
        title="Pembayaran | Moment"
        description="Buat undangan digital dengan mudah menggunakan Moment. Dapatkan undangan dengan harga yang terjangkau, cepat, responsif, dan mudah dibagikan"
        keywords="undangan digital, undangan online, undangan pernikahan, undangan metatah"
        ogImage="/images/logo-white.png"
        ogUrl={url}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Moment Invitations",
          url,
          sameAs: [
            sosmedURLs.email,
            sosmedURLs.instagram,
            sosmedURLs.whatsapp,
            sosmedURLs.youtube,
          ],
        }}
        author="Moment"
      />

      <div className="max-w-screen-xl mx-auto pt-16 md:pt-20 lg:pt-24 px-6 lg:px-24">
        <div className="py-16">
          <div>
            <h1
              className={`${dm.className} text-4xl md:text-5xl lg:text-6xl font-bold`}
            >
              Cara Melakukan <br />
              Pembayaran
            </h1>
            <p
              className={`${afacad.className} text-gray-500 text-lg md:text-xl mt-3 lg:max-w-[70%]`}
            >
              Pembayaran dapat dilakukan melalui e-wallet atau bank transfer.
              Setelah transfer, kirimkan bukti pembayaran untuk memproses
              undangan kamu.
            </p>
            <p
              className={`${afacad.className} text-gray-500 text-lg md:text-xl mt-3 lg:max-w-[70%]`}
            ></p>
          </div>
          {paymentMethods.map((payment) => (
            <div key={payment.type} className="mt-10">
              <h1
                className={`${afacad.className} text-lg lg:text-xl font-semibold text-dashboard-dark mb-2`}
              >
                {payment.type}
              </h1>
              <div className="flex flex-col gap-4">
                {payment.paymentProvider.map((payment) => (
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
          ))}
        </div>
      </div>
    </Layout>
  );
};

const BankCard: FC<PaymentProvider> = ({
  paymentProvider,
  accountName,
  accountNumber,
  iconSrc,
}) => {
  const handleCopyPayment = (
    paymentProvider: string,
    accountNumber: number
  ) => {
    navigator.clipboard
      .writeText(accountNumber.toString())
      .then(() => {
        toast.success(
          `Metode pembayaran ${paymentProvider} berhasil disalin.`,
          {
            icon: (
              <div className="p-1 rounded bg-dashboard-primary">
                <BiCheck />
              </div>
            ),
          }
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Gagal menyalin metode pembayaran");
      });
  };

  return (
    <div className={`p-4 rounded-lg border border-zinc-100`}>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 lg:gap-8 items-center">
          <div className="relative w-28 lg:w-36 aspect-video rounded-lg">
            <Image
              alt={paymentProvider}
              src={iconSrc}
              className="object-contain p-2"
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
              className={`${afacad.className} text-zinc-500 text-base lg:text-lg font-semibold`}
            >
              *****{accountNumber?.toString().slice(5)}
            </p>
          </div>
        </div>
        <ButtonPrimary
          onClick={() => handleCopyPayment(paymentProvider, accountNumber)}
          size="small"
          icon={<BiCopyAlt />}
        />
      </div>
    </div>
  );
};

export default DashboardPayment;
