import Input from "@/components/admin/elements/input";
import Loader from "@/components/admin/elements/loader";
import InputTextarea from "@/components/admin/elements/textarea";
import Seo from "@/components/dashboard/elements/seo";
import Layout from "@/components/dashboard/layout";
import { getClient } from "@/lib/client";
import useDashboardStore from "@/store/useDashboardStore";
import { fetcher } from "@/lib/fetcher";
import { redhat } from "@/lib/fonts";
import { Client } from "@/lib/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiCheck, BiPencil } from "react-icons/bi";
import useSWR from "swr";
import { z } from "zod";
import useDisableInspect from "@/hooks/useDisableInspect";
import ClientNotFound from "@/components/themes/client.notfound";
import ButtonPrimary from "@/components/dashboard/elements/button.primary";

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

const DashboardTestimoni: FC<Props> = (props) => {
  const { data, isLoading } = useSWR(`/api/_pb/_c?slug=${props.slug}`, fetcher);
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
    setActiveSection("section5");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      schema.parse(formData);
      toast.loading("Membuat testimoni...");
      setLoading(true);

      const payload = {
        client_id: client?.id,
        name: formData.name,
        comments: formData.comments,
      };

      const response = await getClient("/api/_pb/_ts", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        toast.error("Gagal membuat testimoni");
        throw new Error("Gagal membuat testimoni");
      }

      const result = await response.json();

      if (result.success) {
        setFormData(initialFormData);
        setLoading(false);

        toast.success(
          "Berhasil membuat testimoni. Terima kasih atas dukungan dan kepercayaan Anda!",
          {
            icon: (
              <div className="p-1 rounded bg-dashboard-primary">
                <BiCheck />
              </div>
            ),
          }
        );
        setActiveSection("section1");
        router.push("/");
      }
      toast.dismiss();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: ErrorState = {};
        error.errors.forEach((err) => {
          validationErrors[err.path.join(".")] = err.message;
        });
        setErrors(validationErrors);
      } else {
        toast.error("Gagal membuat testimoni");
      }
      toast.dismiss();
    }
  };

  useDisableInspect();

  return (
    <>
      <Seo
        url={`https://momentinvitation.com/${props.slug}/testimoni`}
        title="Testimoni | Moment"
        description="Bagikan pengalaman Anda menggunakan layanan undangan digital Moment dengan mengisi form testimoni kami. Ceritakan bagaimana Moment membantu membuat acara Anda lebih istimewa dengan undangan digital yang elegan dan mudah digunakan."
        keywords={`form testimoni undangan digital, testimoni undangan pernikahan Bali, testimoni undangan mempandes Bali, pengalaman menggunakan Moment, kirim testimoni undangan Bali, testimoni layanan undangan, testimoni klien Moment, feedback undangan digital Bali, ulasan undangan pernikahan, kirim pengalaman undangan digital`}
        image="https://res.cloudinary.com/dwitznret/image/upload/v1734241503/seo_xftrjs.webp"
      />
      {isLoading ? (
        <div className="w-full h-dvh flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          {!client || client?.status !== "completed" || client?.is_preview ? (
            <ClientNotFound />
          ) : (
            <Layout>
              <div className="max-w-screen-xl mx-auto px-4 md:px-12 lg:px-4 py-8 md:py-10 lg:py-16 mt-12 md:mt-16 lg:mt-20">
                <div>
                  <div>
                    <h1
                      className={`${redhat.className} text-2xl md:text-3xl lg:text-4xl whitespace-nowrap font-semibold text-dashboard-dark`}
                    >
                      Tulis Kesan Anda <br />
                      Memakai Jasa Kami
                    </h1>

                    <p
                      className={`${redhat.className} text-sm text-dashboard-dark/70 mt-2 lg:max-w-[70%]`}
                    >
                      Kami ingin mendengar pengalaman Anda! Isi form di bawah
                      ini untuk berbagi pendapat dan membantu orang lain
                      menemukan layanan undangan yang sempurna.
                    </p>
                  </div>
                  <form
                    onSubmit={handleSubmit}
                    className="max-w-screen-md flex flex-col gap-6 mt-8"
                  >
                    <Input
                      inputSize="medium"
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
                        className="w-full justify-center md:w-auto"
                        isloading={loading}
                        type="submit"
                        title="Berikan Testimoni"
                        icon={<BiPencil />}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </Layout>
          )}
        </>
      )}
    </>
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

export default DashboardTestimoni;
