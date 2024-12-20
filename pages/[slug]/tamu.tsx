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

interface Props {
  slug: string;
}

const DashboardTamu: FC<Props> = ({ slug }: Props) => {
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
      const response = await getClient("/api/_pb/_c/_g", {
        method: "POST",
        body: JSON.stringify(payload),
      });
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
        description="Testimoni undangan digital Moment"
        keywords={`testimoni, undangan digital, undangan online, undangan pernikahan, undangan metatah, moment invitation, moment, ${slug}`}
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
              bawah ini untuk mengatur daftar tamu Anda. Klik bagikan untuk
              menyebarkan undangan anda.
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
  const { slug } = context.params as { slug: string };

  return {
    props: {
      slug,
    },
  };
};

export default DashboardTamu;
