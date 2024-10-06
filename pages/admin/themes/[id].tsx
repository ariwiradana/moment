import React from "react";
import { GetServerSideProps } from "next";
import { montserrat } from "@/lib/fonts";
import AdminLayout from "@/components/admin/layouts";
import Input from "@/components/admin/elements/input";
import ButtonPrimary from "@/components/admin/elements/button.primary";
import { BiEdit, BiLeftArrowAlt, BiX } from "react-icons/bi";
import Link from "next/link";
import Loader from "@/components/admin/elements/loader";
import { useAdminUpdateTheme } from "@/hooks/admin/useAdminUpdateTheme";
import ImageShimmer from "@/components/image.shimmer";

interface DetailThemeProps {
  id: number;
}

const DetailTheme: React.FC<DetailThemeProps> = ({ id }) => {
  const { state, actions } = useAdminUpdateTheme(id);

  return (
    <AdminLayout>
      <div className={`${montserrat.className}`}>
        <Link href="/admin/themes">
          <div className="flex items-center gap-x-1 text-gray-400">
            <BiLeftArrowAlt className="text-base" />
            <span className="text-sm font-medium">back</span>
          </div>
        </Link>
        <h1 className="text-2xl font-bold mb-8 mt-2">Update Theme</h1>
        {state.isLoading ? (
          <div className="max-w-screen-md">
            <Loader />
          </div>
        ) : (
          <form
            className="mt-8 max-w-screen-md flex flex-col gap-y-4"
            onSubmit={actions.handleSubmit}
          >
            <Input
              disabled
              value={state.formData.name}
              onChange={(e) => actions.handleChange(e.target.value, "name")}
              label="Name"
            />
            <Input
              value={state.formData.price}
              onChange={(e) => actions.handleChange(e.target.value, "price")}
              label="Price"
            />
            <Input
              accept="image/*"
              type="file"
              multiple
              onChange={(e) =>
                actions.handleChange(e.target.files as FileList, "thumbnail")
              }
              className="w-full"
              label="Thumbnail"
            />
            {state.formData.thumbnail && (
              <div className="md:w-1/2 w-full relative">
                <div className="relative h-[30rem]">
                  <ImageShimmer
                    priority
                    alt="theme-thumbnail"
                    src={state.formData.thumbnail ?? ""}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <div className="absolute top-2 right-2 z-10">
                  <button
                    type="button"
                    onClick={() =>
                      actions.handleDeleteThumbnail(
                        state.formData.thumbnail as string,
                        state.formData.id as number
                      )
                    }
                    disabled={state.loading || state.isLoading}
                    className="w-5 h-5 rounded-full bg-gray-200 text-admin-dark flex justify-center items-center"
                  >
                    <BiX />
                  </button>
                </div>
              </div>
            )}
            <div className="flex justify-end mt-6 bg-gray-50 border p-4 rounded-lg">
              <ButtonPrimary
                isloading={state.loading || state.isLoading}
                type="submit"
                title="Update Theme"
                icon={<BiEdit />}
              />
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  return {
    props: {
      id,
    },
  };
};

export default DetailTheme;