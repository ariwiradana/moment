import Layout from "@/components/dashboard/layout";
import ThemeCard from "@/components/dashboard/partials/theme.card";
import useDashboardStore from "@/lib/dashboardStore";
import { fetcher } from "@/lib/fetcher";
import { afacad, marcellus } from "@/lib/fonts";
import { Theme } from "@/lib/types";
import { createSlug } from "@/utils/createSlug";
import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import useSWR from "swr";
import AOS from "aos";
import "aos/dist/aos.css";

const DashboardThemes = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 0,
    });
  }, []);

  const { setActiveSection } = useDashboardStore();

  type Filter = {
    category: string;
    amount: number | string;
  };

  const initialFilterData: Filter[] = [];

  const [displayedText, setDisplayedText] = useState<string>("");
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [filter, setFilter] = useState<string>("Semua Undangan");
  const [filterData, setFilterData] = useState<Filter[]>(initialFilterData);

  const router = useRouter();

  useEffect(() => {
    if (router && router.pathname === "/tema") setActiveSection("section3");
  }, [router]);

  const { data: categories } = useSWR(`/api/themes/categories`, fetcher);
  const { data } = useSWR(
    filter === "Semua Undangan"
      ? `/api/themes?page=${page}&limit=${limit}`
      : `/api/themes?page=${page}&limit=${limit}&category=${filter}`,
    fetcher
  );

  useEffect(() => {
    if (categories && categories.data.length > 0) {
      const totalAmount = categories.data?.reduce(
        (sum: number, category: Filter) =>
          Number(sum) + Number(category.amount),
        0
      );
      const allCategory: Filter = {
        category: "Semua Undangan",
        amount: totalAmount,
      };
      setFilterData([allCategory, ...categories.data]);
    }
  }, [categories]);

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
              <button
                onClick={() => {
                  router.push("/");
                  setActiveSection("section1");
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
              className="bg-dashboard-dark w-full p-8 lg:p-16 rounded text-white flex flex-col items-center my-8"
            >
              <p className={`${afacad.className} text-lg md:text-xl`}>
                Koleksi Tema Undangan
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
              className={`flex overflow-x-auto gap-1 mb-8 sticky py-4 bg-white z-20 md:top-20 lg:top-24 scrollbar-hide ${afacad.className}`}
            >
              {filterData.map((f) => {
                return (
                  <button
                    key={`category-filter-${f.category}`}
                    onClick={() => setFilter(f.category)}
                    className={`flex items-center gap-x-2 text-lg rounded-full px-5 py-3 outline-none whitespace-nowrap font-medium ${
                      filter === f.category
                        ? "bg-dashboard-dark  text-white"
                        : "bg-white text-dashboard-dark"
                    } `}
                  >
                    {f.category !== "Semua Undangan"
                      ? `Undangan ${f.category}`
                      : f.category}{" "}
                    <span className="text-gray-400">{f.amount}</span>
                  </button>
                );
              })}
            </div>

            {themes.length > 0 && (
              <div
                className="grid md:grid-cols-2 lg:grid-cols-2 gap-4"
                data-aos="fade-up"
              >
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
              </div>
            )}
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
