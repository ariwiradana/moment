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
import InputCheckbox from "@/components/admin/elements/input.checkbox";
import { isTokenExpired } from "@/lib/auth";
import Cookies from "cookies";
import InputSwitch from "@/components/admin/elements/input.switch";

interface DetailThemeProps {
  id: number;
  token: string | null;
}

const DetailTheme: React.FC<DetailThemeProps> = ({ id, token }) => {
  const { state, actions } = useAdminUpdateTheme(id, token);

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
              className="w-full"
              value={state.formData.name}
              onChange={(e) => actions.handleChange(e.target.value, "name")}
              label="Name"
            />
            <div>
              <p className="text-sm text-gray-700 mb-2">Theme Categories</p>
              <div className="flex gap-x-4">
                {state.themeCategories.length > 0 &&
                  state.themeCategories.map((tc) => (
                    <InputCheckbox
                      key={`theme-category-${tc.id}`}
                      checked={state.formData.theme_category_ids.includes(
                        tc.id
                      )}
                      onChange={(e) =>
                        actions.handleChange(
                          Number(e.target.value),
                          "theme_category_ids"
                        )
                      }
                      name="theme_category_ids"
                      label={tc.name}
                      value={tc.id}
                    />
                  ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-700 mb-2">Packages</p>
              <div className="flex gap-x-4">
                {state.packages.length > 0 &&
                  state.packages.map((pk) => (
                    <InputCheckbox
                      key={`package-${pk.id}`}
                      checked={state.formData.package_ids.includes(
                        pk.id as number
                      )}
                      onChange={(e) =>
                        actions.handleChange(
                          Number(e.target.value),
                          "package_ids"
                        )
                      }
                      name="package_ids"
                      label={pk.name}
                      value={pk.id}
                    />
                  ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-6">
                <Input
                  id="thumbnail"
                  accept="image/*"
                  type="file"
                  onChange={(e) =>
                    actions.handleChange(
                      e.target.files as FileList,
                      "thumbnail"
                    )
                  }
                  className="w-full"
                  label="Thumbnail"
                />
                {state.formData.thumbnail && (
                  <div className="relative">
                    <div className="relative w-full aspect-square">
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
                            state.formData.id as number,
                            "thumbnail"
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
              </div>
              <div className="flex flex-col gap-6">
                <Input
                  id="phone_thumbnail"
                  accept="image/*"
                  type="file"
                  onChange={(e) =>
                    actions.handleChange(
                      e.target.files as FileList,
                      "phone_thumbnail"
                    )
                  }
                  className="w-full"
                  label="Phone Thumbnail"
                />
                {state.formData.phone_thumbnail && (
                  <div className="relative">
                    <div className="relative w-full aspect-square">
                      <ImageShimmer
                        priority
                        alt="theme-phone-thumbnail"
                        src={state.formData.phone_thumbnail ?? ""}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                    <div className="absolute top-2 right-2 z-10">
                      <button
                        type="button"
                        onClick={() =>
                          actions.handleDeleteThumbnail(
                            state.formData.phone_thumbnail as string,
                            state.formData.id as number,
                            "phone_thumbnail"
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
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputSwitch
                onChange={() =>
                  actions.handleChange(
                    !state.formData.cover_video,
                    "cover_video"
                  )
                }
                checked={state.formData.cover_video as boolean}
                name="cover_video"
                label="Cover Video"
                description="Enable or disable the cover video"
              />

              <InputSwitch
                label="Activate theme"
                description="Enable or disable this theme."
                onChange={() =>
                  actions.handleChange(!state.formData.active, "active")
                }
                checked={state.formData.active as boolean}
                name="active"
              />
            </div>

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
      id,
      token,
    },
  };
};

export default DetailTheme;
