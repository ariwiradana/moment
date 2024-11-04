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
import { sosmedURLs } from "@/constants/sosmed";

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

  const {
    setActiveSection,
    setSelectedPackageId,
    selectedPackageId,
    setManualScroll,
  } = useDashboardStore();

  const initialFilterData: PackageFilter[] = [];

  const [displayedText, setDisplayedText] = useState<string>("");
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [themeFilter, setThemeFilter] = useState<string | null>(null);
  const [filterPackageData, setFilterPackageData] =
    useState<PackageFilter[]>(initialFilterData);
  const [filterThemeData, setFilterThemeData] = useState<Filter[]>([]);
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (router && router.pathname === "/tema") setActiveSection("section3");
  }, [router, setActiveSection]);

  const { data: categories } = useSWR(`/api/_pb/_th/_c`, fetcher);
  const { data: packageCategories } = useSWR(
    themeFilter !== "Semua Undangan"
      ? `/api/_pb/_p/_c?theme_category=${encodeURIComponent(
          themeFilter as string
        )}`
      : `/api/_pb/_p/_c`,
    fetcher
  );

  useEffect(() => {
    if (packageCategories && !selectedPackageId) {
      const initialPackageId = packageCategories.data[0].id;
      setSelectedPackageId(initialPackageId);
    }
  }, [packageCategories, selectedPackageId]);

  const themeCategories: Filter[] = useMemo(() => {
    return categories?.data || [];
  }, [categories]);

  let url = `/api/_pb/_th?page=${page}&limit=${limit}&order=DESC`;

  if (selectedPackageId) {
    url += `&package_id=${selectedPackageId}`;
  }

  if (themeFilter !== "Semua Undangan") {
    url += `&category=${encodeURIComponent(themeFilter as string)}`;
  }

  const { data, isLoading } = useSWR(
    selectedPackageId ? url : undefined,
    fetcher
  );
  const { data: allThemes } = useSWR(`/api/_pb/_th?order=DESC`, fetcher);

  useEffect(() => {
    if (packageCategories && packageCategories.data.length > 0) {
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

  const [seoUrl, setSeoUrl] = useState<string>("");

  useEffect(() => {
    setSeoUrl(
      `${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ""
      }`
    );
  }, []);

  if (themes)
    return (
      <Layout>
        <Seo
          title="Koleksi Tema Kami | Moment"
          description="Buat undangan digital dengan mudah menggunakan Moment. Dapatkan undangan dengan harga yang terjangkau, cepat, responsif, dan mudah dibagikan"
          keywords="undangan digital, undangan online, undangan pernikahan, undangan metatah"
          ogImage="/images/logo-white.png"
          ogUrl={seoUrl}
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Moment Invitations",
            url: seoUrl,
            sameAs: [
              sosmedURLs.email,
              sosmedURLs.instagram,
              sosmedURLs.whatsapp,
              sosmedURLs.youtube,
            ],
          }}
          author="Moment"
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

            {filterPackageData.length > 0 && filterThemeData.length > 0 ? (
              <div
                data-aos="fade-up"
                className="flex flex-col md:flex-row justify-between gap-4 md:items-center mb-4 md:mb-8 sticky py-4 top-16 md:top-20 lg:top-24 bg-white z-20"
              >
                <div
                  className={`flex overflow-x-auto gap-1 hide-scrollbar ${afacad.className}`}
                >
                  {filterPackageData.map((fp) => {
                    return (
                      <button
                        key={`category-filter-${fp.category}`}
                        onClick={() => setSelectedPackageId(fp.id as number)}
                        className={`flex items-center gap-x-2 md:text-lg rounded-full px-5 py-3 outline-none whitespace-nowrap font-medium ${
                          selectedPackageId === fp.id
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
                        ? "max-h-screen opacity-100"
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
                        {tc.category}{" "}
                        {tc.category === themeFilter && <BiCheck />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            <div data-aos="fade-up">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {themes.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
