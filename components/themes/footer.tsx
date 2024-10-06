import React, { FC } from "react";
import Link from "next/link";
import { BiEnvelope, BiLogoInstagram, BiLogoWhatsapp } from "react-icons/bi";
import { afacad } from "@/lib/fonts";
import Image from "next/image";

const FooterComponent: FC = () => {
  return (
    <nav
      data-aos="fade-up"
      data-aos-offset="0"
      className={`p-6 ${afacad.className} border-t`}
    >
      <ul className="flex flex-col gap-2 items-center">
        <li className="font-semibold text-dashboard-dark text-base flex items-center gap-x-1">
          <div className="relative w-16 md:w-20 aspect-video">
            <Image alt="logo" fill className="object-cover" src="/logo.png" sizes="80px" />
          </div>
        </li>
        <li
          className={`flex items-center justify-center gap-2 text-lg mt-2 text-dashboard-dark`}
        >
          <Link target="_blank" href="https://www.instagram.com/meundang">
            <BiLogoInstagram />
          </Link>
          <Link target="_blank" href="https://wa.me/+6281246768627">
            <BiLogoWhatsapp />
          </Link>
          <Link target="_blank" href="mailto:meundang@gmail.com">
            <BiEnvelope />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default FooterComponent;
