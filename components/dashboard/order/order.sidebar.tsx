import React from "react";
import { BiAlignJustify, BiCheck, BiLayout } from "react-icons/bi";
import useOrderStore from "@/store/useOrderStore";
import { redhat } from "@/lib/fonts";
import useSteps from "./order.steps";

const OrderSidebar = () => {
  const store = useOrderStore();
  const steps = useSteps();

  return (
    <div className="flex flex-col sticky top-36 space-y-2">
      <div className="flex space-x-3">
        <p className="bg-dashboard-dark/5 text-sm px-3 py-1 rounded-full flex items-center gap-x-1">
          <BiLayout className="text-base" />
          {store.theme?.name}
        </p>
        <p className="bg-dashboard-dark/5 text-sm px-3 py-1 rounded-full flex items-center gap-x-1">
          <BiAlignJustify className="text-base" />
          {store.pkg?.name}
        </p>
      </div>
      {steps.map((step, index) => {
        const isActive = index === store.activeStep;
        const isLast = index === steps.length - 1;
        const isFullfilled = store.fullfilledSteps[index];

        return (
          <div key={index} className="flex gap-x-4 relative py-4">
            <div
              className={`w-[1px] absolute left-6 h-[80%] -bottom-8 ${
                isFullfilled ? "bg-dashboard-primary" : "bg-dashboard-dark/10"
              } ${isLast && "hidden"}`}
            />
            <div className="p-2 rounded-full relative z-10 bg-white">
              <button
                disabled={!isFullfilled}
                onClick={() => store.setActiveStep(index)}
                className={`w-9 h-9 flex justify-center items-center rounded-full ${
                  isActive
                    ? "bg-dashboard-dark"
                    : isFullfilled
                    ? "bg-dashboard-primary"
                    : "bg-dashboard-dark/10"
                }`}
              >
                {isActive ? (
                  <div className="text-white text-lg">{step.icon}</div>
                ) : isFullfilled ? (
                  <BiCheck className="text-white text-lg" />
                ) : (
                  <p
                    className={`${
                      isActive
                        ? "text-white"
                        : isFullfilled
                        ? "text-dashboard-dark"
                        : "text-dashboard-dark/30"
                    }`}
                  >
                    {index + 1}
                  </p>
                )}
              </button>
            </div>
            <div className={`${redhat.className} hidden md:block`}>
              <h5
                className={`lg:text-lg font-semibold ${
                  isActive || isFullfilled
                    ? "text-dashboard-dark"
                    : "text-dashboard-dark/30"
                }`}
              >
                {step.stepTitle}
              </h5>
              <p
                className={`text-sm lg:text-base ${
                  isActive || isFullfilled
                    ? "text-dashboard-dark/70"
                    : "text-dashboard-dark/30"
                }`}
              >
                {step.stepDescription}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderSidebar;
