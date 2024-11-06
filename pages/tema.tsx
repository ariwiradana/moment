import Layout from "@/components/dashboard/layout";
import ThemeCard from "@/components/dashboard/partials/theme.card";
import useDashboardStore from "@/lib/dashboardStore";
import { fetcher } from "@/lib/fetcher";
import { afacad, marcellus } from "@/lib/fonts";
import { Theme } from "@/lib/types";
import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import useSWR from "swr";
import AOS from "aos";
import "aos/dist/aos.css";
import { BiCheck, BiFilter } from "react-icons/bi";
import Loader from "@/components/admin/elements/loader";
import Seo from "@/components/dashboard/elements/seo";

interface Filter {
  id: number;
  category: string;
  amount: number;
}

const DashboardThemes = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 0,
    });
  }, []);

  const {
    setActiveSection,
    setManualScroll,
    selectedPackageId,
    setSelectedPackageId,
  } = useDashboardStore();

  const [displayedText, setDisplayedText] = useState<string>("");
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(8);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (router && router.pathname === "/tema") setActiveSection("section3");
  }, [router, setActiveSection]);

  // theme category filter
  const [themeCategoryFilter, setThemeCategoryFilter] = useState<number | null>(
    null
  );
  const [themeCategoryFilterName, setThemeCategoryFilterName] = useState<
    string | null
  >("Semua Undangan");
  const { data: themeCategories } = useSWR(`/api/_pb/_th/_c`, fetcher);
  useEffect(() => {
    if (themeCategories && themeCategories.data.length > 0) {
      const category = themeCategories.data.find(
        (tc: Filter) => tc.id === themeCategoryFilter
      );
      setThemeCategoryFilterName(category?.category || "Semua Undangan");
    }
  }, [themeCategoryFilter, themeCategories]);

  // package filter
  const { data: packages } = useSWR(`/api/_pb/_p/_c`, fetcher);
  useEffect(() => {
    if (!packages || packages.data.length === 0) return;

    if (!selectedPackageId) {
      const initialPackageId = packages.data[0].id;
      setSelectedPackageId(initialPackageId);
    }
  }, [packages, selectedPackageId]);

  let themeURL = `/api/_pb/_th?page=${page}&limit=${limit}&order=DESC`;
  if (selectedPackageId) {
    themeURL += `&package_id=${selectedPackageId}`;
  }
  if (themeCategoryFilter) {
    themeURL += `&theme_category_id=${themeCategoryFilter}`;
  }

  // get theme data
  const { data, isLoading } = useSWR(
    selectedPackageId ? themeURL : undefined,
    fetcher
  );

  const themes: Theme[] = data?.data || [];
  const totalRows = data?.total_rows || 0;

  const { data: allThemes } = useSWR(`/api/_pb/_th?order=DESC`, fetcher);
  const typingThemes: Theme[] = useMemo(() => {
    return allThemes?.data || [];
  }, [allThemes]);

  const words: string[] = useMemo(() => {
    return typingThemes.map((t) => t.name) || [];
  }, [typingThemes]);

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

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Layout>
      <Seo
        title="Koleksi Tema Kami | Moment"
        description="Buat undangan digital dengan mudah menggunakan Moment. Dapatkan undangan dengan harga yang terjangkau, cepat, responsif, dan mudah dibagikan"
        keywords="undangan digital, undangan online, undangan pernikahan, undangan metatah"
        image="/images/logo-bg.jpg"
      />
      <section className="md:pt-20 lg:pt-24">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 py-24">
          <div className="flex">
            <button
              onClick={() => {
                setActiveSection("section3");
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

          {/* filter package */}
          <div
            data-aos="fade-up"
            className="flex flex-col md:flex-row justify-between gap-4 md:items-center mb-4 md:mb-8 sticky py-4 top-16 md:top-20 lg:top-24 bg-white z-20"
          >
            {packages && packages.data.length > 0 ? (
              <div
                className={`flex overflow-x-auto gap-1 hide-scrollbar ${afacad.className}`}
              >
                {packages.data.map((pk: Filter) => {
                  const isSelected = pk.id === selectedPackageId;

                  return (
                    <button
                      onClick={() => {
                        setSelectedPackageId(pk.id);
                        setPage(1);
                      }}
                      key={`package-filter-${pk.category}`}
                      className={`flex items-center gap-x-2 md:text-lg rounded-full px-5 py-3 outline-none whitespace-nowrap font-medium ${
                        isSelected
                          ? "bg-dashboard-dark text-white"
                          : "bg-transparent text-dashboard-dark"
                      }`}
                      aria-pressed={isSelected}
                    >
                      {pk.category}
                    </button>
                  );
                })}
              </div>
            ) : null}

            {/* filter theme category */}
            {themeCategories && themeCategories.data.length > 0 ? (
              <div className="relative" data-aos="fade-up">
                <button
                  type="button"
                  onClick={() => setIsOpenFilter((prevState) => !prevState)}
                  className={`flex gap-x-4 justify-between items-center border px-4 py-3 rounded ${
                    afacad.className
                  } font-medium text-lg outline-none transition-colors ease-in-out duration-500 text-dashboard-dark w-full md:min-w-64 ${
                    isOpenFilter ? "border-dashboard-dark" : ""
                  }`}
                >
                  <span>{themeCategoryFilterName}</span>
                  <BiFilter
                    className={`${
                      isOpenFilter ? "rotate-180" : "rotate-0"
                    } transition-transform ease-in-out duration-500`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out bg-white absolute top-16 w-full delay-100 rounded font-medium text-lg text-dashboard-dark divide-y border shadow-md ${
                    afacad.className
                  } ${
                    isOpenFilter
                      ? "max-h-screen opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {[
                    { category: "Semua Undangan", id: null },
                    ...themeCategories.data,
                  ].map((tc: Filter) => (
                    <button
                      key={`theme-category-${tc.category}`}
                      type="button"
                      onClick={() => {
                        setThemeCategoryFilter(tc.id);
                        setIsOpenFilter(false);
                        setPage(1);
                      }}
                      className="px-4 py-3 flex justify-between items-center outline-none whitespace-nowrap w-full hover:bg-zinc-50"
                    >
                      <span className="text-dashboard-dark">{tc.category}</span>
                      {tc.id === themeCategoryFilter && <BiCheck />}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div data-aos="fade-up">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {themes.length > 0 && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {themes.map((t, i) => (
                      <ThemeCard key={t.id} theme={t} index={i} />
                    ))}
                  </div>
                )}
              </>
            )}
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
