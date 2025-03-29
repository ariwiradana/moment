import Input from "@/components/admin/elements/input";
import Loader from "@/components/admin/elements/loader";
import AddGuestItem from "@/components/dashboard/elements/add.guest.item";
import Seo from "@/components/dashboard/elements/seo";
import Layout from "@/components/dashboard/layout";
import { getClient } from "@/lib/client";
import { fetcher } from "@/lib/fetcher";
import { redhat } from "@/lib/fonts";
import { Client } from "@/lib/types";
import useAddGuestStore from "@/store/useAddGuestStore";
import useDashboardStore from "@/store/useDashboardStore";
import { GetServerSideProps } from "next";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPlus, BiSearch } from "react-icons/bi";
import useSWR from "swr";
import Cookies from "cookies";
import { isTokenExpired } from "@/lib/auth";
import { useDebounce } from "use-debounce";
import { Pagination } from "@mui/material";
import useDisableInspect from "@/hooks/useDisableInspect";
import ButtonPrimary from "@/components/admin/elements/button.primary";

interface Props {
  slug: string;
  token: string | null;
}

const DashboardTamu: FC<Props> = ({ slug, token }: Props) => {
  const { form, setForm, resetForm } = useAddGuestStore();
  const { setActiveSection } = useDashboardStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [limit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [searchQuery] = useDebounce(search, 500);

  const { data: clientResult, isLoading: isLoadingClient } = useSWR(
    `/api/_pb/_c?slug=${slug}`,
    fetcher
  );

  const { data, mutate, isLoading } = useSWR(
    token
      ? `/api/_c/_g?slug=${slug}&page=${page}&limit=${limit}&search=${searchQuery}`
      : null,
    (url: string) => fetcher(url, token)
  );

  const client: Client | null =
    clientResult?.data && clientResult?.data.length > 0
      ? clientResult?.data[0]
      : null;
  const guests: string[] = data?.data || [];
  const totalRows: number = data?.totalRows || 0;

  useEffect(() => {
    setActiveSection("");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (form.guest.length > 30) {
        setError("Nama yang dimasukkan terlalu panjang");
        return;
      }
      setLoading(true);
      const payload = {
        slug,
        guest: form.guest,
      };
      const response = await getClient(
        "/api/_c/_g",
        {
          method: "POST",
          body: JSON.stringify(payload),
        },
        token
      );
      const result = await response.json();
      if (result.success) {
        resetForm();
        if (mutate) mutate();
        toast.success("Tamu berhasil ditambahkan!", {
          className: `${redhat.className} text-sm border border-white/20`,
          style: {
            boxShadow: "none",
            bottom: 0,
            backgroundColor: "#101010",
            color: "white",
            borderRadius: 100,
          },
        });
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setTimeout(() => {
      window.scrollTo({
        top: 300,
        behavior: "smooth",
      });
    }, 200);
  };

  useEffect(() => {
    if (searchQuery) {
      setPage(1);
    }
  }, [searchQuery]);

  useDisableInspect();

  return (
    <Layout>
      <Seo
        url={`https://momentinvitation.com/${slug}/tamu`}
        title="Tamu Undangan | Moment"
        description="Kelola daftar tamu undangan Anda dengan mudah melalui halaman Tamu di Moment. Tambahkan nama tamu, kirimkan undangan digital, dan pastikan tidak ada tamu yang terlewat. Proses yang mudah dan praktis untuk setiap acara pernikahan dan mempandes."
        keywords={`daftar tamu undangan digital, kelola tamu undangan pernikahan, tamu undangan Bali, daftar tamu pernikahan Bali, undangan tamu pernikahan digital, kelola tamu mempandes Bali, undangan tamu mudah, tamu undangan praktis, undangan digital Bali tamu, manajemen tamu undangan digital`}
        image="https://res.cloudinary.com/dwitznret/image/upload/v1734241503/seo_xftrjs.webp"
      />

      <div className="max-w-screen-xl mx-auto px-4 md:px-12 lg:px-4 py-8 md:py-10 lg:py-16 mt-12 md:mt-16 lg:mt-20">
        <div>
          <div>
            <h1
              className={`${redhat.className} text-2xl md:text-3xl lg:text-4xl whitespace-nowrap font-semibold text-dashboard-dark`}
            >
              Tambah Tamu <br />
              Undangan
            </h1>
            <p
              className={`${redhat.className} text-sm text-dashboard-dark/70 mt-2 lg:max-w-[70%]`}
            >
              Tambahkan tamu undangan untuk acara Anda! Isi form nama tamu di
              bawah ini untuk mengatur daftar tamu Anda. Setelah tamu
              ditambahkan, klik bagikan untuk menyebarkan undangan anda.
            </p>
          </div>
          <div className="mt-4 max-w-screen-md flex flex-col gap-4">
            <div className="md:mb-4 sticky top-12 md:top-16 lg:top-20 pt-4 pb-5 bg-gradient-to-b from-white via-white via-[95%] to-transparent z-10">
              <Input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Cari tamu undangan"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl mt-[2px]">
                <BiSearch />
              </div>
            </div>
            {isLoading || isLoadingClient ? (
              <Loader />
            ) : (
              <>
                <div className="flex flex-col divide-y divide-dashboard-dark/10 border border-dashboard-dark/10">
                  {guests?.length > 0
                    ? guests.map((name) => (
                        <AddGuestItem
                          token={token}
                          client={client}
                          key={`Tamu Undangan ${name}`}
                          mutate={mutate}
                          slug={slug}
                          mode="exist"
                          value={name}
                        />
                      ))
                    : null}
                </div>

                {totalRows > limit && (
                  <div className="mt-4 md:mt-6">
                    <Pagination
                      page={page}
                      onChange={handleChangePagination}
                      count={Math.ceil(totalRows / limit)}
                      shape="rounded"
                    />
                  </div>
                )}
              </>
            )}
          </div>
          <form
            className={`${
              client?.guests && client.guests?.length > 0 ? "mt-8 md:mt-12" : ""
            } pt-10 w-full flex flex-col gap-4 items-start max-w-screen-md`}
            onSubmit={handleSubmit}
          >
            <Input
              error={error}
              className="w-full"
              label="Nama Tamu"
              placeholder="Masukkan nama tamu baru"
              value={form.guest}
              onChange={(e) => {
                setForm("guest", e.target.value);
                setError("");
              }}
            />
            <ButtonPrimary
              className={`w-full justify-center md:w-auto ${error && "mb-6"}`}
              disabled={loading || form.guest.length < 3}
              isloading={loading}
              type="submit"
              title="Tambah Tamu"
              icon={<BiPlus />}
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token") || null;
  const role = cookies.get("role") || null;
  const user = cookies.get("user") || null;

  const { slug } = context.params as { slug: string };

  if (token) {
    const isExpired = isTokenExpired(token);
    if (isExpired) {
      return {
        redirect: {
          destination: `/${slug}/login?redirect=tamu`,
          permanent: false,
        },
      };
    }
    if (role !== "client" || user !== slug) {
      cookies.set("token", "", { maxAge: -1, path: "/" });
      cookies.set("user", "", { maxAge: -1, path: "/" });
      cookies.set("role", "", { maxAge: -1, path: "/" });
      return {
        redirect: {
          destination: `/${slug}/login?redirect=tamu`,
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: `/${slug}/login?redirect=tamu`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      slug,
      token,
    },
  };
};

export default DashboardTamu;
