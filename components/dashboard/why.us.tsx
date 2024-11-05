import React from "react";
import { afacad, dm, marcellus } from "@/lib/fonts";
import Image from "next/image";
import { BiCheck } from "react-icons/bi";

const WhyUsComponent = () => {
  const featured: Record<string, string>[] = [
    {
      title: "Harga Terjangkau",
      description:
        "Harga bersaing dan beragam fitur menarik membuat undangan Anda spesial.",
    },
    {
      title: "Proses Pembuatan Cepat",
      description:
        "Dapatkan undangan online dalam 1-2 jam. Tidak perlu menunggu lama!",
    },
    {
      title: "Responsif dan User-Friendly",
      description:
        "Desain responsif di semua perangkat, mudah diakses di ponsel dan komputer.",
    },
    {
      title: "Mudah Dishare",
      description:
        "Cukup satu link untuk berbagi undangan ke teman dan keluarga.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 relative bg-zinc-50 select-none">
      <Image
        sizes="100vw"
        src="/dashboard/card.jpg"
        alt="image-why-us"
        fill
        className="object-cover w-full h-full opacity-5 lg:opacity-10 grayscale"
      />
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 relative lg:min-h-[400px] z-20 flex flex-col gap-8 md:gap-12 lg:grid lg:grid-cols-3 lg:gap-32">
        <div className="lg:col-span-2 flex flex-col justify-center">
          <div data-aos="fade-up">
            <p className={`${marcellus.className} text-lg md:text-xl mb-1`}>
              Kenapa Memilih Kami?
            </p>
            <h2
              className={`${dm.className} text-4xl md:text-5xl lg:text-6xl font-bold`}
            >
              Mudah dan Praktis untuk Undangan Acara Anda
            </h2>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="grid md:grid-cols-2 gap-x-8 gap-y-4 mt-6 md:mt-12"
          >
            {featured.map((f: Record<string, string>) => (
              <div key={f.title} className="flex gap-4">
                <div className="w-5 h-5 bg-dashboard-primary text-dashboard-dark rounded flex justify-center items-center mt-[3px] lg:mt-1">
                  <BiCheck className="text-xl" />
                </div>
                <div>
                  <h2
                    className={`${afacad.className} text-dashboard-dark text-xl md:text-2xl font-semibold`}
                  >
                    {f.title}
                  </h2>
                  <p
                    className={`${afacad.className} text-dashboard-dark text-lg mt-1`}
                  >
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="w-full h-80 lg:h-full relative md:col-span-1 hidden lg:block"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <Image
            sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1080px, 1400px"
            src="/dashboard/why-us.jpg"
            fill
            alt="image-why-us"
            className="object-cover w-full rounded grayscale-[40%]"
          />
        </div>
      </div>
    </section>
  );
};

export default WhyUsComponent;
