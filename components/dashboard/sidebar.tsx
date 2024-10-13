import React, { FC, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { afacad } from "@/lib/fonts";
import useDashboardStore from "@/lib/dashboardStore";
import {
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { useRouter } from "next/router";
import { NavData } from "@/constants/dashboardNavbar";
import ButtonPrimary from "./elements/button.primary";
import toast from "react-hot-toast";
import { BiCalendarEvent, BiEdit } from "react-icons/bi";

interface Props {
  open: boolean;
  navData: NavData[];
  toggle: () => void;
}

const Sidebar: FC<Props> = ({ open, toggle, navData }) => {
  const setActiveSection = useDashboardStore((state) => state.setActiveSection);
  const { activeSection, setManualScroll } = useDashboardStore();

  const router = useRouter();

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

  return (
    <nav
      onClick={toggle}
      className={`fixed z-[999] inset-y-0 w-full bg-black bg-opacity-50 transition-all ease-in-out ${
        open
          ? "visible opacity-100 duration-300"
          : "invisible opacity-0 duration-300 delay-400"
      }`}
    >
      <ul
        onClick={(e) => e.stopPropagation()}
        className={`h-full bg-white ${
          open ? "w-[80%] delay-400" : "w-0"
        } transition-all duration-300`}
      >
        <li className="h-16 px-6 flex justify-between items-center mb-8 border-b">
          <Link href="/">
            <div className="relative w-16 md:w-20 aspect-video">
              <Image
                alt="logo"
                fill
                className="object-cover"
                src="/logo.png"
                sizes="100px"
              />
            </div>
          </Link>
        </li>
        {navData.map(({ title, path }, index) => (
          <li className="w-full" key={`sidebar-${title}`}>
            <div
              onClick={() => {
                if (router.pathname === "/") {
                  setActiveSection(`section${index + 1}`);
                  scrollTo(`section${index + 1}`);
                } else {
                  setActiveSection(`section${index + 1}`);
                  setManualScroll(false);
                  router.push(path);
                }
                toggle();
              }}
              className={`mx-6 py-3 px-4 my-2 rounded ${afacad.className} ${
                activeSection === `section${index + 1}`
                  ? "text-white bg-dashboard-dark"
                  : "text-dashboard-dark"
              }`}
            >
              <span className="capitalize text-lg">{title}</span>
            </div>
          </li>
        ))}
        <li className="px-6 py-8 border-t mt-8">
          <ButtonPrimary
            onClick={() => {
              router.push("/tema");
              toast.success("Silahkan pilih tema terlebih dahulu", {
                icon: (
                  <div className="p-1 rounded bg-dashboard-primary">
                    <BiCalendarEvent />
                  </div>
                ),
              });
            }}
            title="Buat Undangan"
            size="large"
            icon={<BiEdit />}
          />
        </li>
        <li
          className={`flex items-center gap-4 text-xl px-10 mt-8 text-dashboard-dark`}
        >
          <Link target="_blank" href="https://wa.me/+6281246768627">
            <AiOutlineWhatsApp />
          </Link>
          <Link target="_blank" href="https://instagram.com/moment">
            <AiOutlineInstagram />
          </Link>
          <Link target="_blank" href="mailto:moment.invitations@gmail.com">
            <AiOutlineMail />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
