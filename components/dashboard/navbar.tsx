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
    const sectionId = `section${index + 1}`;
    const isActive = activeSection === sectionId;

    return (
      <li role="none">
        <Link
          href={`#${sectionId}`}
          scroll={false}
          onClick={(e) => {
            e.preventDefault(); // cegah default anchor jump
            onClick(); // smooth scroll custom
          }}
          aria-label={`Navigasi ke bagian ${title}`}
          aria-current={isActive ? "true" : undefined}
          className={`${redhat.className} relative text-sm uppercase cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dashboard-primary`}
        >
          {title}

          <span
            aria-hidden="true"
            className={`absolute left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-dashboard-dark transition-all duration-300 ${
              isActive ? "-bottom-2 opacity-100" : "-bottom-1 opacity-0"
            }`}
          />
        </Link>
      </li>
    );
  },
);

NavItem.displayName = "NavItem";

/* =========================
   Navbar Component
========================= */
const NavbarComponent = () => {
  const { activeSection, setActiveSection, setManualScroll } =
    useDashboardStore();
  const router = useRouter();
  const [isOnTop, setIsOnTop] = useState(true);

  /* Detect scroll position */
  useEffect(() => {
    const handleScroll = () => setIsOnTop(window.scrollY === 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Smooth scroll helper */
  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (!element) return;

    const offset = window.innerWidth < 768 ? 50 : 80;
    window.scrollTo({
      top: element.offsetTop - offset,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-30 transition-all ${
          isOnTop
            ? "border-b border-transparent"
            : "bg-white border-b border-zinc-100"
        }`}
      >
        <nav
          aria-label="Navigasi utama Moment"
          className="max-w-screen-xl mx-auto px-4 md:px-12 lg:px-4"
        >
          <div
            className={`flex items-center justify-between transition-all ${
              isOnTop ? "h-16 lg:h-20" : "h-14 lg:h-16"
            }`}
          >
            {/* ===== Brand ===== */}
            <div className="flex items-center gap-2">
              <h1 className="sr-only">Moment – Undangan Digital</h1>

              <Link href="/" aria-label="Beranda Moment">
                <Image
                  src="/favicon-180x180.png"
                  alt="Moment – Platform Undangan Digital"
                  width={24}
                  height={24}
                  priority
                />
              </Link>
            </div>

            {/* ===== Main Navigation ===== */}
            {router.pathname === "/" && (
              <ul role="list" className="hidden lg:flex items-center gap-x-8">
                {navData.map((item: NavData, index: number) => (
                  <NavItem
                    key={item.title}
                    title={item.title}
                    index={index}
                    activeSection={activeSection || ""}
                    onClick={() => {
                      setActiveSection(`section${index + 1}`);

                      if (router.pathname === "/") {
                        scrollToSection(`section${index + 1}`);
                      } else {
                        setManualScroll(false);
                        router.push(item.path);
                      }
                    }}
                  />
                ))}
              </ul>
            )}

            {/* ===== CTA ===== */}
            {router.pathname === "/" && (
              <div>
                <ButtonPrimary
                  size="small"
                  title="Pesan Sekarang"
                  aria-label="Pesan undangan digital sekarang"
                  icon={<BsChevronRight />}
                  onClick={() => {
                    setActiveSection("section3");
                    scrollToSection("section3");

                    toast.success(
                      "Silahkan pilih tema undangan terlebih dahulu!",
                      {
                        icon: (
                          <RiErrorWarningFill className="text-dashboard-primary text-lg" />
                        ),
                        className: `${redhat.className} text-sm`,
                        style: {
                          backgroundColor: "#101010",
                          color: "white",
                          borderRadius: 100,
                          boxShadow: "none",
                        },
                      },
                    );
                  }}
                />
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

NavbarComponent.displayName = "NavbarComponent";
export default NavbarComponent;
