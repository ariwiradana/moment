import ButtonActionDialog from "@/components/admin/elements/button.action.dialog";
import ButtonText from "@/components/admin/elements/button.text";
import Loader from "@/components/admin/elements/loader";
import AdminLayout from "@/components/admin/layouts";
import { isTokenExpired } from "@/lib/auth";
import { montserrat } from "@/lib/fonts";
import { Pagination } from "@mui/material";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { BiCopyAlt, BiReceipt, BiTrash, BiUser } from "react-icons/bi";
import Cookies from "cookies";
import moment from "moment";
import { useAdminOrders } from "@/hooks/admin/useAdminOrders";
import { formatToRupiah } from "@/utils/formatToRupiah";
import Link from "next/link";
interface Props {
  token: string | null;
}

const AdminOrders: React.FC<Props> = ({ token }) => {
  const { state, actions } = useAdminOrders(token);

  const [baseURL, setBaseURL] = useState<string>("");

  useEffect(() => {
    const url = `${window.location.protocol}//${window.location.hostname}${
      window.location.port ? `:${window.location.port}` : ""
    }`;
    setBaseURL(url);
  }, []);

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
                  return (
                    <div key={order.id} className={`border rounded-lg p-3`}>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <div className="flex justify-between items-center gap-x-2 w-full">
                          <div className="flex items-center gap-x-2">
                            <div>
                              <h1 className="text-gray-800 font-semibold text-sm">
                                {order.client?.name}
                              </h1>
                              <p className="text-gray-500 font-medium text-xs">
                                {order.order_id}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-x-2">
                            <div className="flex">
                              <span
                                className={`capitalize text-xs font-semibold px-2 py-[2px] rounded-lg ${
                                  order.status === "pending"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : order.status === "settlement"
                                    ? "bg-green-100 text-green-600"
                                    : order.status === "expire"
                                    ? "bg-red-100 text-red-600"
                                    : order.status === "cancel"
                                    ? "bg-gray-100 text-gray-600"
                                    : order.status === "deny"
                                    ? "bg-red-200 text-red-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {order.status}
                              </span>
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
                              <ButtonText
                                type="button"
                                onClick={() =>
                                  actions.handleCopyURL(
                                    `${baseURL}/order/${order.order_id}`
                                  )
                                }
                                size="small"
                                title="Salin Link Pesanan"
                                icon={<BiCopyAlt className="text-base" />}
                              />
                            </ButtonActionDialog>
                          </div>
                        </div>
                      </div>
                      <div className="pt-3 flex flex-col gap-y-2 w-full">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="col-span-2">
                            <p className="text-gray-500 font-medium text-xs">
                              Email
                            </p>
                            <p className="text-gray-800 font-semibold text-sm">
                              {order.client?.email || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-medium text-xs">
                              Telepon
                            </p>
                            <p className="text-gray-800 font-semibold text-sm">
                              {order.client?.phone || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-medium text-xs">
                              Tema
                            </p>
                            <p className="text-gray-800 font-semibold text-sm">
                              {order.client?.theme?.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-medium text-xs">
                              Paket
                            </p>
                            <p className="text-gray-800 font-semibold text-sm">
                              {order.client?.package?.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-medium text-xs">
                              Total Harga
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
                        <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100 rounded-tl-xl">
                          ID Pesanan
                        </td>
                        <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                          Klien
                        </td>
                        <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                          Email / Telp
                        </td>
                        <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                          Tema & Paket
                        </td>
                        <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                          Total Harga
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
                        return (
                          <tr
                            key={order.id}
                            className={`border-b ${
                              state.orders.length - 1 === index
                                ? "border-b-transparent"
                                : "border-b-gray-200"
                            }`}
                          >
                            <td className="px-4 py-3 text-gray-800 font-semibold">
                              <p>{order.order_id ?? "-"}</p>
                              <div className="flex">
                                <span
                                  className={`capitalize text-xs font-semibold px-2 py-[2px] rounded-lg ${
                                    order.status === "pending"
                                      ? "bg-yellow-100 text-yellow-600"
                                      : order.status === "settlement"
                                      ? "bg-green-100 text-green-600"
                                      : order.status === "expire"
                                      ? "bg-red-100 text-red-600"
                                      : order.status === "cancel"
                                      ? "bg-gray-100 text-gray-600"
                                      : order.status === "deny"
                                      ? "bg-red-200 text-red-700"
                                      : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>
                            </td>

                            <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                              <p className="whitespace-nowrap">
                                {order.client?.name}
                              </p>
                              <p className="text-gray-600 font-medium text-sm">
                                {order.client?.slug}
                              </p>
                            </td>

                            <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                              <p className="whitespace-nowrap">
                                {order.client?.email || "-"}
                              </p>
                              <p className="text-gray-600 font-medium text-sm">
                                {order.client?.phone || "-"}
                              </p>
                            </td>

                            <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                              <span className="whitespace-nowrap">
                                {order.client?.theme?.name}
                              </span>
                              <p className="text-gray-600 font-medium text-sm">
                                {order.client?.package?.name}
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
                                <ButtonText
                                  type="button"
                                  onClick={() =>
                                    actions.handleCopyURL(
                                      `${baseURL}/order/${order.order_id}`
                                    )
                                  }
                                  size="medium"
                                  title="Salin Link Pesanan"
                                  icon={<BiCopyAlt className="text-base" />}
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
