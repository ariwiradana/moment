import Layout from "@/components/dashboard/layout";
import ThemeCard from "@/components/dashboard/partials/theme.card";
import useDashboardStore from "@/lib/dashboardStore";
import { fetcher } from "@/lib/fetcher";
import { afacad, marcellus } from "@/lib/fonts";
import { Theme } from "@/lib/types";
import { createSlug } from "@/utils/createSlug";
import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import useSWR from "swr";
import AOS from "aos";
import "aos/dist/aos.css";
import { BiCheck, BiFilter } from "react-icons/bi";

interface Filter {
  category: string;
  amount: number;
}

interface PackageFilter {
  category: string;
  amount: number | string;
  id: number | null;
}

const DashboardThemes = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 0,
    });
  }, []);

  const { setActiveSection } = useDashboardStore();

  const initialFilterData: PackageFilter[] = [];

  const [displayedText, setDisplayedText] = useState<string>("");
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [packageFilter, setPackageFilter] = useState<number | null>(null);
  const [themeFilter, setThemeFilter] = useState<string | null>(null);
  const [filterPackageData, setFilterPackageData] =
    useState<PackageFilter[]>(initialFilterData);
  const [filterThemeData, setFilterThemeData] = useState<Filter[]>([]);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (router && router.pathname === "/tema") setActiveSection("section3");
  }, [router, setActiveSection]);

  const { data: categories } = useSWR(`/api/themes/categories`, fetcher);
  const { data: packageCategories } = useSWR(
    `/api/packages/categories`,
    fetcher
  );

  const themeCategories: Filter[] = useMemo(() => {
    return categories?.data || [];
  }, [categories]);

  let url = `/api/themes?page=${page}&limit=${limit}`;

  if (packageFilter) {
    url += `&package_id=${packageFilter}`;
  }

  if (themeFilter !== "Semua Undangan") {
    url += `&category=${encodeURIComponent(themeFilter as string)}`;
  }

  const { data } = useSWR(packageFilter ? url : undefined, fetcher);
  const { data: allThemes } = useSWR(`/api/themes`, fetcher);

  useEffect(() => {
    if (packageCategories && packageCategories.data.length > 0) {
      setPackageFilter(packageCategories.data[0].id);
      setFilterPackageData(packageCategories.data);
    }
  }, [packageCategories]);

  useEffect(() => {
    if (themeCategories && themeCategories.length > 0) {
      const allFilter: Filter = {
        category: "Semua Undangan",
        amount: 10,
      };
      setThemeFilter("Semua Undangan");
      setFilterThemeData([allFilter, ...themeCategories]);
    }
  }, [themeCategories]);

  const themes: Theme[] = data?.data || [];
  const totalRows = data?.total_rows || 0;

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

            <div
              data-aos="fade-up"
              className="flex flex-col md:flex-row justify-between gap-4 md:items-center mb-4 md:mb-8 sticky py-4 top-16 md:top-20 lg:top-24 bg-white z-20"
            >
              {filterPackageData.length > 0 && (
                <div
                  className={`flex overflow-x-auto gap-1 hide-scrollbar ${afacad.className}`}
                >
                  {filterPackageData.map((fp) => {
                    return (
                      <button
                        key={`category-filter-${fp.category}`}
                        onClick={() => setPackageFilter(fp.id)}
                        className={`flex items-center gap-x-2 md:text-lg rounded-full px-5 py-3 outline-none whitespace-nowrap font-medium ${
                          packageFilter === fp.id
                            ? "bg-dashboard-dark  text-white"
                            : "bg-white text-dashboard-dark"
                        } `}
                      >
                        {fp.category}
                        <span className="text-gray-400">{fp.amount}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsOpenFilter((prevState) => !prevState)}
                  className={`flex gap-x-4 justify-between items-center border px-4 py-3 rounded ${
                    afacad.className
                  } font-medium text-lg outline-none transition-colors ease-in-out duration-500 text-dashboard-dark w-full md:min-w-64 ${
                    isOpenFilter ? "border-dashboard-dark" : ""
                  }`}
                >
                  <span>{themeFilter}</span>
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
                      ? "max-h-[200px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {filterThemeData.map((tc) => (
                    <button
                      key={`theme-category-${tc.category}`}
                      type="button"
                      onClick={() => {
                        setThemeFilter(tc.category);
                        setIsOpenFilter(false);
                      }}
                      className="px-4 py-3 flex justify-between items-center outline-none whitespace-nowrap w-full hover:bg-zinc-50"
                    >
                      {tc.category} {tc.category === themeFilter && <BiCheck />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {themes.length > 0 && (
              <div
                className="grid md:grid-cols-2 lg:grid-cols-2 gap-4"
                data-aos="fade-up"
              >
                {themes.map((t) => {
                  const slug = createSlug(t.name);
                  if (slug) {
                    return (
                      <ThemeCard
                        category={t.category as string}
                        key={slug}
                        name={t.name}
                        thumbnail={t.thumbnail as string}
                        slug={slug}
                        availablePackages={t.packages}
                      />
                    );
                  }
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
