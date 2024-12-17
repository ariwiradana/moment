import Layout from "@/components/dashboard/layout";
import useDashboardStore from "@/lib/dashboardStore";
import { afacad, marcellus } from "@/lib/fonts";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import AOS from "aos";
import "aos/dist/aos.css";
import { Feature, featured } from "@/components/dashboard/features";
import Seo from "@/components/dashboard/elements/seo";

const DashboardFeatures = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 0,
    });
  }, []);

  const { setActiveSection, setManualScroll } = useDashboardStore();

  const [displayedText, setDisplayedText] = useState<string>("");
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (router && router.pathname === "/tema") setActiveSection("section3");
  }, [router, setActiveSection]);

  const words: string[] = useMemo(() => {
    return featured.map((f) => f.title) || [];
  }, []);

  const typingSpeed: number = 150;
  const delayBetweenWords: number = 1000;

  const handleTyping = useCallback(() => {
    const currentWord = words[wordIndex];
    const updatedText = currentWord?.substring(
      0,
      charIndex + (isDeleting ? -1 : 1)
    );

    setDisplayedText(updatedText);

    if (!isDeleting && updatedText === currentWord) {
      setTimeout(() => setIsDeleting(true), delayBetweenWords);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      setCharIndex(0);
    } else {
      setCharIndex((prevIndex) => prevIndex + (isDeleting ? -1 : 1));
    }
  }, [words, wordIndex, charIndex, isDeleting, delayBetweenWords]);

  useEffect(() => {
    const typingTimer = setTimeout(
      handleTyping,
      isDeleting ? typingSpeed / 2 : typingSpeed
    );
    return () => clearTimeout(typingTimer);
  }, [charIndex, isDeleting, wordIndex, words, handleTyping]);

  return (
    <Layout>
      <Seo
        url="https://momentinvitaions.com/fitur"
        title="Semua Fitur Kami | Moment"
        description="Semua fitur undangan digital Moment"
        keywords="momentinvitations, fitur, undangan online, undangan pernikahan, undangan metatah, momentinvitations, moment"
        image="https://res.cloudinary.com/dwitznret/image/upload/v1734241503/seo_xftrjs.webp"
      />
      <section className="md:pt-20 lg:pt-24">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 py-24">
          <div className="flex">
            <button
              onClick={() => {
                setActiveSection("section2");
                setManualScroll(false);
                router.push("/");
              }}
              className="flex gap-x-2 items-center"
            >
              <HiArrowLongLeft className="mt-1 text-xl" />
              <p
                className={`${afacad.className} text-lg whitespace-nowrap font-medium`}
              >
                Kembali
              </p>
            </button>
          </div>

          <div
            data-aos="zoom-out-up"
            className="bg-dashboard-dark w-full p-8 lg:p-16 rounded text-white flex flex-col items-center my-4 md:my-8"
          >
            <p className={`${afacad.className} text-lg md:text-xl`}>
              Fitur Undangan
            </p>
            <h1
              className={`${marcellus.className} text-2xl md:text-4xl lg:text-5xl text-center`}
            >
              <span className="text-dashboard-primary">{displayedText}</span>
              <span className="animate-typing-effect text-dashboard-primary">
                |
              </span>
            </h1>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="500"
            className="grid md:grid-cols-2 lg:grid-cols-3 mt-6 gap-4"
          >
            {featured.map((f: Feature) => (
              <div
                key={`feature-${f.title}`}
                data-aos="fade-up"
                data-aos-delay="200"
                className="p-8 bg-zinc-50 rounded flex flex-col justify-center items-center"
              >
                <div className="h-12 w-12 flex justify-center items-center bg-dashboard-primary text-3xl rounded">
                  {f.icon}
                </div>
                <h2
                  className={`${afacad.className} text-xl font-semibold text-dashboard-dark mt-4 text-center`}
                >
                  {f.title}
                </h2>
                <h2
                  className={`${afacad.className} text-dashboard-dark text-lg text-center mt-2`}
                >
                  {f.description}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DashboardFeatures;
