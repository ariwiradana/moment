import Layout from "@/components/dashboard/layout";
import ThemeCard from "@/components/dashboard/partials/theme.card";
import useDashboardStore from "@/lib/dashboardStore";
import { fetcher } from "@/lib/fetcher";
import { afacad, marcellus } from "@/lib/fonts";
import { Theme } from "@/lib/types";
import { createSlug } from "@/utils/createSlug";
import { Pagination } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import useSWR from "swr";

const DashboardThemes = () => {
  const { setActiveSection } = useDashboardStore();

  const [displayedText, setDisplayedText] = useState<string>("");
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);

  const router = useRouter();

  useEffect(() => {
    if (router && router.pathname === "/tema") setActiveSection("section3");
  }, [router]);

  const { data } = useSWR(`/api/themes?page=${page}&limit=${limit}`, fetcher);

  const themes: Theme[] = data?.data || [];
  const totalRows = data?.total_rows || 0;

  const words: string[] = themes.map((t) => t.name) || [];
  const typingSpeed: number = 150;
  const delayBetweenWords: number = 1000;

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

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

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
              <p className={`${afacad.className} lg:text-xl`}>Koleksi Tema Undangan</p>
              <h1 className={`${marcellus.className} text-3xl lg:text-4xl`}>
                <span className="text-dashboard-primary">{displayedText}</span>
                <span className="animate-typing-effect text-dashboard-primary">
                  |
                </span>
              </h1>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
              {themes.map((t) => {
                const slug = createSlug(t.name);
                return (
                  <ThemeCard
                    category={t.category as string}
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
                thumbnail="https://placehold.co/720x480/png"
              />
            </div>
            {totalRows > limit && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  page={page}
                  onChange={handleChangePagination}
                  count={Math.ceil(totalRows / limit)}
                  shape="rounded"
                />
              </div>
            )}
          </div>
        </section>
      </Layout>
    );
};

export default DashboardThemes;
