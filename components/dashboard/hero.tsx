import React, { useCallback } from "react";
import { redhat } from "@/lib/fonts";
import useDashboardStore from "@/store/useDashboardStore";
import { BsChevronRight } from "react-icons/bs";

const HeroComponent = () => {
  const scrollTo = useCallback((section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 50 : 100;

      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const { setActiveSection } = useDashboardStore();

  return (
    <section
      id="section1"
      className="min-h-svh md:h-full md:min-h-[70vh] lg:h-dvh w-full mt-10 bg-white flex flex-col justify-center max-w-screen-xl mx-auto gap-10 px-4 md:px-12 lg:px-4"
    >
      <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-40">
        <h2
          data-aos="fade-up"
          style={{ lineHeight: "1.2" }}
          className={`font-tan-pearl uppercase text-5xl md:text-6xl lg:text-7xl font-bold text-dashboard-dark`}
        >
          Moment <br />
          Invitation
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className={`${redhat.className} text-sm text-dashboard-dark/70 max-w-lg`}
        >
          Buat momen spesial lebih berkesan dengan undangan digital yang
          minimalis, praktis, cepat, dan mudah dibagikan. Kami memastikan
          undangan dapat dikirim dalam hitungan menit, membuat acara Anda tak
          terlupakan!
        </p>
      </div>
      <div
        data-aos="zoom-out-up"
        data-aos-delay="400"
        className="w-full h-40 md:h-52 lg:h-72 bg-zinc-50 relative overflow-x-hidden"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            className="min-w-full min-h-full absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 object-cover"
            src="/video/hero5.mp4"
            autoPlay
            muted
            loop
            playsInline
          ></video>
        </div>
      </div>
      <div
        data-aos="fade-up"
        data-aos-delay="600"
        className="flex justify-end items-center gap-4 lg:gap-40"
      >
        <p className={`${redhat.className} text-sm text-dashboard-dark/70`}>
          Buat undangan digital Anda dengan cepat dan mudah.
        </p>
        <button
          onClick={() => {
            setActiveSection(`section3`);
            scrollTo(`section3`);
          }}
          className={`${redhat.className} text-xs flex items-center gap-x-2 outline-none border whitespace-nowrap border-zinc-400 rounded-full px-4 py-2`}
        >
          Lihat Undangan
          <BsChevronRight />
        </button>
      </div>
    </section>
  );
};

export default HeroComponent;
