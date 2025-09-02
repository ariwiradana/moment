import React from "react";
import { redhat } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import { navData } from "@/constants/dashboardNavbar";
import useDashboardStore from "@/store/useDashboardStore";
import { useRouter } from "next/router";
import { HiArrowLongUp } from "react-icons/hi2";
import { sosmedURLs } from "@/constants/sosmed";
import {
  // TbBrandInstagram,
  TbBrandWhatsapp,
  TbBrandYoutube,
  TbMail,
} from "react-icons/tb";

const FooterComponent = () => {
  const setActiveSection = useDashboardStore((state) => state.setActiveSection);

  const router = useRouter();

  if (router.pathname === "/")
    return (
      <section className="bg-dashboard-dark">
        <div className="relative pt-16 pb-8 md:py-16">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 relative">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Link href="/">
                  <div className="relative w-16 md:w-20 aspect-video -ml-[6px]">
                    <Image
                      alt="logo"
                      fill
                      className="object-cover"
                      src="/logo-white.png"
                      sizes="100px"
                    />
                  </div>
                </Link>
                <p className={`${redhat.className} text-zinc-400 mt-4 text-sm`}>
                  Moment adalah penyedia undangan digital yang memudahkan Anda
                  membuat undangan untuk momen spesial.
                </p>
              </div>
              <div className="flex flex-col md:items-end">
                <div className="flex flex-wrap gap-y-2 gap-x-6 mb-4">
                  {navData.map(({ path, title }, index) => (
                    <button
                      key={`footer-${title}`}
                      onClick={() => {
                        if (router.pathname === "/") {
                          setActiveSection(`section${index + 1}`);
                        } else {
                          setActiveSection(`section${index + 1}`);
                          router.push(path);
                        }
                      }}
                      className={`text-zinc-200 ${redhat.className} capitalize text-xs md:text-sm hover:text-dashboard-primary`}
                    >
                      {title}
                    </button>
                  ))}
                </div>
                <div
                  className={`flex items-center gap-3 text-xl mt-4 text-white`}
                >
                  <Link
                    aria-label="footer-whatsapp-link"
                    className="h-12 w-12 aspect-square rounded-full text-lg lg:text-xl flex justify-center items-center border border-white/10"
                    target="_blank"
                    href={sosmedURLs.whatsapp}
                  >
                    <TbBrandWhatsapp />
                  </Link>
                  {/* <Link
                    aria-label="footer-instagram-link"
                    className="h-12 w-12 aspect-square rounded-full text-lg lg:text-xl flex justify-center items-center border border-white/10"
                    target="_blank"
                    href={sosmedURLs.instagram}
                  >
                    <TbBrandInstagram />
                  </Link> */}
                  <Link
                    aria-label="footer-email-link"
                    className="h-12 w-12 aspect-square rounded-full text-lg lg:text-xl flex justify-center items-center border border-white/10"
                    target="_blank"
                    href={sosmedURLs.email}
                  >
                    <TbMail />
                  </Link>
                  <Link
                    aria-label="footer-youtube-link"
                    className="h-12 w-12 aspect-square rounded-full text-lg lg:text-xl flex justify-center items-center border border-white/10"
                    target="_blank"
                    href={sosmedURLs.youtube}
                  >
                    <TbBrandYoutube />
                  </Link>
                </div>
                <div className="mt-10 md:mt-12">
                  <button
                    aria-label="button-go-top"
                    onClick={() =>
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      })
                    }
                    className="text-white animate-bounce text-xl"
                  >
                    <HiArrowLongUp />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p
          className={`${redhat.className} text-zinc-400 text-center bg-dashboard-dark p-3 border-t border-t-white/10 text-xs`}
        >
          © 2024 Moment | Designed with ❤️ by Moment
        </p>
      </section>
    );
};

export default FooterComponent;
