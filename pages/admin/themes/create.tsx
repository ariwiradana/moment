import React from "react";
import { montserrat } from "@/lib/fonts";
import AdminLayout from "@/components/admin/layouts";
import Input from "@/components/admin/elements/input";
import ButtonPrimary from "@/components/admin/elements/button.primary";
import { BiFolderPlus, BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { useAdminCreateTheme } from "@/hooks/admin/useAdminCreateTheme";
import InputCheckbox from "@/components/admin/elements/input.checkbox";
import { isTokenExpired } from "@/lib/auth";
import { GetServerSideProps } from "next";
import Cookies from "cookies";
import { Package } from "@/lib/types";
import InputChip from "@/components/admin/elements/input.chip";

interface CreateThemeProps {
  token: string | null;
}

const CreateTheme: React.FC<CreateThemeProps> = ({ token }) => {
  const { state, actions } = useAdminCreateTheme(token);

  return (
    <AdminLayout>
      <div className={`${montserrat.className}`}>
        <Link href="/admin/themes">
          <div className="flex items-center gap-x-1 text-gray-400">
            <BiLeftArrowAlt className="text-base" />
            <span className="text-sm font-medium">kembali</span>
          </div>
        </Link>
        <h1 className="text-2xl font-bold mb-8 mt-2">Tambah Tema</h1>
        <form
          onSubmit={actions.handleSubmit}
          className="mt-8 max-w-screen-md flex flex-col gap-y-4"
        >
          <Input
            className="w-full"
            onChange={(e) => actions.handleChange("name", e.target.value)}
            name="name"
            label="Nama Tema"
            value={state.formData.name}
          />
          <Input
            onChange={(e) =>
              e.target.files &&
              actions.handleChange("phone_thumbnail", e.target.files[0])
            }
            name="phone_thumbnail"
            type="file"
            label="Thumbnail HP"
          />
          <div>
            <p className="text-sm text-gray-700 mb-2">Kategori Tema</p>
            <div className="flex gap-x-4">
              {state.themeCategories.length > 0 &&
                state.themeCategories.map((tc) => (
                  <InputCheckbox
                    checked={state.formData?.theme_category_ids?.includes(
                      tc.id
                    )}
                    key={`theme-category-${tc.id}`}
                    onChange={(e) =>
                      actions.handleChange("theme_category_ids", e.target.value)
                    }
                    name="theme_category_ids"
                    label={tc.name}
                    value={tc.id}
                  />
                ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-700 mb-2">Paket</p>
            <div className="flex gap-x-4">
              {state.packages.length > 0 &&
                state.packages.map((pk: Package) => (
                  <InputCheckbox
                    checked={state.formData?.package_ids?.includes(
                      pk.id as number
                    )}
                    key={`package-${pk.id}`}
                    onChange={(e) =>
                      actions.handleChange("package_ids", e.target.value)
                    }
                    name="package_ids"
                    label={pk.name}
                    value={pk.id}
                  />
                ))}
            </div>
          </div>
          <InputChip
            chips={state.formData.features as string[]}
            onChange={(value) => actions.handleChange("features", value)}
            label="Fitur Lainnya"
          />

          <div className="flex justify-end mt-6 bg-gray-50 border p-4 rounded-lg">
            <ButtonPrimary
              isloading={state.loading}
              title="Tambah Tema"
              icon={<BiFolderPlus />}
            />
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token") || null;
  const role = cookies.get("role") || null;

  if (token && role) {
    const isExpired = isTokenExpired(token);
    if (isExpired) {
      return {
        redirect: {
          destination: "/admin/login",
          permanent: false,
        },
      };
    }
    if (role !== "admin") {
      cookies.set("token", "", { maxAge: -1, path: "/" });
      cookies.set("user", "", { maxAge: -1, path: "/" });
      cookies.set("role", "", { maxAge: -1, path: "/" });
      return {
        redirect: {
          destination: "/admin/login",
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
};

export default CreateTheme;
