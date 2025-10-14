import ButtonActionDialog from "@/components/admin/elements/button.action.dialog";
import ButtonText from "@/components/admin/elements/button.text";
import Loader from "@/components/admin/elements/loader";
import InputSelect from "@/components/admin/elements/select";
import AdminLayout from "@/components/admin/layouts";
import { isTokenExpired } from "@/lib/auth";
import { montserrat } from "@/lib/fonts";
import { getInitial } from "@/utils/getInitial";
import { getRandomColors } from "@/utils/getRandomColor";
import { Pagination } from "@mui/material";
import { GetServerSideProps } from "next";
import React from "react";
import { BiTrash } from "react-icons/bi";
import Cookies from "cookies";
import { useAdminWishes } from "@/hooks/admin/useAdminWishes";
interface WishesDashboardProps {
  token: string | null;
}

const WishesDashboard: React.FC<WishesDashboardProps> = ({ token }) => {
  const { state, actions } = useAdminWishes(token);

  return (
    <AdminLayout>
      <div className={`w-full ${montserrat.className}`}>
        <h1 className="text-2xl font-bold mb-4">Dashboard RSVP & Ucapan</h1>

        <>
          {state.isLoadingClient ? (
            <Loader />
          ) : (
            <>
              {state.clientOptions.length > 0 && (
                <div className="md:flex">
                  <InputSelect
                    onChange={(e) =>
                      actions.handleChangeClient(parseInt(e.target.value))
                    }
                    value={state.clientId ?? ""}
                    inputSize="medium"
                    label="Klien"
                    options={state.clientOptions}
                  />
                </div>
              )}
            </>
          )}

          {state.isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="mt-4 lg:mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
                  {state.wishes.map((review) => (
                    <div key={review.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <div className="flex justify-between items-center gap-x-2 w-full">
                          <div className="flex items-center gap-x-3">
                            <div
                              style={{
                                backgroundColor: getRandomColors(),
                              }}
                              className="w-8 h-8 rounded-full flex justify-center items-center font-medium text-white text-sm p-1"
                            >
                              {getInitial(review.name)}
                            </div>
                            <div>
                              <h1 className="text-gray-800 font-semibold text-sm whitespace-nowrap">
                                {review.name}
                              </h1>
                              <p className="text-gray-500 font-medium text-xs">
                                {review.attendant}
                              </p>
                            </div>
                          </div>
                          <ButtonActionDialog>
                            <ButtonText
                              type="button"
                              onClick={() => actions.handleDelete(review.id)}
                              size="small"
                              title="Hapus Ucapan"
                              icon={<BiTrash className="text-base" />}
                            />
                          </ButtonActionDialog>
                        </div>
                      </div>
                      <div className="pt-3 flex flex-col gap-y-2">
                        <div>
                          <p className="text-gray-500 font-medium text-xs">
                            Ucapan
                          </p>
                          <p className="text-gray-800 font-semibold text-sm">
                            {review.wishes}
                          </p>
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
                            User
                          </td>
                          <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                            Ucapan
                          </td>
                          <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100 rounded-tr-xl">
                            Aksi
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {state.wishes.map((review, index) => (
                          <tr
                            key={review.id}
                            className={`border-b ${
                              state.wishes.length - 1 === index
                                ? "border-b-transparent"
                                : "border-b-gray-200"
                            }`}
                          >
                            <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                              <div className="flex items-center gap-x-3">
                                <div
                                  style={{
                                    backgroundColor: getRandomColors(),
                                  }}
                                  className="h-10 w-10 rounded-full aspect-square flex justify-center items-center text-base"
                                >
                                  <span className="text-white font-medium">
                                    {getInitial(review.name)}
                                  </span>
                                </div>
                                <div>
                                  <span className="whitespace-nowrap">
                                    {review.name}
                                  </span>
                                  <p className="text-gray-500 font-medium text-xs">
                                    {review.attendant}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-4 py-3 text-gray-800 text-sm">
                              {review.wishes}
                            </td>
                            <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                              <ButtonActionDialog>
                                <ButtonText
                                  type="button"
                                  onClick={() =>
                                    actions.handleDelete(review.id)
                                  }
                                  size="medium"
                                  title="Hapus Ucapan"
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
            </>
          )}
        </>
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

export default WishesDashboard;
