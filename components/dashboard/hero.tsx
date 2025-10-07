import React, { useCallback } from "react";
import { redhat } from "@/lib/fonts";
import useDashboardStore from "@/store/useDashboardStore";
import { BsChevronRight } from "react-icons/bs";

const HeroComponent = () => {
  const { setActiveSection } = useDashboardStore();

  // Scroll ke section, CSS smooth scroll handle animasi
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
      className="min-h-svh md:h-full md:min-h-[70vh] lg:h-dvh 2xl:h-auto w-full mt-10 bg-white flex flex-col justify-center max-w-screen-xl mx-auto gap-10 px-4 md:px-12 lg:px-4 scroll-smooth"
    >
      {/* Hero Text */}
      <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-40 transition-opacity duration-700 ease-in-out opacity-100">
        <h2
          className="font-tan-pearl uppercase text-5xl md:text-6xl lg:text-7xl font-bold text-dashboard-dark"
          style={{ lineHeight: "1.2" }}
        >
          Moment <br /> Invitation
        </h2>
        <p
          className={`${redhat.className} text-base text-dashboard-dark/70 max-w-lg`}
        >
          Buat momen spesial lebih berkesan dengan undangan digital minimalis,
          praktis, cepat, dan mudah dibagikan.
        </p>
      </div>

      {/* Hero Video */}
      <div className="w-full h-40 md:h-52 lg:h-72 bg-zinc-50 relative overflow-hidden">
        <video
          className="min-w-full min-h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
          src="/video/hero5.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/hero-poster.jpg"
        />
      </div>

      {/* Call to Action */}
      <div className="flex justify-end items-center gap-4 lg:gap-40 transition-opacity duration-700 ease-in-out opacity-100">
        <p className={`${redhat.className} text-base text-dashboard-dark/70`}>
          Buat undangan digital Anda dengan cepat dan mudah.
        </p>
        <button
          onClick={() => {
            setActiveSection("section3");
            scrollTo("section3");
          }}
          className={`${redhat.className} text-sm flex items-center gap-x-2 outline-none border whitespace-nowrap border-zinc-400 rounded-full px-4 py-2 hover:bg-zinc-100 transition-colors duration-300`}
        >
          Lihat Undangan <BsChevronRight />
        </button>
      </div>
    </section>
  );
};

export default HeroComponent;
