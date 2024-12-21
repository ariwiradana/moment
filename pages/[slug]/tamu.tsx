import Input from "@/components/admin/elements/input";
import Loader from "@/components/admin/elements/loader";
import AddGuestItem from "@/components/dashboard/elements/add.guest.item";
import ButtonPrimary from "@/components/dashboard/elements/button.primary";
import Seo from "@/components/dashboard/elements/seo";
import Layout from "@/components/dashboard/layout";
import useDisableInspect from "@/hooks/useDisableInspect";
import { getClient } from "@/lib/client";
import { fetcher } from "@/lib/fetcher";
import { afacad, dm } from "@/lib/fonts";
import { Client } from "@/lib/types";
import useAddGuestStore from "@/store/useAddGuestStore";
import useDashboardStore from "@/store/useDashboardStore";
import { GetServerSideProps } from "next";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPlus, BiUser } from "react-icons/bi";
import useSWR from "swr";
import Cookies from "cookies";
import { isTokenExpired } from "@/lib/auth";

interface Props {
  slug: string;
  token: string | null;
}

const DashboardTamu: FC<Props> = ({ slug, token }: Props) => {
  const { data, mutate, isLoading } = useSWR(
    `/api/_pb/_c?slug=${slug}`,
    fetcher
  );
  const { form, setForm, resetForm } = useAddGuestStore();
  const { setActiveSection } = useDashboardStore();
  const client: Client | null =
    data?.data && data?.data.length > 0 ? data?.data[0] : null;

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setActiveSection("");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
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
          icon: (
            <div className="p-1 rounded bg-dashboard-primary">
              <BiUser />
            </div>
          ),
        });
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useDisableInspect();

  return (
    <Layout>
      <Seo
        url={`https://momentinvitations.com/${slug}/tamu`}
        title="Tamu Undangan | Moment"
        description="Kelola daftar tamu undangan Anda dengan mudah melalui halaman Tamu di Moment. Tambahkan nama tamu, kirimkan undangan digital, dan pastikan tidak ada tamu yang terlewat. Proses yang mudah dan praktis untuk setiap acara pernikahan dan mempandes."
        keywords={`daftar tamu undangan digital, kelola tamu undangan pernikahan, tamu undangan Bali, daftar tamu pernikahan Bali, undangan tamu pernikahan digital, kelola tamu mempandes Bali, undangan tamu mudah, tamu undangan praktis, undangan digital Bali tamu, manajemen tamu undangan digital`}
        image="https://res.cloudinary.com/dwitznret/image/upload/v1734241503/seo_xftrjs.webp"
      />

      <div className="max-w-screen-xl mx-auto pt-16 md:pt-20 lg:pt-24 px-6 md:px-12 lg:px-24">
        <div className="py-16">
          <div>
            <h1
              className={`${dm.className} text-4xl md:text-5xl lg:text-6xl font-bold`}
            >
              Tambah Tamu <br />
              Undangan
            </h1>
            <p
              className={`${afacad.className} text-gray-500 text-lg md:text-xl mt-3 lg:max-w-[70%]`}
            >
              Tambahkan tamu undangan untuk acara Anda! Isi form nama tamu di
              bawah ini untuk mengatur daftar tamu Anda. Setelah tamu
              ditambahkan, klik bagikan untuk menyebarkan undangan anda.
            </p>
            <p
              className={`${afacad.className} text-gray-500 text-lg md:text-xl mt-3 lg:max-w-[70%]`}
            ></p>
          </div>
          <div className="mt-16 max-w-screen-md flex flex-col gap-4">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {client?.guests && client.guests?.length > 0
                  ? client.guests.map((name, index) => (
                      <AddGuestItem
                        token={token}
                        client={client}
                        key={`Tamu Undangan ${name}`}
                        mutate={mutate}
                        slug={slug}
                        mode="exist"
                        value={name}
                        index={index + 1}
                      />
                    ))
                  : null}
              </>
            )}
          </div>
          <form
            className={`${
              client?.guests && client.guests?.length > 0 ? "mt-8 md:mt-12" : ""
            } pt-10 w-full flex flex-col md:flex-row gap-4 items-end max-w-screen-md`}
            onSubmit={handleSubmit}
          >
            <Input
              className="w-full"
              label="Nama Tamu"
              placeholder="Masukkan nama tamu baru"
              value={form.guest}
              onChange={(e) => setForm("guest", e.target.value)}
            />
            <ButtonPrimary
              className="w-full md:w-auto"
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
