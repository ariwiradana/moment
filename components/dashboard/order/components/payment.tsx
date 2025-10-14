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
  const { order } = store;

  const handlePrint = () => window.print();

  useEffect(() => {
    if (!order.order_id) {
      handleSetOrder();
    }
  }, [order]);

  const handleSetOrder = () => {
    const newOrder: Omit<Order, "id" | "client_id"> = {
      name: store.form.name,
      email: store.form.email as string,
      phone: store.form.phone as string,
      package_id: store.pkg?.id as number,
      price: store.pkg?.price as number,
      discount: store.pkg?.discount || 0,
      theme_id: store.theme?.id as number,
      admin_fee: 0,
      created_at: moment().format("DD MMMM YYYY"),
      status: "pending",
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
            <h2 className="text-xl font-semibold text-dashboard-dark">
              Receipt
            </h2>
            <p className="text-sm text-dashboard-dark/60 mt-1">
              Order ID: <span className="font-medium">{order.order_id}</span>
            </p>
            <p className="text-sm text-dashboard-dark/60">
              Tanggal: <span className="font-medium">{order.created_at}</span>
            </p>
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
            <h3 className="text-sm text-dashboard-dark/60 uppercase">
              Pemesan
            </h3>
            <p className="font-medium text-gray-800">{order.name}</p>
            {order.phone && (
              <p className="text-sm text-gray-600">{order.phone}</p>
            )}
          </div>

          {/* Item */}
          <div className="border overflow-hidden">
            <div className="flex justify-between items-center bg-dashboard-dark/[0.02] p-4">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  Tema: {store.theme?.name}
                </p>
                <p className="text-xs text-dashboard-dark/60">
                  Paket: {store.pkg?.name}
                </p>
              </div>
              <div className="text-sm text-gray-700">
                {formatToRupiah(order.price)}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="border-t border-dashboard-dark/10 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>{formatToRupiah(order.price)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  Diskon (
                  {calculateDiscountPercentage(order.price, order.discount)}
                  %)
                </span>
                <span>-{formatToRupiah(order.discount)}</span>
              </div>
            )}
            {order.admin_fee > 0 && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Biaya Layanan</span>
                <span>{formatToRupiah(order.admin_fee)}</span>
              </div>
            )}

            <div className="border-t border-dashed border-gray-300 pt-3 mt-3 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total</span>
              <span className="text-xl font-semibold text-gray-900">
                {formatToRupiah(order.price - order.discount + order.admin_fee)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-dashboard-dark/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-sm text-dashboard-dark/60 text-center md:text-left">
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
