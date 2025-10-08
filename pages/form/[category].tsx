import Seo from "@/components/dashboard/elements/seo";
import Layout from "@/components/dashboard/layout";
import useClientForm from "@/hooks/client/useClientForm";
import useDisableInspect from "@/hooks/useDisableInspect";
import { redhat } from "@/lib/fonts";
import useClientFormStore from "@/store/useClientFormStore";
import { GetServerSideProps } from "next";
import React from "react";
import { BiCheck } from "react-icons/bi";

interface Props {
  category: string;
}

const DashboardForm = ({ category }: Props) => {
  const { state } = useClientForm(category);
  const { activeStep } = useClientFormStore();
  useDisableInspect();

  return (
    <Layout>
      <Seo
        url={`https://momentinvitation.com/form/`}
        title="Form Klien | Moment"
        description="Masukkan informasi klien dengan mudah di halaman Form Klien Moment. Kelola data klien, tambahkan detail undangan, dan buat pengalaman pernikahan atau mempandes yang disesuaikan dengan kebutuhan."
        keywords={`form klien undangan, masukkan data klien pernikahan, form klien mempandes, kelola informasi klien, undangan digital klien, form klien Bali, kelola data klien undangan`}
        image="https://res.cloudinary.com/dsbmvj2s3/image/upload/v1759919489/seo_cvsy5o.webp"
      />

      <div className="max-w-screen-2xl mx-auto pt-16 md:pt-20 lg:pt-24">
        <div className="pb-16 pt-8">
          <div className="sticky bg-white z-20 top-12 md:top-16 lg:top-20 py-6 px-6 md:px-12 lg:px-24">
            <div className="lg:hidden">
              <div className="flex items-center gap-x-3">
                <div className="w-10 h-10 aspect-square rounded flex justify-center items-center bg-dashboard-dark text-white text-xl">
                  {state.formComponents[category]?.icons[activeStep]}
                </div>
                <div>
                  <h6 className="text-xs uppercase tracking-widest text-dashboard-dark/60">
                    Step {activeStep + 1}
                  </h6>
                  <h4
                    className={`text-dashboard-dark text-base font-semibold ${redhat.className}`}
                  >
                    {state.formComponents[category]?.steps[activeStep]}
                  </h4>
                </div>
              </div>

              <div className="w-full relative h-[2px] bg-zinc-100 mt-4">
                {state.formComponents[category] && (
                  <div
                    style={{
                      width:
                        activeStep === 0
                          ? "5%"
                          : `${
                              (100 /
                                (state.formComponents[category]?.steps.length -
                                  1)) *
                              activeStep
                            }%`,
                    }}
                    className="absolute inset-0 bg-dashboard-primary rounded-full transition-all ease-in-out duration-500 delay-150"
                  ></div>
                )}
              </div>
            </div>
            <div
              style={{
                gridTemplateColumns: `repeat(${state.formComponents[category]?.steps.length}, minmax(0, 1fr))`,
              }}
              className={`hidden lg:grid relative`}
            >
              {state.formComponents[category]?.steps.map((step, index) => (
                <div key={`Desktop Step ${index + 1}`}>
                  <div className="flex items-center flex-col relative">
                    {index > 0 && (
                      <div
                        className={`top-1/2 transform -translate-y-1/2 left-0 w-1/2 absolute h-[1px] ${
                          index <= activeStep
                            ? "bg-dashboard-primary"
                            : "bg-dashboard-dark/20"
                        }`}
                      ></div>
                    )}
                    {state.formComponents &&
                    index < state.formComponents[category]?.steps.length - 1 ? (
                      <div
                        className={`top-1/2 transform -translate-y-1/2 right-0 w-1/2 absolute h-[1px] ${
                          index < activeStep
                            ? "bg-dashboard-primary"
                            : "bg-dashboard-dark/20"
                        }`}
                      ></div>
                    ) : null}
                    <div
                      className={`${
                        index < activeStep
                          ? "bg-dashboard-dark text-white"
                          : activeStep === index
                          ? "bg-dashboard-dark text-white"
                          : "border border-dashboard-dark/20 bg-white text-dashboard-dark"
                      } aspect-square min-w-10 min-h-10 flex items-center justify-center text-xl relative z-10 ${
                        redhat.className
                      }`}
                    >
                      {index === activeStep ? (
                        state.formComponents[category]?.icons[index]
                      ) : index < activeStep ? (
                        <BiCheck />
                      ) : (
                        <p className="font-medium text-xs text-dashboard-dark/40">
                          {index + 1}
                        </p>
                      )}
                    </div>
                  </div>
                  <h4
                    className={`text-center ${redhat.className} text-xs mt-2 ${
                      index > activeStep
                        ? "text-dashboard-dark/40"
                        : "text-dashboard-dark"
                    }`}
                  >
                    {step}
                  </h4>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:mt-8 mt-4 px-6 md:px-12 lg:px-24">
            {state.formComponents[category]?.components[activeStep]}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category } = context.params!;

  return {
    props: {
      category,
    },
  };
};

export default DashboardForm;
