import ButtonActionDialog from "@/components/admin/elements/button.action.dialog";
import ButtonPrimary from "@/components/admin/elements/button.primary";
import ButtonText from "@/components/admin/elements/button.text";
import Loader from "@/components/admin/elements/loader";
import AdminLayout from "@/components/admin/layouts";
import { useAdminThemes } from "@/hooks/admin/useAdminThemes";
import { isTokenExpired } from "@/lib/auth";
import { montserrat } from "@/lib/fonts";
import { Package, ThemeCategory } from "@/lib/types";
import { Pagination } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiDetail, BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import Cookies from "cookies";

interface PageProps {
  token: string | null;
}

const ReviewDashboard: React.FC<PageProps> = ({ token }) => {
  const { state, actions } = useAdminThemes(token);
  const router = useRouter();

  return (
    <AdminLayout>
      <div className={`w-full ${montserrat.className}`}>
        <h1 className="text-2xl font-bold mb-4">Theme Dashboard</h1>
        <Link href="/admin/themes/create">
          <div>
            <ButtonPrimary
              size="small"
              title="Add"
              icon={<BiPlus className="text-lg" />}
            />
          </div>
        </Link>
        {state.isLoading ? (
          <Loader />
        ) : (
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
              {state.themes.map((theme) => (
                <div key={theme.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <h1 className="text-gray-800 font-semibold text-sm">
                      {theme.name}
                    </h1>
                    <ButtonActionDialog>
                      <ButtonText
                        onClick={() => router.push(`/admin/themes/${theme.id}`)}
                        size="small"
                        title="Detail"
                        icon={<BiEdit className="text-base" />}
                      />
                      <ButtonText
                        type="button"
                        onClick={() => actions.handleDelete(theme.id as number)}
                        size="small"
                        title="Delete"
                        icon={<BiTrash className="text-base" />}
                      />
                    </ButtonActionDialog>
                  </div>
                  <div className="pt-3 flex flex-col gap-y-2">
                    <div>
                      <p className="text-gray-500 font-medium text-xs">
                        Available Categories
                      </p>
                      <div className="flex gap-2 mt-1">
                        {theme.theme_categories?.map((tc: ThemeCategory) => (
                          <p
                            key={`theme-category-${tc.id}`}
                            className={`text-admin-dark  bg-admin-dark/10 rounded-md font-semibold px-3 py-1 text-xs`}
                          >
                            {tc.name}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium text-xs">
                        Available Packages
                      </p>
                      <div className="flex gap-2 mt-1">
                        {theme.packages?.map((pk: Package) => (
                          <p
                            key={`package-${pk.id}`}
                            className={`text-admin-dark  bg-admin-dark/10 rounded-md font-semibold px-3 py-1 text-xs`}
                          >
                            {pk.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {state.toalRows > 0 && (
              <div className="border border-gray-200 rounded-xl hidden lg:block">
                <table className="table-auto overflow-x-auto w-full table">
                  <thead>
                    <tr>
                      <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100 rounded-tl-xl">
                        Name
                      </td>
                      <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                        Available Categories
                      </td>
                      <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                        Available Packages
                      </td>
                      <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100 rounded-tr-xl">
                        Actions
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {state.themes.map((theme, index) => (
                      <tr
                        key={theme.id}
                        className={`border-b ${
                          state.themes.length - 1 === index
                            ? "border-b-transparent"
                            : "border-b-gray-200"
                        }`}
                      >
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          {theme.name}
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          {theme.theme_categories &&
                          theme.theme_categories?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {theme.theme_categories?.map(
                                (tc: ThemeCategory) => (
                                  <p
                                    key={`theme-category-${tc.id}`}
                                    className={`text-admin-dark bg-admin-dark/10 rounded-lg font-semibold px-3 py-1 text-sm`}
                                  >
                                    {tc.name}
                                  </p>
                                )
                              )}
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          {theme.packages && theme.packages.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {theme.packages?.map((pk: Package) => (
                                <p
                                  key={`package-${pk.id}`}
                                  className={`text-admin-dark bg-admin-dark/10 rounded-lg font-semibold px-3 py-1 text-sm`}
                                >
                                  {pk.name}
                                </p>
                              ))}
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          <ButtonActionDialog>
                            <ButtonText
                              onClick={() =>
                                router.push(`/admin/themes/${theme.id}`)
                              }
                              size="medium"
                              title="Detail"
                              icon={<BiDetail className="text-base" />}
                            />
                            <ButtonText
                              type="button"
                              onClick={() =>
                                actions.handleDelete(theme.id as number)
                              }
                              size="medium"
                              title="Delete"
                              icon={<BiTrash className="text-base" />}
                            />
                          </ButtonActionDialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        {state.toalRows > state.limit && (
          <div className="mt-6 flex justify-center">
            <Pagination
              page={state.page}
              onChange={actions.handleChangePagination}
              count={Math.ceil(state.toalRows / state.limit)}
              shape="rounded"
            />
          </div>
        )}
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

export default ReviewDashboard;
