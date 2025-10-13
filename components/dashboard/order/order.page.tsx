import React from "react";
import Layout from "@/components/dashboard/layout";
import useOrderStore from "@/store/useOrderStore";
import { redhat } from "@/lib/fonts";
import OrderHeaderMobile from "./order.header.mobile";
import OrderSidebar from "./order.sidebar";
import OrderForm from "./order.form";
import useSteps from "./order.steps";
import { KeyedMutator } from "swr";
import { Client } from "@/lib/types";

interface Props {
  mutate?: KeyedMutator<{ data: Client }>;
}
const OrderPage = ({ mutate }: Props) => {
  const store = useOrderStore();
  const steps = useSteps();

  return (
    <>
      <Layout>
        <div className="max-w-screen-xl mx-auto px-4 md:px-12 lg:px-4 py-8 md:py-10 lg:py-16 mt-12 md:mt-16 lg:mt-20 grid grid-cols-3">
          <OrderHeaderMobile />
          <div className="md:col-span-1 relative hidden lg:block">
            <OrderSidebar />
          </div>
          <div className="col-span-3 lg:col-span-2">
            <div className="hidden lg:block mb-6">
              <h1
                className={`${redhat.className} capitalize text-2xl md:text-3xl lg:text-4xl max-w-sm font-semibold text-dashboard-dark`}
              >
                {steps[store.activeStep].title}
              </h1>
              <p
                className={`${redhat.className} text-base text-dashboard-dark/70 mt-2 lg:max-w-[70%]`}
              >
                {steps[store.activeStep].description}
              </p>
            </div>
            <OrderForm mutate={mutate} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default OrderPage;
