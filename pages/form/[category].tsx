import Seo from "@/components/dashboard/elements/seo";
import Layout from "@/components/dashboard/layout";
import useClientForm from "@/hooks/client/useClientForm";
import useDisableInspect from "@/hooks/useDisableInspect";
import { afacad } from "@/lib/fonts";
import useClientFormStore from "@/store/useClientFormStore";
import { GetServerSideProps } from "next";
import React from "react";
import { BiCheck } from "react-icons/bi";

interface Props {
  category: string;
}

const DashboardForm = ({ category }: Props) => {
  const { state, actions } = useClientForm(category);
  const { activeStep, setActiveStep } = useClientFormStore();
  useDisableInspect();

  return (
    <Layout>
      <Seo
        url={`https://momentinvitation.com/form/${category}`}
        title="Form Klien | Moment"
        description="Masukkan informasi klien dengan mudah di halaman Form Klien Moment. Kelola data klien, tambahkan detail undangan, dan buat pengalaman pernikahan atau mempandes yang disesuaikan dengan kebutuhan."
        keywords={`form klien undangan, masukkan data klien pernikahan, form klien mempandes, kelola informasi klien, undangan digital klien, form klien Bali, kelola data klien undangan`}
        image="https://res.cloudinary.com/dwitznret/image/upload/v1734241503/seo_xftrjs.webp"
      />

      <div className="max-w-screen-2xl mx-auto pt-16 md:pt-20 lg:pt-24">
        <div className="pb-16 pt-8">
          <div className="sticky bg-white z-20 top-16 md:top-20 lg:top-24 py-6 px-6 md:px-12 lg:px-24">
            <div className="lg:hidden">
              <div className="flex items-center gap-x-3">
                <div className="w-10 h-10 aspect-square rounded flex justify-center items-center bg-dashboard-primary text-dashboard-dark text-2xl">
                  {state.formComponents?.icons[activeStep]}
                </div>
                <div>
                  <h6 className="text-xs uppercase tracking-widest text-dashboard-dark/60">
                    Step {activeStep + 1}
                  </h6>
                  <h4
                    className={`text-dashboard-dark text-lg font-semibold ${afacad.className}`}
                  >
                    {state.formComponents?.steps[activeStep]}
                  </h4>
                </div>
              </div>

              <div className="w-full relative h-[3px] bg-zinc-100 mt-4 rounded-full">
                {state.formComponents && (
                  <div
                    style={{
                      width:
                        activeStep === 0
                          ? "5%"
                          : `${
                              (100 / (state.formComponents?.steps.length - 1)) *
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
                gridTemplateColumns: `repeat(${state.formComponents?.steps.length}, minmax(0, 1fr))`,
              }}
              className={`hidden lg:grid relative`}
            >
              {state.formComponents?.steps.map((step, index) => (
                <div key={`Desktop Step ${index + 1}`}>
                  <div className="flex items-center flex-col relative">
                    {index > 0 && (
                      <div
                        className={`top-1/2 transform -translate-y-1/2 left-0 w-1/2 absolute h-[2px] ${
                          index <= activeStep
                            ? "bg-dashboard-primary"
                            : "bg-zinc-200"
                        }`}
                      ></div>
                    )}
                    {state.formComponents &&
                    index < state.formComponents?.steps.length - 1 ? (
                      <div
                        className={`top-1/2 transform -translate-y-1/2 right-0 w-1/2 absolute h-[2px] ${
                          index < activeStep
                            ? "bg-dashboard-primary"
                            : "bg-zinc-200"
                        }`}
                      ></div>
                    ) : null}
                    <div
                      onClick={() => setActiveStep(index)}
                      className={`${
                        index < activeStep
                          ? "bg-dashboard-primary text-dashboard-dark cursor-pointer"
                          : activeStep === index
                          ? "bg-dashboard-primary text-dashboard-dark"
                          : "bg-zinc-300 text-white"
                      } aspect-square min-w-10 min-h-10 rounded-full flex items-center justify-center text-2xl relative z-10 ${
                        afacad.className
                      }`}
                    >
                      {index === activeStep ? (
                        state.formComponents?.icons[index]
                      ) : index < activeStep ? (
                        <BiCheck />
                      ) : (
                        <p className="text-lg font-medium">{index + 1}</p>
                      )}
                    </div>
                  </div>
                  <h4
                    className={`text-center ${
                      afacad.className
                    } font-medium mt-2 ${
                      index > activeStep
                        ? "text-zinc-300"
                        : "text-dashboard-dark"
                    }`}
                  >
                    {step}
                  </h4>
                </div>
              ))}
            </div>
          </div>
          <form
            onSubmit={actions.handleSubmit}
            className="lg:mt-8 mt-4 px-6 md:px-12 lg:px-24"
          >
            {state.formComponents?.components[activeStep]}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category } = context.params as { category: string };
  return {
    props: {
      category,
    },
  };
};

export default DashboardForm;
