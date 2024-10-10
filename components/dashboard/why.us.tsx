import React from "react";
import { dm, marcellus } from "@/lib/fonts";
import Image from "next/image";

const WhyUsComponent = () => {
  return (
    <section className="py-16 lg:py-24 relative bg-zinc-50" id="section2">
      <span className="absolute inset-0 bg-[url('/dashboard/card.jpg')] bg-repeat bg-cover bg-center opacity-10 grayscale"></span>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 relative lg:min-h-[60vh] z-20 flex flex-col gap-8 md:grid md:grid-cols-5 lg:gap-32">
        <div
          className="md:col-span-3 flex flex-col justify-center"
          data-aos="fade-up"
        >
          <p className={`${marcellus.className} lg:text-lg mb-1`}>
            Kenapa Memilih Kami?
          </p>
          <h1 className={`${dm.className} text-4xl lg:text-5xl font-bold`}>
            Mudah dan Praktis untuk Undangan Acara Anda
          </h1>
          <p
            className={`${marcellus.className} text-gray-600 text-sm lg:text-lg mt-2`}
          >
            Kami menawarkan solusi undangan digital yang efisien dan dapat
            disesuaikan untuk membuat undangan acara Anda menjadi lebih mudah
            dan cepat.
          </p>
        </div>
        <div
          className="w-full h-80 lg:h-full relative md:col-span-2"
          data-aos="fade-up"
        >
          <Image
            sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1600px"
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
