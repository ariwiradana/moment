import { afacad } from "@/lib/fonts";
import Image from "next/image";
import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";

const navTitles: string[] = [
  "home",
  "tema",
  "fitur",
  "harga",
  "testimoni",
  "tentang kami",
];

const Navbar = () => {
  const [activeNav, setActiveNav] = useState("home");
  return (
    <section className="border-b">
      <nav className={`${afacad.className} max-w-screen-xl mx-auto`}>
        <ul className="px-6 md:px-12 flex justify-between lg:justify-start items-center gap-8 h-16 md:h-20 lg:h-28">
          <li className="font-semibold text-dashboard-dark text-xl flex items-center gap-x-2 mr-8">
            <div className="relative w-20 md:w-24 aspect-video">
              <Image alt="logo" fill className="object-cover" src="/logo.png" />
            </div>
          </li>
          {navTitles.map((title) => (
            <li className="hidden lg:block group" key={title}>
              <button
                onClick={() => setActiveNav(title)}
                className={`text-xl cursor-pointer relative hover:text-dashboard-dark duration-500 ease-in-out capitalize ${
                  activeNav === title
                    ? "text-dashboard-dark font-semibold"
                    : "text-gray-500 font-medium"
                }`}
              >
                {title}
                <div
                  className={`absolute group-hover:opacity-100 group-hover:-bottom-2 ${
                    activeNav === title
                      ? "opacity-100 -bottom-2"
                      : "opacity-0 -bottom-1"
                  }  left-1/2 transform -translate-x-1/2 w-3 h-[3px] bg-dashboard-primary rounded-full transition-all ease-in-out duration-500 delay-150`}
                ></div>
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

export default Navbar;
