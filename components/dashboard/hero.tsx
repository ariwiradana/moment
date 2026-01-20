import React, { useCallback } from "react";
import { redhat } from "@/lib/fonts";
import useDashboardStore from "@/store/useDashboardStore";
import { BsChevronRight } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import ButtonSecondary from "./elements/button.secondary";
const HeroComponent = () => {
  const { setActiveSection } = useDashboardStore();

  const scrollTo = useCallback((section: string) => {
    const element = document.getElementById(section);
    if (!element) return;
    const offset = window.innerWidth < 768 ? 50 : 100;
    const top = element.offsetTop - offset;
    window.scrollTo({ top });
  }, []);

  return (
    <section
      id="section1"
      role="region"
      aria-labelledby="hero-title"
      className="w-full scroll-smooth bg-white"
    >
      <div className="pb-12 max-w-screen-xl pt-24 lg:pt-32 mx-auto flex flex-col justify-center gap-10">
        {/* Hero Text */}
        <div className="flex w-full px-4 md:px-12 lg:px-4 flex-col lg:flex-row lg:items-end gap-4 lg:gap-40 transition-opacity duration-700 ease-in-out opacity-100">
          <h1
            id="hero-title"
            className="font-tan-pearl uppercase text-5xl md:text-6xl lg:text-7xl font-bold text-dashboard-dark"
            style={{ lineHeight: "1.2" }}
          >
            Moment Invitation
            <span className="sr-only">
              - Undangan Digital Bali Minimalis & Elegan
            </span>
          </h1>
          <p
            className={`${redhat.className} text-base text-dashboard-dark/70 max-w-lg`}
          >
            Buat momen spesial lebih berkesan dengan undangan digital Bali yang
            minimalis, praktis, cepat, dan mudah dibagikan.
          </p>
        </div>

        {/* Visually Hidden SEO Text */}
        <p className="sr-only">
          Moment Invitation menyediakan layanan undangan digital Bali untuk
          pernikahan dan berbagai acara dengan desain minimalis.
        </p>

        {/* Hero Video */}
        <div className="w-full aspect-[4/2.2] lg:aspect-[4/1.15] bg-zinc-50 relative overflow-hidden">
          <video
            aria-label="Contoh undangan digital Bali dari Moment Invitation"
            className="min-w-full min-h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
            src="/video/hero5.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/video/hero-poster.jpg"
          >
            <track kind="captions" />
          </video>

          <p className="sr-only">
            Video menampilkan contoh undangan digital Bali dengan desain
            minimalis dan elegan.
          </p>

          {/* Hidden Image untuk SEO */}
          <Image
            quality={40}
            src="/video/hero-poster.jpg"
            alt="Undangan digital Bali minimalis dan elegan untuk pernikahan & mempandes"
            className="sr-only"
            height={100}
            width={100}
          />
        </div>

        {/* Call to Action */}
        <div className="flex max-w-screen-xl w-full mx-auto px-4 md:px-12 lg:px-4 flex-wrap justify-end items-center gap-4 lg:gap-40 transition-opacity duration-700 ease-in-out opacity-100">
          <p className={`${redhat.className} text-base text-dashboard-dark/70`}>
            Buat undangan digital Anda dengan cepat dan mudah.
          </p>
          <Link
            rel="nofollow"
            href="#section3"
            scroll={false}
            onClick={(e) => {
              e.preventDefault();
              setActiveSection("section3");
              scrollTo("section3");
            }}
            aria-label="Lihat katalog undangan digital"
          >
            <ButtonSecondary
              size="small"
              title="Lihat Katalog Undangan"
              icon={<BsChevronRight />}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
