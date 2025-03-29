import { redhat } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import useDashboardStore from "@/store/useDashboardStore";
import { useRouter } from "next/router";
import { NavData, navData } from "@/constants/dashboardNavbar";
import { BsChevronRight } from "react-icons/bs";
import toast from "react-hot-toast";
import { RiErrorWarningFill } from "react-icons/ri";

const NavbarComponent = () => {
  const { activeSection, setActiveSection, setManualScroll } =
    useDashboardStore();

  const router = useRouter();
  const [isOnTop, setIsOnTop] = useState<boolean>(true);

  const scrollTo = useCallback((section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 50 : 80;

      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsOnTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section
        className={`fixed top-0 inset-x-0 z-30 border-b ${
          !isOnTop ? "bg-white border-b-zinc-100" : "border-b-transparent"
        } transition-all ease-in-out duration-500`}
      >
        <nav className={`max-w-screen-xl mx-auto px-4 md:px-12 lg:px-4`}>
          <ul
            className={`flex items-center justify-between gap-8 transition-all ease-in-out duration-500 ${
              isOnTop ? "h-16 md:h-20 lg:h-24" : "h-12 md:h-16 lg:h-20"
            }`}
          >
            <li className="font-semibold text-dashboard-dark text-xl flex items-center gap-x-2 mr-8">
              <Link href="/" className="flex items-center">
                <div className="relative w-5 md:w-6 aspect-square">
                  <Image
                    alt="logo"
                    fill
                    className="object-contain"
                    src="/favicon-180x180.png"
                    sizes="100px"
                  />
                </div>
                <div className="relative w-5 md:w-6 aspect-square">
                  <Image
                    alt="logo"
                    fill
                    className="object-contain"
                    src="/favicon-180x180.png"
                    sizes="100px"
                  />
                </div>
                <div className="relative w-5 md:w-6 aspect-square">
                  <Image
                    alt="logo"
                    fill
                    className="object-contain"
                    src="/favicon-180x180.png"
                    sizes="100px"
                  />
                </div>
              </Link>
            </li>

            {router.pathname === "/" && (
              <>
                <li className="hidden lg:flex justify-center items-center gap-x-8">
                  {navData.map(({ title, path }: NavData, index: number) => (
                    <div className="flex group" key={title}>
                      <button
                        onClick={() => {
                          if (router.pathname === "/") {
                            setActiveSection(`section${index + 1}`);
                            scrollTo(`section${index + 1}`);
                          } else {
                            setActiveSection(`section${index + 1}`);
                            setManualScroll(false);
                            router.push(path);
                          }
                        }}
                        className={`${redhat.className} text-xs cursor-pointer outline-none relative text-dashboard-dark duration-500 uppercase ease-in-out`}
                      >
                        {title}
                        <div
                          className={`absolute group-hover:opacity-100 group-hover:-bottom-2 ${
                            activeSection === `section${index + 1}`
                              ? "opacity-100 -bottom-2"
                              : "opacity-0 -bottom-1"
                          }  left-1/2 transform -translate-x-1/2 w-[2px] h-[2px] bg-dashboard-dark rounded-full transition-all ease-in-out duration-500`}
                        ></div>
                      </button>
                    </div>
                  ))}
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveSection(`section3`);
                      scrollTo(`section3`);
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
                    className={`${redhat.className} text-xs flex items-center gap-x-2 outline-none whitespace-nowrap bg-dashboard-primary rounded-full px-4 py-2`}
                  >
                    Buat Sekarang
                    <BsChevronRight />
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </section>
    </>
  );
};

export default NavbarComponent;
