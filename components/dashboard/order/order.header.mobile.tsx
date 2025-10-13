import React from "react";
import useOrderStore from "@/store/useOrderStore";
import { redhat } from "@/lib/fonts";
import useSteps from "./order.steps";

const OrderHeaderMobile = () => {
  const store = useOrderStore();
  const steps = useSteps();

  return (
    <div className="flex print:hidden lg:hidden justify-between items-center border-b border-b-dashboard-dark/5 gap-x-4 col-span-3 py-3 sticky top-12 z-10 mb-2 bg-white">
      <div>
        <h5 className="text-lg font-semibold text-dashboard-dark">
          {steps[store.activeStep].stepTitle}
        </h5>
        <p className={`${redhat.className} text-base text-dashboard-dark/70`}>
          {steps[store.activeStep].stepDescription}
        </p>
      </div>

      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke="currentColor"
            strokeWidth="3"
            className="text-dashboard-dark/10"
            fill="none"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            stroke="currentColor"
            strokeWidth="3"
            className="text-dashboard-primary transition-all duration-500 ease-out"
            fill="none"
            strokeDasharray={2 * Math.PI * 16}
            strokeDashoffset={
              2 * Math.PI * 16 * (1 - (store.activeStep + 1) / steps.length)
            }
            strokeLinecap="round"
          />
        </svg>
        <div className="w-9 h-9 rounded-full bg-white flex justify-center items-center">
          <p className="text-sm font-medium text-dashboard-dark">
            {store.activeStep + 1}/{steps.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderHeaderMobile;
