import React, { useEffect } from "react";
import { dm } from "@/lib/fonts";
import Accordion from "./elements/accordion.button";
import Link from "next/link";
import useDashboardStore from "@/lib/dashboardStore";
import { useRouter } from "next/router";

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
      className="py-16 lg:py-24 relative select-none"
      id="section6"
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 relative ">
        <div data-aos="fade-up">
          <h1
            className={`${dm.className} text-4xl md:text-5xl lg:text-6xl font-bold`}
          >
            Pertanyaan yang
            <br /> Sering Diajukan?
          </h1>
        </div>
        <div
          className="mt-8 flex flex-col gap-4"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <Accordion
            title="Bagaimana cara memesan undangan melalui website Moment?"
            content={
              <ul className="list-disc ml-5 md:ml-6 flex flex-col gap-4">
                <li className="md:text-lg">
                  Klik tombol <span className="font-bold">Buat Undangan</span>{" "}
                  untuk melihat tema undangan terlebih dahulu{" "}
                  <Link
                    className="text-dashboard-primary underline font-medium"
                    href={"/tema"}
                  >
                    Klik Disini.
                  </Link>
                </li>
                <li className="md:text-lg">
                  Pilih tema yang sesuai dengan selera kamu.
                </li>
                <li className="md:text-lg">
                  Klik tombol <span className="font-bold">Preview</span> untuk
                  melihat preview tema secara langsung.
                </li>
                <li className="md:text-lg">
                  Klik <span className="font-bold">Pilih Tema</span> untuk
                  memilih tema undangan yang diinginkan.
                </li>
                <li className="md:text-lg">
                  Undangan yang dipilih akan masuk melalui{" "}
                  <span className="font-bold">Pesan WhatsApp</span> secara
                  otomatis.
                </li>
                <li className="md:text-lg">
                  Menunggu <span className="font-bold">Balasan</span> dari Admin
                  Moment.
                </li>
              </ul>
            }
          />
          <Accordion
            title="Bagaimana cara melakukan pembayaran dan konfirmasi pembayaran?"
            content={
              <ul className="list-disc ml-5 md:ml-6 flex flex-col gap-4">
                <li className="md:text-lg">
                  Silahkan melakukan pembayaran sesuai dengan harga dan paket
                  tema yang dipilih melalui{" "}
                  <span className="font-bold">Nomor Rekening</span> kami melalui
                  halaman{" "}
                  <Link
                    target="_blank"
                    href="/pembayaran"
                    className="text-dashboard-primary underline font-medium"
                  >
                    Pembayaran.
                  </Link>
                </li>
                <li className="md:text-lg">
                  Setelah melakukan pembayaran, silahkan mengirimkan bukti
                  pembayaran melalui{" "}
                  <span className="font-bold">Pesan WhatsApp</span> kami atau{" "}
                  <Link
                    className="text-dashboard-primary underline font-medium"
                    href="https://wa.me/+6281246768627"
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
              <ul className="list-disc ml-5 md:ml-6 flex flex-col gap-4">
                <li className="md:text-lg">
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
              <ul className="list-disc ml-5 md:ml-6 flex flex-col gap-4">
                <li className="md:text-lg">
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
              <ul className="list-disc ml-5 md:ml-6 flex flex-col gap-4">
                <li className="md:text-lg">
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
              <ul className="list-disc ml-5 md:ml-6 flex flex-col gap-4">
                <li className="md:text-lg">
                  Setelah undangan berhasil dibuat, Admin Moment akan{" "}
                  <span className="font-bold">memberikan link undangan.</span>{" "}
                </li>
                <li className="md:text-lg">
                  Cukup <span className="font-bold">copy-paste</span> undangan
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
