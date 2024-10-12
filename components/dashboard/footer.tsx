import React from "react";
import { afacad } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import { navData } from "@/constants/dashboardNavbar";
import useDashboardStore from "@/lib/dashboardStore";
import { useRouter } from "next/router";
import {
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { HiArrowLongUp } from "react-icons/hi2";

const FooterComponent = () => {
  const setActiveSection = useDashboardStore((state) => state.setActiveSection);

  const router = useRouter();

  return (
    <section className="bg-admin-hover-dark" data-aos="fade-up">
      <div className="relative pt-16 pb-8 md:py-16">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 relative">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Link href="/">
                <div className="relative w-20 md:w-24 aspect-video -ml-[6px]">
                  <Image
                    alt="logo"
                    fill
                    className="object-cover"
                    src="/logo-white.png"
                    sizes="100px"
                  />
                </div>
              </Link>
              <p
                className={`${afacad.className} text-zinc-400 mt-4 md:text-lg`}
              >
                Moment adalah penyedia undangan digital yang memudahkan Anda
                membuat undangan untuk momen spesial.
              </p>
            </div>
            <div className="flex flex-col md:items-end">
              <div className="flex gap-x-6">
                {navData.map(({ path, title }, index) => (
                  <button
                    key={`footer-${title}`}
                    onClick={() => {
                      if (router.pathname === "/") {
                        setActiveSection(`section${index + 1}`);
                      } else {
                        setActiveSection(`section${index + 1}`);
                        router.push(path);
                      }
                    }}
                    className={`text-zinc-200 ${afacad.className} capitalize md:text-lg hover:text-dashboard-primary`}
                  >
                    {title}
                  </button>
                ))}
              </div>
              <div
                className={`flex items-center gap-3 text-2xl mt-4 text-dashboard-primary`}
              >
                <Link
                  className="bg-dashboard-dark p-2 rounded"
                  target="_blank"
                  href="https://wa.me/+6281246768627"
                >
                  <AiOutlineWhatsApp />
                </Link>
                <Link
                  className="bg-dashboard-dark p-2 rounded"
                  target="_blank"
                  href="https://instagram.com/moment"
                >
                  <AiOutlineInstagram />
                </Link>
                <Link
                  className="bg-dashboard-dark p-2 rounded"
                  target="_blank"
                  href="mailto:moment.invitations@gmail.com"
                >
                  <AiOutlineMail />
                </Link>
              </div>
              <div className="mt-10 md:mt-12">
                <button
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }
                  className="text-white animate-bounce text-xl"
                >
                  <HiArrowLongUp />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p
        className={`${afacad.className} text-zinc-400 text-center bg-dashboard-dark p-2 text-xs md:text-sm`}
      >
        © 2024 Moment | Designed with ❤️ by Moment
      </p>
    </section>
  );
};

export default FooterComponent;
