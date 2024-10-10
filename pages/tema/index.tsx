import Layout from "@/components/dashboard/layout";
import ThemeCard from "@/components/dashboard/partials/theme.card";
import useDashboardStore from "@/lib/dashboardStore";
import { fetcher } from "@/lib/fetcher";
import { afacad, marcellus } from "@/lib/fonts";
import { Theme } from "@/lib/types";
import { createSlug } from "@/utils/createSlug";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import useSWR from "swr";

const DashboardThemes = () => {
  const { data } = useSWR("/api/themes", fetcher);

  const themes: Theme[] = data?.data || [];

  const { setActiveSection } = useDashboardStore();
  const router = useRouter();

  useEffect(() => {
    if (router && router.pathname === "/tema") setActiveSection("section3");
  }, [router]);

  const words: string[] = themes.map((t) => t.name) || [];
  const typingSpeed: number = 150;
  const delayBetweenWords: number = 1000;

  const [displayedText, setDisplayedText] = useState<string>("");
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleTyping = () => {
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
  };

  useEffect(() => {
    const typingTimer = setTimeout(
      handleTyping,
      isDeleting ? typingSpeed / 2 : typingSpeed
    );
    return () => clearTimeout(typingTimer);
  }, [charIndex, isDeleting, wordIndex, words]);

  if (themes)
    return (
      <Layout>
        <section className="md:pt-20 lg:pt-24">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 py-24">
            <div className="flex">
              <Link href="/">
                <div className="flex gap-x-2 items-center">
                  <HiArrowLongLeft />
                  <p className={`${afacad.className}`}>Kembali</p>
                </div>
              </Link>
            </div>

            <div className="bg-dashboard-dark w-full p-8 lg:p-16 rounded text-white flex flex-col items-center my-8">
              <p className={`${afacad.className}`}>Koleksi Tema Undangan</p>
              <h1 className={`${marcellus.className} text-3xl lg:text-4xl`}>
                <span className="text-dashboard-primary">{displayedText}</span>
                <span className="animate-typing-effect text-dashboard-primary">
                  |
                </span>
              </h1>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {themes.map((t) => {
                const slug = createSlug(t.name);
                return (
                  <ThemeCard
                    key={slug}
                    name={t.name}
                    thumbnail={t.thumbnail as string}
                    slug={slug}
                  />
                );
              })}
              <ThemeCard
                hasPreview={false}
                name="Coming Soon"
                thumbnail="https://placehold.co/600x400/png"
              />
            </div>
          </div>
        </section>
      </Layout>
    );
};

export default DashboardThemes;
