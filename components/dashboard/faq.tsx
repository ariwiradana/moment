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
            Lihat <b>Tema Undangan Digital</b> yang tersedia.
          </li>
          <li>Pilih tema undangan digital Bali sesuai kebutuhan.</li>
          <li>
            Arahkan kursor atau klik <b>Live Preview</b> untuk melihat contoh
            undangan.
          </li>
          <li>
            Klik <b>Pesan Tema</b> untuk melanjutkan pemesanan.
          </li>
          <li>Isi form data undangan dengan lengkap.</li>
          <li>Lakukan pembayaran sesuai metode yang tersedia.</li>
          <li>Tim Moment akan mengonfirmasi dan memproses undangan Anda.</li>
        </ul>
      ),
    },
    {
      title: "Berapa lama estimasi pengerjaan undangan?",
      content: (
        <ul className="list-disc ml-4 text-sm md:text-base marker:text-xs flex flex-col gap-2">
          <li>
            Proses pembuatan undangan digital Bali membutuhkan waktu sekitar
            <b> 1–2 jam</b> setelah data lengkap dan pembayaran terkonfirmasi.
          </li>
        </ul>
      ),
    },
    {
      title:
        "Bagaimana cara mengirim foto dan video agar kualitas tetap bagus?",
      content: (
        <ul className="list-disc ml-4 text-sm md:text-base marker:text-xs flex flex-col gap-2">
          <li>
            Foto dan video dikirim melalui <b>Google Drive</b> atau layanan
            cloud sejenis agar kualitas tetap optimal.
          </li>
        </ul>
      ),
    },
    {
      title: "Apakah undangan digital bisa direvisi?",
      content: (
        <ul className="list-disc ml-4 text-sm md:text-base marker:text-xs flex flex-col gap-2">
          <li>
            Undangan digital dapat direvisi jika terdapat kesalahan data
            <b> tanpa biaya tambahan</b>.
          </li>
        </ul>
      ),
    },
    {
      title: "Bagaimana cara membagikan undangan digital ke tamu?",
      content: (
        <ul className="list-disc ml-4 text-sm md:text-base marker:text-xs flex flex-col gap-2">
          <li>
            Admin akan memberikan <b>link undangan</b>.
          </li>
          <li>
            Link dapat dibagikan melalui WhatsApp, Instagram, atau media sosial
            lainnya.
          </li>
        </ul>
      ),
    },
    {
      title: "Kenapa memilih undangan digital Bali dibanding undangan cetak?",
      content: (
        <ul className="list-disc ml-4 text-sm md:text-base marker:text-xs flex flex-col gap-2">
          <li>Lebih praktis dan mudah dibagikan.</li>
          <li>Tidak terbatas jumlah tamu.</li>
          <li>Desain modern, minimalis, dan ramah lingkungan.</li>
          <li>Bisa diakses kapan saja melalui smartphone.</li>
        </ul>
      ),
    },
    {
      title: "Apa perbedaan paket Basic dan Premium di Moment Invitation?",
      content: (
        <ul className="list-disc ml-4 text-sm md:text-base marker:text-xs flex flex-col gap-2">
          <li>Paket Basic cocok untuk kebutuhan undangan digital sederhana.</li>
          <li>Paket Premium menawarkan fitur lebih lengkap dan fleksibel.</li>
          <li>Detail fitur dapat dilihat langsung pada halaman paket.</li>
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

  const jsonLd = {
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
