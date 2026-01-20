import React, { memo, useEffect } from "react";
import { redhat } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import { navData } from "@/constants/dashboardNavbar";
import useDashboardStore from "@/store/useDashboardStore";
import { useRouter } from "next/router";
import { HiArrowLongUp } from "react-icons/hi2";
import { sosmedURLs } from "@/constants/sosmed";
import {
  TbBrandInstagram,
  TbBrandTiktok,
  TbBrandWhatsapp,
  TbMail,
} from "react-icons/tb";

// Memoized Footer Nav Button
const FooterNavButton = memo(
  ({ title, onClick }: { title: string; onClick: () => void }) => (
    <button
      key={`footer-${title}`}
      onClick={onClick}
      className={`text-zinc-200 ${redhat.className} capitalize text-xs md:text-sm hover:text-dashboard-primary`}
    >
      {title}
    </button>
  ),
);

FooterNavButton.displayName = "FooterNavButton";

const FooterComponent = () => {
  const setActiveSection = useDashboardStore((state) => state.setActiveSection);
  const router = useRouter();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  if (router.pathname !== "/") return null;

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
                    priority
                  />
                </div>
              </Link>
              <p className={`${redhat.className} text-zinc-400 mt-4 text-base`}>
                Moment adalah penyedia undangan digital yang memudahkan Anda
                membuat undangan untuk momen spesial.
              </p>
            </div>

            <div className="flex flex-col md:items-end">
              <div className="flex flex-wrap gap-y-2 gap-x-6 mb-4">
                {navData.map(({ path, title }, index) => (
                  <FooterNavButton
                    key={`footer-${title}`}
                    title={title}
                    onClick={() => {
                      setActiveSection(`section${index + 1}`);
                      if (router.pathname !== "/") router.push(path);
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3 text-xl mt-4 text-white">
                <Link
                  rel="noopener noreferrer"
                  aria-label="Hubungi kami via WhatsApp"
                  className="h-12 w-12 aspect-square rounded-full text-lg lg:text-xl flex justify-center items-center border border-white/10"
                  target="_blank"
                  href={sosmedURLs.whatsapp}
                >
                  <TbBrandWhatsapp />
                </Link>

                <Link
                  rel="noopener noreferrer"
                  aria-label="Kunjungi Instagram Moment Invitation"
                  className="h-12 w-12 aspect-square rounded-full text-lg lg:text-xl flex justify-center items-center border border-white/10"
                  target="_blank"
                  href={sosmedURLs.instagram}
                >
                  <TbBrandInstagram />
                </Link>
                <Link
                  rel="noopener noreferrer"
                  aria-label="Kunjungi TikTok Moment Invitation"
                  className="h-12 w-12 aspect-square rounded-full text-lg lg:text-xl flex justify-center items-center border border-white/10"
                  target="_blank"
                  href={sosmedURLs.tiktok}
                >
                  <TbBrandTiktok />
                </Link>
                <Link
                  rel="noopener noreferrer"
                  aria-label="Kirim email ke Moment Invitation"
                  className="h-12 w-12 aspect-square rounded-full text-lg lg:text-xl flex justify-center items-center border border-white/10"
                  target="_blank"
                  href={sosmedURLs.email}
                >
                  <TbMail />
                </Link>
              </div>

              <div className="mt-10 md:mt-12">
                <button
                  aria-label="button-go-top"
                  onClick={() => window.scrollTo({ top: 0 })}
                  className="text-white text-xl transform transition-transform duration-300 hover:-translate-y-1"
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
        © 2025 Moment | Designed with ❤️ by Moment
      </p>
    </section>
  );
};

FooterComponent.displayName = "FooterComponent";

export default FooterComponent;
