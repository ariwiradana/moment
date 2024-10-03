import { poppins } from "@/lib/fonts";
import React, { useState } from "react";
import { BiMenu, BiSolidCalendarEvent } from "react-icons/bi";

const navTitles: string[] = [
  "home",
  "tema",
  "fitur",
  "harga",
  "testimoni",
  "tentang kami",
];

const NavbarWhite = () => {
  const [activeNav, setActiveNav] = useState("home");
  return (
    <section className="shadow-md">
      <nav className={`${poppins.className} max-w-screen-xl mx-auto`}>
        <ul className="px-6 md:px-12 flex justify-between lg:justify-start items-center gap-8 h-16 md:h-20">
          <li className="font-semibold text-admin-hover-dark text-xl flex items-center gap-x-2 mr-8">
            <span>Meundang</span>
            <BiSolidCalendarEvent className="text-admin-primary text-2xl" />
          </li>
          {navTitles.map((title) => (
            <li className="hidden lg:block" key={title}>
              <button
                onClick={() => setActiveNav(title)}
                className={`font-semibold text-base cursor-pointer relative hover:text-admin-hover-dark duration-500 ease-in-out capitalize ${
                  activeNav === title
                    ? "text-admin-hover-dark"
                    : "text-gray-400"
                }`}
              >
                {title}
                {activeNav === title && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-[3px] bg-admin-primary rounded-full"></div>
                )}
              </button>
            </li>
          ))}
          <li className="lg:hidden">
            <div className="flex items-center">
              <button>
                <BiMenu className="text-2xl" />
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default NavbarWhite;
