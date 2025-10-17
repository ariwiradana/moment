import React, { useEffect } from "react";
import { redhat } from "@/lib/fonts";
import Accordion from "./elements/accordion.button";
import useDashboardStore from "@/store/useDashboardStore";
import { useRouter } from "next/router";
import Head from "next/head";

const FaqComponent = () => {
  const { setActiveSection } = useDashboardStore();
  const router = useRouter();

  useEffect(() => {
    if (router?.pathname === "/pembayaran") setActiveSection("section6");
  }, [router, setActiveSection]);

  const faqs = [
    {
      title: "Bagaimana cara memesan undangan melalui website Moment?",
      content: (
        <ul className="list-disc ml-4 text-sm md:text-base marker:text-xs flex flex-col gap-2">
          <li>
            Lihat <span className="font-bold">Tema Undangan</span> yang tersedia
            terlebih dahulu.
          </li>
          <li>Pilih tema yang sesuai dengan selera kamu.</li>
          <li>
            <span className="font-bold">Dekatkan Kursor</span> pada contoh
            undangan atau klik tombol{" "}
            <span className="font-bold">Live Preview</span> untuk melihat
            preview tema undangan secara langsung.
          </li>
          <li>
            Klik tombol <span className="font-bold">Pesan Tema</span> untuk
            memesan tema undangan yang diinginkan.
          </li>
          <li>
            <span className="font-bold">Isi form</span> yang dibutuhkan untuk
            tema undangan yang dipilih.
          </li>
          <li>
            <span className="font-bold">Lakukan pembayaran</span> dengan metode
            pembayaran yang tersedia.
          </li>
          <li>
            Menunggu <span className="font-bold">konfirmasi</span> dari Admin
            Moment.
          </li>
        </ul>
      ),
    },
    {
      title: "Berapa lama estimasi pengerjaan undangan?",
      content: (
        <ul className="list-disc ml-4 text-sm md:text-base marker:text-xs flex flex-col gap-2">
          <li>
            Undangan akan dibuat dengan estimasi{" "}
            <span className="font-bold">1 - 2 jam</span> setelah mengisi form
            dan terkonfirmasi oleh Admin Moment.
          </li>
        </ul>
      ),
    },
    {
      title:
        "Bagaimana cara mengirim foto dan video dengan kualitas yang baik?",
      content: (
        <ul className="list-disc ml-4 text-sm md:text-base marker:text-xs flex flex-col gap-2">
          <li>
            Pengiriman Foto dan Video dikirimkan melalui{" "}
            <span className="font-bold">Google Drive dan sejenisnya.</span>.
          </li>
        </ul>
      ),
    },
    {
      title: "Apakah undangan dapat direvisi?",
      content: (
        <ul className="list-disc ml-4 text-sm md:text-base marker:text-xs flex flex-col gap-2">
          <li>
            Kami siap membantu revisi undangan apabila terdapat kesalahan data{" "}
            <span className="font-bold">tanpa biaya tambahan apapun</span>.
          </li>
        </ul>
      ),
    },
    {
      title: "Bagaimana cara menyebarkan undangan?",
      content: (
        <ul className="list-disc ml-4 text-sm md:text-base marker:text-xs flex flex-col gap-2">
          <li>
            Admin Moment akan{" "}
            <span className="font-bold">memberikan link tamu undangan</span>.
          </li>
          <li>
            Cukup <span className="font-bold">tambahkan tamu</span> undangan dan
            klik <span className="font-bold">bagikan</span> di media sosial.
          </li>
        </ul>
      ),
    },
  ];

  const extractText = (content: React.ReactNode): string => {
    const childrenArray = React.Children.toArray(content);
    return childrenArray
      .map((child) => {
        if (typeof child === "string") return child;
        if (React.isValidElement(child) && child.props.children) {
          return extractText(child.props.children);
        }
        return "";
      })
      .join(" ");
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: extractText(faq.content),
      },
    })),
  };

  return (
    <section
      className="py-8 md:py-10 lg:py-16 relative select-none bg-white"
      id="section6"
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </Head>
      <div className="max-w-screen-xl mx-auto px-4 md:px-12 lg:px-4 relative">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div className="flex flex-col gap-1 lg:flex-row justify-between lg:items-center w-full gap-x-8">
            <h2
              className={`${redhat.className} text-3xl lg:text-4xl whitespace-nowrap font-semibold text-dashboard-dark`}
            >
              Pertanyaan Yang <br /> Sering Diajukan
            </h2>
            <div className="h-[1px] w-full bg-dashboard-dark/10 hidden lg:block"></div>
            <p
              className={`${redhat.className} text-base text-dashboard-dark/70 md:max-w-[60vw] lg:max-w-[30vw] w-full lg:text-right`}
            >
              Pertanyaan yang sering diajukan oleh pelanggan kami
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2">
          {faqs.map((faq, idx) => (
            <Accordion key={idx} title={faq.title} content={faq.content} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqComponent;
