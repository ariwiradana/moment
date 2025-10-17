import { redhat } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, memo } from "react";
import useDashboardStore from "@/store/useDashboardStore";
import { useRouter } from "next/router";
import { NavData, navData } from "@/constants/dashboardNavbar";
import { BsChevronRight } from "react-icons/bs";
import toast from "react-hot-toast";
import { RiErrorWarningFill } from "react-icons/ri";
import ButtonPrimary from "./elements/button.primary";
import Head from "next/head";

const NavItem = memo(
  ({
    title,
    index,
    activeSection,
    onClick,
  }: {
    title: string;
    index: number;
    activeSection: string;
    onClick: () => void;
  }) => {
    return (
      <div className="flex group">
        <button
          type="button"
          onClick={onClick}
          className={`${redhat.className} text-sm cursor-pointer outline-none relative text-dashboard-dark duration-500 uppercase ease-in-out`}
          aria-label={`Navigasi ke bagian ${title}`}
        >
          {title}
          <div
            className={`absolute group-hover:opacity-100 group-hover:-bottom-2 ${
              activeSection === `section${index + 1}`
                ? "opacity-100 -bottom-2"
                : "opacity-0 -bottom-1"
            } left-1/2 transform -translate-x-1/2 w-[2px] h-[2px] bg-dashboard-dark rounded-full transition-all ease-in-out duration-500`}
          />
        </button>
      </div>
    );
  }
);

NavItem.displayName = "NavItem";

const NavbarComponent = () => {
  const { activeSection, setActiveSection, setManualScroll } =
    useDashboardStore();
  const router = useRouter();
  const [isOnTop, setIsOnTop] = useState(true);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsOnTop(window.scrollY === 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (!element) return;
    const offset = window.innerWidth < 768 ? 50 : 80;
    const top = element.offsetTop - offset;
    window.scrollTo({ top });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://moment.id/",
    name: "Moment",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://momentinvitation.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <header
        className={`fixed top-0 inset-x-0 z-30 border-b ${
          !isOnTop ? "bg-white border-b-zinc-100" : "border-b-transparent"
        } transition-all ease-in-out`}
      >
        <nav
          className="max-w-screen-xl mx-auto px-4 md:px-12 lg:px-4"
          aria-label="Navigasi utama Moment"
          role="navigation"
        >
          <ul
            className={`flex items-center justify-between gap-8 transition-all ease-in-out ${
              isOnTop ? "h-16 md:h-16 lg:h-20" : "h-14 md:h-20 lg:h-16"
            }`}
          >
            {/* Logo */}
            <li className="font-semibold text-dashboard-dark text-xl flex items-center gap-x-2 mr-8">
              <Link
                href="/"
                className="flex items-center"
                aria-label="Beranda Moment"
              >
                <div className="relative w-6 aspect-square">
                  <Image
                    alt="Logo Moment"
                    fill
                    className="object-contain"
                    src="/favicon-180x180.png"
                    sizes="100px"
                    priority
                  />
                </div>
              </Link>
            </li>

            {/* Menu utama */}
            {router.pathname === "/" && (
              <>
                <li
                  className={`hidden justify-center items-center gap-x-8 lg:flex`}
                >
                  {navData.map(({ title, path }: NavData, index: number) => (
                    <NavItem
                      key={title}
                      title={title}
                      index={index}
                      activeSection={activeSection || ""}
                      onClick={() => {
                        setActiveSection(`section${index + 1}`);
                        if (router.pathname === "/") {
                          scrollToSection(`section${index + 1}`);
                        } else {
                          setManualScroll(false);
                          router.push(path);
                        }
                      }}
                    />
                  ))}
                </li>

                {/* Tombol CTA */}
                <li>
                  <ButtonPrimary
                    size="small"
                    title="Pesan Sekarang"
                    icon={<BsChevronRight />}
                    onClick={() => {
                      setActiveSection(`section3`);
                      scrollToSection(`section3`);
                      toast.success(
                        "Silahkan pilih tema undangan terlebih dahulu!",
                        {
                          icon: (
                            <RiErrorWarningFill className="text-dashboard-primary text-lg" />
                          ),
                          className: `${redhat.className} text-sm border border-white/20`,
                          style: {
                            boxShadow: "none",
                            bottom: 0,
                            backgroundColor: "#101010",
                            color: "white",
                            borderRadius: 100,
                          },
                        }
                      );
                    }}
                  />
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

NavbarComponent.displayName = "NavbarComponent";

export default NavbarComponent;
