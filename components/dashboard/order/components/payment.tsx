import useOrderStore from "@/store/useOrderStore";
import { calculateDiscountPercentage } from "@/utils/calculateDiscount";
import { formatToRupiah } from "@/utils/formatToRupiah";
import React, { useEffect } from "react";
import { BiDownload } from "react-icons/bi";
import Image from "next/image";
import ButtonSecondary from "../../elements/button.secondary";
import { Order } from "@/lib/types";
import moment from "moment";
import { generateInvoiceId } from "@/utils/generateInvoiceId";

const OrderPayment = () => {
  const store = useOrderStore();
  const { order, form } = store;

  const handlePrint = () => window.print();

  useEffect(() => {
    if (!order.order_id) {
      handleSetOrder();
    }
  }, [order]);

  const handleSetOrder = () => {
    const newOrder: Omit<Order, "id" | "client_id"> = {
      ...order,
      price: store.pkg?.price as number,
      discount: store.pkg?.discount || 0,
      admin_fee: 0,
      created_at: moment().format("DD MMMM YYYY"),
      order_id: generateInvoiceId(),
    };
    store.setNewOrder(newOrder);
  };

  return (
    <div className="bg-dashboard-dark/[0.02] lg:py-10 lg:px-6 print:bg-white border border-dashboard-dark/10 lg:border-transparent print:border-none ">
      <div className="max-w-lg mx-auto bg-white shadow-xl shadow-dashboard-dark/5 overflow-hidden print:shadow-none">
        {/* Header */}
        <div className="p-6 print:px-0 border-b border-dashboard-dark/10 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-dashboard-dark">
              Detail Pesanan
            </h2>

            <p className="text-base text-dashboard-dark/60 mt-1">
              ID: <span className="font-medium">{order.order_id}</span>
            </p>
            <p className="text-base text-dashboard-dark/60">
              Tanggal:{" "}
              <span className="font-medium">
                {order?.id
                  ? moment(order.created_at).format("DD MMM YYYY")
                  : moment().format("DD MMM YYYY")}
              </span>
            </p>

            {order.status && (
              <div className="flex mt-2">
                <span
                  className={`capitalize text-xs md:text-sm font-semibold px-2 py-[2px] rounded-lg ${
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
                  {order.status === "pending"
                    ? "Menunggu Pembayaran"
                    : order.status === "settlement"
                    ? "Pembayaran Berhasil"
                    : order.status === "expire"
                    ? "Transaksi Kadaluarsa"
                    : order.status === "cancel"
                    ? "Dibatalkan"
                    : order.status === "deny"
                    ? "Ditolak"
                    : "Unknown"}
                </span>
              </div>
            )}
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
            <p className="font-medium text-gray-800 text-lg">{form.name}</p>
            {form.email && (
              <p className="text-base text-gray-600">{form.email}</p>
            )}
            {form.phone && (
              <p className="text-base text-gray-600">{form.phone}</p>
            )}
          </div>

          {/* Item */}
          <div className="border overflow-hidden">
            <div className="flex justify-between items-center bg-dashboard-dark/[0.02] p-4">
              <div>
                <p className="text-base font-medium text-gray-800">
                  Tema: {store.theme?.name}
                </p>
                <p className="text-base text-dashboard-dark/60">
                  Paket: {store.pkg?.name}
                </p>
              </div>
              <div className="text-base text-gray-700">
                {formatToRupiah(order.price)}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="border-t border-dashboard-dark/10 pt-4 space-y-2">
            <div className="flex justify-between text-base text-gray-600">
              <span>Subtotal</span>
              <span>{formatToRupiah(order.price)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-base text-gray-600">
                <span>
                  Diskon (
                  {calculateDiscountPercentage(order.price, order.discount)}
                  %)
                </span>
                <span>-{formatToRupiah(order.discount)}</span>
              </div>
            )}
            {order.admin_fee > 0 && (
              <div className="flex justify-between text-base text-gray-600">
                <span>Biaya Layanan</span>
                <span>{formatToRupiah(order.admin_fee)}</span>
              </div>
            )}

            <div className="border-t border-dashed border-gray-300 pt-3 mt-3 flex justify-between items-center">
              <span className="text-base font-medium text-gray-700">Total</span>
              <span className="text-xl font-semibold text-gray-900">
                {formatToRupiah(order.price - order.discount + order.admin_fee)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-dashboard-dark/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-base text-dashboard-dark/60 text-center md:text-left">
              Terima kasih telah memesan di <br /> <b>Moment Invitation</b> 💌
            </p>
          </div>
          <div className="print:hidden">
            <ButtonSecondary
              onClick={handlePrint}
              type="button"
              title="Print / Simpan PDF"
              size="small"
              icon={<BiDownload />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPayment;
