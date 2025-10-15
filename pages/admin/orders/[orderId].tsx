import React from "react";
import { GetServerSideProps } from "next";
import { montserrat } from "@/lib/fonts";
import AdminLayout from "@/components/admin/layouts";
import { BiDownload, BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import Loader from "@/components/admin/elements/loader";
import { isTokenExpired } from "@/lib/auth";
import Cookies from "cookies";
import moment from "moment";
import Image from "next/image";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { calculateDiscountPercentage } from "@/utils/calculateDiscount";
import ButtonSecondary from "@/components/admin/elements/button.secondary";
import { useAdminDetailOrder } from "@/hooks/admin/useAdminDetailOrder";

interface DetailThemeProps {
  orderId: number;
  token: string | null;
}

const DetailTheme: React.FC<DetailThemeProps> = ({ orderId, token }) => {
  const {
    state: { order, isLoading },
    actions,
  } = useAdminDetailOrder(orderId, token);

  return (
    <AdminLayout>
      <div className={`${montserrat.className}`}>
        <Link href="/admin/orders">
          <div className="flex items-center gap-x-1 text-gray-400 print:hidden">
            <BiLeftArrowAlt className="text-base" />
            <span className="text-sm font-medium">kembali</span>
          </div>
        </Link>
        <h1 className="text-2xl font-bold mt-2 mb-8 print:hidden">
          Detail Pesanan
        </h1>
        {isLoading ? (
          <div className="max-w-screen-md">
            <Loader />
          </div>
        ) : (
          <div className="bg-dashboard-dark/[0.02] lg:py-10 lg:px-6 print:bg-white border border-dashboard-dark/10 lg:border-transparent print:border-none ">
            <div className="max-w-lg mx-auto bg-white shadow-xl shadow-dashboard-dark/5 overflow-hidden print:shadow-none">
              {/* Header */}
              <div className="p-6 print:px-0 border-b border-dashboard-dark/10 flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-dashboard-dark">
                    Detail Pesanan
                  </h2>

                  <p className="text-base text-dashboard-dark/60 mt-1">
                    ID: <span className="font-medium">{order?.order_id}</span>
                  </p>
                  <p className="text-base text-dashboard-dark/60">
                    Tanggal:{" "}
                    <span className="font-medium">
                      {moment(order?.created_at).format("DD MMM YYYY")}
                    </span>
                  </p>

                  <div className="flex mt-2">
                    <span
                      className={`px-1.5 py-0.5 text-sm font-medium ${
                        order?.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : order?.status === "settlement"
                          ? "bg-green-100 text-green-600"
                          : order?.status === "expire"
                          ? "bg-red-100 text-red-600"
                          : order?.status === "cancel"
                          ? "bg-gray-100 text-gray-600"
                          : order?.status === "deny"
                          ? "bg-red-200 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order?.status === "pending"
                        ? "Menunggu Pembayaran"
                        : order?.status === "settlement"
                        ? "Pembayaran Berhasil"
                        : order?.status === "expire"
                        ? "Transaksi Kadaluarsa"
                        : order?.status === "cancel"
                        ? "Dibatalkan"
                        : order?.status === "deny"
                        ? "Ditolak"
                        : "Unknown"}
                    </span>
                  </div>
                </div>

                <div className="relative w-6 aspect-square">
                  <Image
                    alt="logo"
                    fill
                    className="object-contain"
                    src="/favicon-180x180.png"
                    sizes="100px"
                  />
                </div>
              </div>

              {/* Body */}
              <div className="p-6 print:px-0 space-y-6">
                {/* Customer Info */}
                <div>
                  <h3 className="text-base text-dashboard-dark/60">Pemesan</h3>
                  <p className="font-medium text-gray-800 text-lg">
                    {order?.client?.name}
                  </p>
                  {order?.client?.email && (
                    <p className="text-base text-gray-600">
                      {order.client.email}
                    </p>
                  )}
                  {order?.client?.phone && (
                    <p className="text-base text-gray-600">
                      {order.client.phone}
                    </p>
                  )}
                </div>

                {/* Item */}
                <div className="border overflow-hidden">
                  <div className="flex justify-between items-center bg-dashboard-dark/[0.02] p-4">
                    <div>
                      <p className="text-base font-medium text-gray-800">
                        Tema: {order?.client?.theme?.name}
                      </p>
                      <p className="text-base text-dashboard-dark/60">
                        Paket: {order?.client?.package?.name}
                      </p>
                    </div>
                    <div className="text-base text-gray-700">
                      {formatToRupiah(order?.price as number)}
                    </div>
                  </div>
                </div>

                {/* Summary */}
                {order?.price && order.discount ? (
                  <div className="border-t border-dashboard-dark/10 pt-4 space-y-2">
                    <div className="flex justify-between text-base text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatToRupiah(order?.price)}</span>
                    </div>
                    {order?.discount > 0 && (
                      <div className="flex justify-between text-base text-gray-600">
                        <span>
                          Diskon (
                          {calculateDiscountPercentage(
                            order?.price,
                            order?.discount
                          )}
                          %)
                        </span>
                        <span>-{formatToRupiah(order?.discount)}</span>
                      </div>
                    )}
                    {order?.admin_fee > 0 && (
                      <div className="flex justify-between text-base text-gray-600">
                        <span>Biaya Layanan</span>
                        <span>{formatToRupiah(order?.admin_fee)}</span>
                      </div>
                    )}

                    <div className="border-t border-dashed border-gray-300 pt-3 mt-3 flex justify-between items-center">
                      <span className="text-base font-medium text-gray-700">
                        Total
                      </span>
                      <span className="text-xl font-semibold text-gray-900">
                        {formatToRupiah(
                          order?.price - order?.discount + order?.admin_fee
                        )}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-dashboard-dark/10 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <p className="text-base text-dashboard-dark/60 text-center md:text-left">
                    Terima kasih telah memesan di <br />{" "}
                    <b>Moment Invitation</b> 💌
                  </p>
                </div>
                <div className="print:hidden">
                  <ButtonSecondary
                    onClick={actions.handlePrint}
                    type="button"
                    title="Print / Simpan PDF"
                    size="small"
                    icon={<BiDownload />}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { orderId } = context.params!;
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
      orderId,
      token,
    },
  };
};

export default DetailTheme;
