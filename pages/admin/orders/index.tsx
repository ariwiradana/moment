import ButtonActionDialog from "@/components/admin/elements/button.action.dialog";
import ButtonText from "@/components/admin/elements/button.text";
import Loader from "@/components/admin/elements/loader";
import AdminLayout from "@/components/admin/layouts";
import { isTokenExpired } from "@/lib/auth";
import { montserrat } from "@/lib/fonts";
import { Pagination } from "@mui/material";
import { GetServerSideProps } from "next";
import React from "react";
import { BiReceipt, BiTrash, BiUser } from "react-icons/bi";
import Cookies from "cookies";
import moment from "moment";
import { useAdminOrders } from "@/hooks/admin/useAdminOrders";
import { formatToRupiah } from "@/utils/formatToRupiah";
import Link from "next/link";
import InputSelect from "@/components/admin/elements/select";
import { clientStatus } from "@/constants/status";
import { Status } from "@/lib/types";

interface Props {
  token: string | null;
}

const AdminOrders: React.FC<Props> = ({ token }) => {
  const { state, actions } = useAdminOrders(token);

  return (
    <AdminLayout>
      <div className={`w-full ${montserrat.className}`}>
        <h1 className="text-2xl font-bold mb-4">Dashboard Pesanan</h1>

        {state.isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="mt-4 lg:mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
                {state.orders.map((order) => {
                  const oneMonthAgo = new Date();
                  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

                  const isExpired =
                    !order.client ||
                    new Date(order.updated_at as string) < oneMonthAgo;

                  return (
                    <div key={order.id} className={`border rounded-lg p-3`}>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <div className="flex justify-between items-center gap-x-2 w-full">
                          <div className="flex items-center gap-x-2">
                            <div>
                              <h1 className="text-gray-800 font-semibold text-sm">
                                {order.name}
                              </h1>
                              <p className="text-gray-500 font-medium text-xs">
                                {order.order_id}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-x-2">
                            <div className="flex">
                              {!isExpired ? (
                                <InputSelect
                                  inputSize="extrasmall"
                                  options={clientStatus}
                                  value={order.client?.status as Status}
                                  onChange={(e) =>
                                    actions.handleSetStatus(
                                      order.client?.id as number,
                                      e.target.value
                                    )
                                  }
                                />
                              ) : (
                                "-"
                              )}
                            </div>
                            <ButtonActionDialog>
                              <Link href={`/admin/orders/${order.order_id}`}>
                                <ButtonText
                                  type="button"
                                  size="small"
                                  title="Lihat Pesanan"
                                  icon={<BiReceipt className="text-base" />}
                                />
                              </Link>
                              <Link
                                href={`/admin/clients/${order.client?.slug}`}
                              >
                                <ButtonText
                                  type="button"
                                  size="small"
                                  title="Lihat Klien"
                                  icon={<BiUser className="text-base" />}
                                />
                              </Link>
                              <ButtonText
                                type="button"
                                onClick={() =>
                                  actions.handleDelete(order.id as number)
                                }
                                size="small"
                                title="Hapus"
                                icon={<BiTrash className="text-base" />}
                              />
                            </ButtonActionDialog>
                          </div>
                        </div>
                      </div>
                      <div className="pt-3 flex flex-col gap-y-2 w-full">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-gray-500 font-medium text-xs">
                              Status
                            </p>
                            <p className="text-gray-800 font-semibold text-sm capitalize">
                              {order.client?.status}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-medium text-xs">
                              Telepon
                            </p>
                            <p className="text-gray-800 font-semibold text-sm capitalize">
                              {order.phone}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-medium text-xs">
                              Tema
                            </p>
                            <p className="text-gray-800 font-semibold text-sm capitalize">
                              {order.theme?.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-medium text-xs">
                              Paket
                            </p>
                            <p className="text-gray-800 font-semibold text-sm">
                              {order.package?.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-medium text-xs">
                              Total
                            </p>
                            <p className="text-gray-800 font-semibold text-sm">
                              {formatToRupiah(
                                order.price - order.discount + order.admin_fee
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {state.toalRows > 0 && (
                <div className="border border-gray-200 rounded-xl hidden lg:block">
                  <table className="table-auto overflow-x-auto w-full table">
                    <thead>
                      <tr>
                        <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                          ID Pesanan
                        </td>
                        <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100 rounded-tl-xl">
                          Identitas
                        </td>
                        <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                          Tema & Paket
                        </td>
                        <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                          Total Harga
                        </td>
                        <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                          Status
                        </td>
                        <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                          Dibuat Pada
                        </td>
                        <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100 rounded-tr-xl">
                          Aksi
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {state.orders.map((order, index) => {
                        const oneMonthAgo = new Date();
                        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

                        const isExpired =
                          !order.client ||
                          new Date(order.updated_at as string) < oneMonthAgo;

                        return (
                          <tr
                            key={order.id}
                            className={`border-b ${
                              state.orders.length - 1 === index
                                ? "border-b-transparent"
                                : "border-b-gray-200"
                            }`}
                          >
                            <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                              <p>{order.order_id ?? "-"}</p>
                            </td>

                            <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                              <p className="whitespace-nowrap">{order.name}</p>
                              <p className="text-gray-600 font-medium text-sm mt-1">
                                {order.phone}
                              </p>
                            </td>

                            <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                              <span className="whitespace-nowrap">
                                {order.theme?.name}
                              </span>
                              <p className="text-gray-600 font-medium text-sm">
                                {order.package?.name}
                              </p>
                            </td>

                            <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                              <p>
                                {order.price > 0
                                  ? formatToRupiah(
                                      order.price -
                                        order.discount +
                                        order.admin_fee
                                    )
                                  : "-"}
                              </p>
                            </td>

                            <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                              <div className="flex">
                                {!isExpired ? (
                                  <InputSelect
                                    inputSize="small"
                                    options={clientStatus}
                                    value={order.client?.status as Status}
                                    onChange={(e) =>
                                      actions.handleSetStatus(
                                        order.client?.id as number,
                                        e.target.value
                                      )
                                    }
                                  />
                                ) : (
                                  "Expired"
                                )}
                              </div>
                            </td>

                            <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                              {moment(order.created_at).format(
                                "dddd, DD MMM YYYY"
                              )}
                            </td>

                            <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                              <ButtonActionDialog>
                                <Link href={`/admin/orders/${order.order_id}`}>
                                  <ButtonText
                                    type="button"
                                    size="medium"
                                    title="Lihat Pesanan"
                                    icon={<BiReceipt className="text-base" />}
                                  />
                                </Link>
                                <Link
                                  href={`/admin/clients/${order.client?.slug}`}
                                >
                                  <ButtonText
                                    type="button"
                                    size="medium"
                                    title="Lihat Klien"
                                    icon={<BiUser className="text-base" />}
                                  />
                                </Link>
                                <ButtonText
                                  type="button"
                                  onClick={() =>
                                    actions.handleDelete(order.id as number)
                                  }
                                  size="medium"
                                  title="Hapus"
                                  icon={<BiTrash className="text-base" />}
                                />
                              </ButtonActionDialog>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
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

export default AdminOrders;
