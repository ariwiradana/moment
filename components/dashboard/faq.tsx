import React, { useEffect } from "react";
import { redhat } from "@/lib/fonts";
import Accordion from "./elements/accordion.button";
import Link from "next/link";
import useDashboardStore from "@/store/useDashboardStore";
import { useRouter } from "next/router";
import { sosmedURLs } from "@/constants/sosmed";

const FaqComponent = () => {
  const { setActiveSection } = useDashboardStore();

  const router = useRouter();

  useEffect(() => {
    if (router && router.pathname === "/pembayaran")
      setActiveSection("section6");
  }, [router, setActiveSection]);

  return (
    <section
      data-aos="fade-up"
      className="py-8 md:py-10 lg:py-16 relative select-none"
      id="section6"
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-12 lg:px-4 relative ">
        <div
          className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center"
          data-aos="fade-up"
        >
          <div className="flex flex-col gap-1 lg:flex-row justify-between lg:items-center w-full gap-x-8">
            <h2
              className={`${redhat.className} text-3xl lg:text-4xl whitespace-nowrap font-semibold text-dashboard-dark`}
            >
              Pertanyaan Yang <br />
              Sering Diajukan
            </h2>
            <div className="h-[1px] w-full bg-dashboard-dark/10 hidden lg:block"></div>
            <p
              className={`${redhat.className} text-sm text-dashbbg-dashboard-dark/70 md:max-w-[60vw] lg:max-w-[30vw] w-full lg:text-right`}
            >
              Pertanyaan yang sering diajukan oleh pelanggan kami
            </p>
          </div>
        </div>
        <div
          className="mt-8 flex flex-col gap-2"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <Accordion
            title="Bagaimana cara memesan undangan melalui website Moment?"
            content={
              <ul className="list-disc ml-4 text-xs md:text-sm marker:text-xs flex flex-col gap-2">
                <li>
                  Lihat <span className="font-bold">Tema Undangan</span> yang
                  tersedia terlebih dahulu.
                </li>
                <li>Pilih tema yang sesuai dengan selera kamu.</li>
                <li>
                  <span className="font-bold">Dekatkan Kursor</span> pada contoh
                  undangan atau klik tombol{" "}
                  <span className="font-bold">Live Preview</span> untuk melihat
                  preview tema undangan secara langsung.
                </li>
                <li>
                  Klik <span className="font-bold">Pesan Sekarang</span> untuk
                  memesan tema undangan yang diinginkan.
                </li>
                <li>
                  Undangan yang dipesan akan masuk melalui{" "}
                  <span className="font-bold">Pesan WhatsApp</span> secara
                  otomatis.
                </li>
                <li>
                  Menunggu <span className="font-bold">balasan</span> dari Admin
                  Moment.
                </li>
              </ul>
            }
          />
          <Accordion
            title="Bagaimana cara melakukan pembayaran dan konfirmasi pembayaran?"
            content={
              <ul className="list-disc ml-4 text-xs md:text-sm marker:text-xs flex flex-col gap-2">
                <li>
                  Silahkan melakukan pembayaran sesuai dengan harga dan paket
                  tema yang dipilih melalui{" "}
                  <span className="font-bold">Nomor Rekening</span> kami.
                </li>
                <li>
                  Setelah melakukan pembayaran, silahkan mengirimkan bukti
                  pembayaran melalui{" "}
                  <span className="font-bold">Pesan WhatsApp</span> kami atau{" "}
                  <Link
                    aria-label="WhatsApp Moment Invitation"
                    className="text-dashboard-primary underline font-medium"
                    href={sosmedURLs.whatsapp}
                    target="_blank"
                  >
                    Klik Disini.
                  </Link>
                </li>
              </ul>
            }
          />
          <Accordion
            title="Berapa lama estimasi pengerjaan undangan?"
            content={
              <ul className="list-disc ml-4 text-xs md:text-sm marker:text-xs flex flex-col gap-2">
                <li>
                  Undangan akan dibuat dengan estimasi{" "}
                  <span className="font-bold">1 - 2 jam</span> setelah melakukan
                  konfirmasi pembayaran dan mengisi data yang diperlukan.
                </li>
              </ul>
            }
          />
          <Accordion
            title="Bagaimana cara mengirim foto dan video dengan kualitas yang baik?"
            content={
              <ul className="list-disc ml-4 text-xs md:text-sm marker:text-xs flex flex-col gap-2">
                <li>
                  Pengiriman Foto dan Video dikirimkan melalui{" "}
                  <span className="font-bold">
                    Google Drive atau WhatsApp Document.
                  </span>{" "}
                </li>
              </ul>
            }
          />
          <Accordion
            title="Apakah undangan dapat direvisi?"
            content={
              <ul className="list-disc ml-4 text-xs md:text-sm marker:text-xs flex flex-col gap-2">
                <li>
                  Kami siap untuk membantu revisi undangan kamu apabila terdapat
                  kesalahan data{" "}
                  <span className="font-bold">
                    tanpa biaya tambahan apapun.
                  </span>
                </li>
              </ul>
            }
          />
          <Accordion
            title="Bagaimana cara menyebarkan undangan?"
            content={
              <ul className="list-disc ml-4 text-xs md:text-sm marker:text-xs flex flex-col gap-2">
                <li>
                  Setelah undangan berhasil dibuat, Admin Moment akan{" "}
                  <span className="font-bold">
                    memberikan link tamu undangan.
                  </span>{" "}
                </li>

                <li>
                  Cukup <span className="font-bold">tambahkan tamu</span>{" "}
                  undangan dan klik <span className="font-bold">bagikan</span>{" "}
                  kamu pada media sosial apapun dan undangan siap disebar.
                </li>
              </ul>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default FaqComponent;
