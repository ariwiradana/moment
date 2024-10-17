import React from "react";
import { montserrat } from "@/lib/fonts";
import AdminLayout from "@/components/admin/layouts";
import Input from "@/components/admin/elements/input";
import ButtonPrimary from "@/components/admin/elements/button.primary";
import { BiFolderPlus, BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { useAdminCreateTheme } from "@/hooks/admin/useAdminCreateTheme";
import InputSelect from "@/components/admin/elements/select";
import InputCheckbox from "@/components/admin/elements/input.checkbox";
import { isTokenExpired } from "@/lib/auth";
import { GetServerSideProps } from "next";
import Cookies from "cookies";

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
            <span className="text-sm font-medium">back</span>
          </div>
        </Link>
        <h1 className="text-2xl font-bold mb-8 mt-2">Add New Theme</h1>
        <form
          onSubmit={actions.handleSubmit}
          className="mt-8 max-w-screen-md flex flex-col gap-y-4"
        >
          <Input
            onChange={actions.handleChange}
            name="name"
            label="Theme Name"
            value={state.formData.name}
          />
          <InputSelect
            onChange={actions.handleChange}
            name="category"
            label="Theme Category"
            value={state.formData.category}
            options={state.themeCategoryOptions}
          />
          <Input
            onChange={actions.handleChange}
            name="thumbnail"
            type="File"
            label="Thumbnail"
          />
          <div>
            <p className="text-sm text-gray-700 mb-2">Packages</p>
            <div className="flex gap-x-6">
              {state.packages.length > 0 &&
                state.packages.map((pk) => (
                  <InputCheckbox
                    key={`package-${pk.id}`}
                    onChange={actions.handleChange}
                    name="package_ids"
                    label={pk.name}
                    value={pk.id}
                  />
                ))}
            </div>
          </div>
          <div className="flex justify-end mt-6 bg-gray-50 border p-4 rounded-lg">
            <ButtonPrimary
              isloading={state.loading}
              title="Add Theme"
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

  if (token) {
    const isExpired = isTokenExpired(token);
    if (isExpired) {
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
