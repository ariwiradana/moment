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
    <section className="bg-white fixed top-0 inset-x-0">
      <nav className={`${afacad.className} max-w-screen-xl mx-auto`}>
        <ul className="px-6 md:px-12 lg:px-24 flex items-center justify-between gap-8 h-16 md:h-20 lg:h-24">
          <li className="font-semibold text-dashboard-dark text-xl flex items-center gap-x-2 mr-8">
            <div className="relative w-16 md:w-20 aspect-video">
              <Image
                alt="logo"
                fill
                className="object-cover"
                src="/logo.png"
                sizes="100px"
              />
            </div>
          </li>
          <li className="flex justify-center items-center gap-x-8">
            {navTitles.map((title) => (
              <div className="hidden lg:flex group" key={title}>
                <button
                  onClick={() => setActiveNav(title)}
                  className={`text-base cursor-pointer relative text-dashboard-secondary duration-500 font-medium ease-in-out capitalize`}
                >
                  {title}
                  <div
                    className={`absolute group-hover:opacity-100 group-hover:-bottom-2 ${
                      activeNav === title
                        ? "opacity-100 -bottom-2"
                        : "opacity-0 -bottom-1"
                    }  left-1/2 transform -translate-x-1/2 w-3 h-[2px] bg-dashboard-primary rounded-full transition-all ease-in-out duration-500 delay-150`}
                  ></div>
                </button>
              </div>
            ))}
          </li>
          <li className="lg:hidden">
            <div className="flex items-center">
              <button className="text-dashboard-primary border-dashboard-primary">
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
