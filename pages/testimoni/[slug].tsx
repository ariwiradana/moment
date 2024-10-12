import Input from "@/components/admin/elements/input";
import Loader from "@/components/admin/elements/loader";
import InputTextarea from "@/components/admin/elements/textarea";
import ButtonPrimary from "@/components/dashboard/elements/button.primary";
import Layout from "@/components/dashboard/layout";
import { getClient } from "@/lib/client";
import useDashboardStore from "@/lib/dashboardStore";
import { fetcher } from "@/lib/fetcher";
import { afacad, dm } from "@/lib/fonts";
import { Client } from "@/lib/types";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import useSWR from "swr";
import { z } from "zod";

interface Props {
  slug: string;
}

interface FormData {
  name: string;
  comments: string;
}

const initialFormData: FormData = {
  name: "",
  comments: "",
};

type ErrorState = Record<string, string>;
const initialErrorState: ErrorState = {};

const DashboardTestimonial: FC<Props> = (props) => {
  const { data, isLoading } = useSWR(`/api/client?slug=${props.slug}`, fetcher);
  const client: Client | null =
    data?.data && data?.data.length > 0 ? data?.data[0] : null;

  const { setActiveSection } = useDashboardStore();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorState>(initialErrorState);

  const schema = z.object({
    name: z.string().min(1, { message: "Kolom nama tidak boleh kosong" }),
    comments: z
      .string()
      .min(1, { message: "Kolom testimoni tidak boleh kosong" }),
  });

  useEffect(() => {
    if (router && router.pathname === "/testimoni/[slug]")
      setActiveSection("section5");
  }, [router, setActiveSection]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      schema.parse(formData);

      setLoading(true);

      const payload = {
        client_id: client?.id,
        name: formData.name,
        comments: formData.comments,
      };

      const createTestimonial = async () => {
        const response = await getClient("/api/testimonials", {
          method: "POST",
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.message);
        }
        return await response.json();
      };

      toast.promise(createTestimonial(), {
        loading: "Membuat testimoni...",
        success: () => {
          setFormData(initialFormData);
          setLoading(false);
          setTimeout(() => {
            router.push("/");
            setActiveSection("section1");
          }, 500);
          return "Berhasil membuat testimoni";
        },
        error: (error) => {
          setLoading(false);
          return error.message || "Gagal membuat testimoni";
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: ErrorState = {};
        error.errors.forEach((err) => {
          validationErrors[err.path.join(".")] = err.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <Layout>
      <Head>
        <title>Testimoni</title>
      </Head>

      <div className="max-w-screen-xl mx-auto pt-16 md:pt-20 lg:pt-24 px-6 lg:px-24">
        <div className="py-16">
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              {data && !client ? (
                <div>
                  <h1
                    className={`${dm.className} text-4xl md:text-5xl lg:text-6xl font-bold select-none`}
                  >
                    Klien Tidak Ditemukan
                  </h1>
                  <p
                    className={`${afacad.className} text-gray-500 text-lg md:text-xl mt-3 lg:max-w-[70%] mb-4 select-none`}
                  >
                    Oh tidak! Sepertinya kami tidak dapat menemukan data klien
                    Anda. Pastikan link undangan Anda sudah benar.
                  </p>

                  <p
                    className={`${afacad.className} text-dashboard-dark font-semibold text-lg md:text-xl underline`}
                  >
                    Contoh link: /testimoni/link-undangan
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <h1
                      className={`${dm.className} text-4xl md:text-5xl lg:text-6xl font-bold`}
                    >
                      Tulis Kesan Anda <br />
                      Memakai Jasa Kami
                    </h1>
                    <p
                      className={`${afacad.className} text-gray-500 text-lg md:text-xl mt-3 lg:max-w-[70%]`}
                    >
                      Kami ingin mendengar pengalaman Anda! Isi form di bawah
                      ini untuk berbagi pendapat dan membantu orang lain
                      menemukan layanan undangan yang sempurna.
                    </p>
                    <p
                      className={`${afacad.className} text-gray-500 text-lg md:text-xl mt-3 lg:max-w-[70%]`}
                    ></p>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="max-w-screen-md flex flex-col gap-6 mt-16"
                  >
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                      <Input
                        className="col-span-2 lg:col-span-1"
                        disabled
                        defaultValue={client?.name}
                        label="Nama Klien"
                      />
                      <Input
                        disabled
                        defaultValue={client?.theme?.category}
                        label="Kategori Undangan"
                      />
                      <Input
                        disabled
                        defaultValue={client?.theme?.name}
                        label="Tema"
                      />
                    </div>
                    <Input
                      name="name"
                      error={errors.name}
                      onChange={(e) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          name: e.target.value,
                        }))
                      }
                      value={formData.name}
                      placeholder="Masukkan nama anda"
                      label="Nama"
                    />
                    <InputTextarea
                      name="comments"
                      error={errors.comments}
                      onChange={(e) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          comments: e.target.value,
                        }))
                      }
                      value={formData.comments}
                      placeholder="Masukkan testimoni anda"
                      label="Testimoni"
                      rows={8}
                    />
                    <div>
                      <ButtonPrimary
                        isloading={loading}
                        type="submit"
                        title="Submit"
                        icon={<BiEdit />}
                      />
                    </div>
                  </form>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  return {
    props: {
      slug: slug,
    },
  };
};

export default DashboardTestimonial;
