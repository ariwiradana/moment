import Input from "@/components/admin/elements/input";
import Loader from "@/components/admin/elements/loader";
import InputTextarea from "@/components/admin/elements/textarea";
import ButtonPrimary from "@/components/dashboard/elements/button.primary";
import Seo from "@/components/dashboard/elements/seo";
import Layout from "@/components/dashboard/layout";
import { getClient } from "@/lib/client";
import useDashboardStore from "@/store/useDashboardStore";
import { fetcher } from "@/lib/fetcher";
import { afacad, dm } from "@/lib/fonts";
import { Client } from "@/lib/types";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiCheck, BiEdit } from "react-icons/bi";
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

  return (
    <Layout>
      <Seo
        url={`https://momentinvitations.com/${props.slug}`}
        title="Testimoni | Moment"
        description="Testimoni undangan digital Moment"
        keywords={`testimoni, undangan digital, undangan online, undangan pernikahan, undangan metatah, moment invitation, moment, ${props.slug}`}
        image="https://res.cloudinary.com/dwitznret/image/upload/v1734241503/seo_xftrjs.webp"
      />

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
                        defaultValue={client?.theme_category?.name}
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
