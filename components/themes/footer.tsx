import React, { FC } from "react";
import Link from "next/link";
import { BiEnvelope, BiLogoInstagram, BiLogoWhatsapp } from "react-icons/bi";
import { poppins } from "@/lib/fonts";
import Image from "next/image";

interface Props {
  className: string;
}

const FooterComponent: FC<Props> = ({ className = "text-gray-400" }) => {
  return (
    <nav
      data-aos="fade-up"
      data-aos-offset="0"
      className={`p-6 ${poppins.className} ${className}`}
    >
      <ul className="flex flex-col gap-2 items-center">
        <li className="font-semibold text-admin-hover-dark text-base flex items-center gap-x-1">
          <div className="relative w-24 lg:w-28 aspect-video">
            <Image alt="logo" fill className="object-cover" src="/logo.png" />
          </div>
        </li>
        <li className={`flex items-center justify-center gap-4 text-xl`}>
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
