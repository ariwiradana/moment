import Input from "@/components/admin/elements/input";
import { afacad } from "@/lib/fonts";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";
import { BiSolidLogIn } from "react-icons/bi";
import Cookies from "cookies";
import { isTokenExpired } from "@/lib/auth";
import { useClientLogin } from "@/hooks/dashboard/useClientLogin";
import Seo from "@/components/dashboard/elements/seo";
import ButtonPrimary from "@/components/dashboard/elements/button.primary";

interface SlugLoginProps {
  slug: string;
}

const SlugLogin = ({ slug }: SlugLoginProps) => {
  const { state, actions } = useClientLogin();

  return (
    <>
      <Seo
        url={`https://momentinvitation.com/${slug}/login`}
        title="Login | Moment"
        description="Masuk ke akun Anda untuk mengelola tamu undangan digital. Halaman login Moment memudahkan Anda untuk mengakses tamu undangan yang telah Anda buat."
        keywords={`login, undangan digital, undangan online, undangan pernikahan, undangan metatah, moment invitation, moment, ${slug}`}
        image="https://res.cloudinary.com/dsbmvj2s3/image/upload/v1759919489/seo_cvsy5o.webp"
      />
      <section className="min-h-dvh w-full flex justify-center items-center p-8 md:p-16 bg-white md:bg-gray-50">
        <div className="flex flex-col justify-center max-w-md w-full bg-white md:shadow-sm md:p-8">
          <div className="flex justify-center">
            <div className="relative w-20 md:w-24 aspect-video -ml-[6px]">
              <Image
                alt="logo"
                fill
                className="object-cover"
                src="/logo.png"
                sizes="100px"
              />
            </div>
          </div>
          <p
            className={`text-gray-600 text-center mt-2 mb-4 ${afacad.className}`}
          >
            Please enter your details
          </p>
          <form
            onSubmit={actions.handleSubmit}
            className="mt-8 flex flex-col gap-4"
          >
            <Input
              onChange={actions.handleChange}
              name="username"
              value={state.formData.username}
              label="Username"
              inputSize="medium"
            />
            <Input
              type="password"
              onChange={actions.handleChange}
              name="password"
              value={state.formData.password}
              label="Password"
              inputSize="medium"
            />
            <div className="mt-2">
              <ButtonPrimary
                isloading={state.isLoading}
                type="submit"
                title="Login"
                className="w-full justify-center"
                icon={<BiSolidLogIn />}
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token") || null;
  const { slug } = context.params as { slug: string };
  const { redirect } = context.query as { redirect: string };

  if (token) {
    const isExpired = isTokenExpired(token as string);
    if (!isExpired) {
      return {
        redirect: {
          destination: redirect ? `/${slug}/${redirect}` : `/${slug}`,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      slug,
    },
  };
};

export default SlugLogin;
