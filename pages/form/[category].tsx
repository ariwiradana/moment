import Seo from "@/components/dashboard/elements/seo";
import Layout from "@/components/dashboard/layout";
import useClientForm from "@/hooks/form/useClientForm";
import { afacad } from "@/lib/fonts";
import useClientFormStore from "@/store/useClientFormStore";
import { Step, StepConnector, StepLabel, Stepper, styled } from "@mui/material";
import { GetServerSideProps } from "next";
import React from "react";
import { BiCheck } from "react-icons/bi";

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`& .MuiStepConnector-line`]: {
    borderColor: theme.palette.grey[400],
    marginTop: "8px", // Default connector color
  },
}));

interface Props {
  category: string;
}

const DashboardForm = ({ category }: Props) => {
  const { state, actions } = useClientForm(category);
  const { activeStep, setActiveStep } = useClientFormStore();

  return (
    <Layout>
      <Seo
        url={`https://momentinvitation.com/form`}
        title="Form Undangan | Moment"
        description="Kelola daftar tamu undangan Anda dengan mudah melalui halaman Tamu di Moment. Tambahkan nama tamu, kirimkan undangan digital, dan pastikan tidak ada tamu yang terlewat. Proses yang mudah dan praktis untuk setiap acara pernikahan dan mempandes."
        keywords={`daftar tamu undangan digital, kelola tamu undangan pernikahan, tamu undangan Bali, daftar tamu pernikahan Bali, undangan tamu pernikahan digital, kelola tamu mempandes Bali, undangan tamu mudah, tamu undangan praktis, undangan digital Bali tamu, manajemen tamu undangan digital`}
        image="https://res.cloudinary.com/dwitznret/image/upload/v1734241503/seo_xftrjs.webp"
      />

      <div className="max-w-screen-2xl mx-auto pt-16 md:pt-20 lg:pt-24">
        <div className="pb-16 pt-8">
          <div className="sticky bg-white z-20 top-16 md:top-20 lg:top-24 py-6 px-6 md:px-12 lg:px-24">
            <div className="lg:hidden">
              <div className="flex items-center gap-x-3">
                <div className="w-10 h-10 aspect-square rounded flex justify-center items-center bg-dashboard-primary text-dashboard-dark text-2xl">
                  {state.stepIcons[activeStep]}
                </div>
                <div>
                  <h6 className="text-xs uppercase tracking-widest text-dashboard-dark/60">
                    Step {activeStep + 1}
                  </h6>
                  <h4
                    className={`text-dashboard-dark text-lg font-semibold ${afacad.className}`}
                  >
                    {state.steps[activeStep]}
                  </h4>
                </div>
              </div>
              <div className="w-full relative h-[3px] bg-zinc-100 mt-4 rounded-full">
                <div
                  style={{
                    width:
                      activeStep === 0
                        ? "5%"
                        : `${(100 / (state.steps.length - 1)) * activeStep}%`,
                  }}
                  className="absolute inset-0 bg-dashboard-primary rounded-full transition-all ease-in-out duration-500 delay-150"
                ></div>
              </div>
            </div>
            <div className="hidden lg:block">
              <Stepper
                connector={<CustomConnector />}
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "grey.400",
                    fontFamily: "Afacad, sans-serif",
                    marginTop: "8px",
                  },
                  "& .MuiStepLabel-label.Mui-active": {
                    color: "#212224",
                    fontWeight: "600",
                  },
                  "& .MuiStepLabel-label.Mui-completed": {
                    color: "#212224",
                    fontWeight: "600",
                  },
                  "& .MuiStepIcon-root": {
                    color: "grey.300",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                  },
                  "& .MuiStepIcon-root.Mui-active": {
                    color: "#ffbd59",
                  },
                  "& .MuiStepIcon-root.Mui-completed": {
                    color: "#33B747",
                  },
                }}
                activeStep={activeStep}
                alternativeLabel
              >
                {state.steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel
                      StepIconComponent={() => {
                        return (
                          <div
                            onClick={() => {
                              if (index < activeStep) {
                                setActiveStep(index);
                              }
                            }}
                            className={`${
                              index < activeStep
                                ? "bg-admin-success text-white cursor-pointer"
                                : activeStep === index
                                ? "bg-dashboard-primary text-dashboard-dark"
                                : "bg-zinc-300 text-white"
                            } aspect-square min-w-10 min-h-10 rounded-full flex items-center justify-center text-2xl`}
                          >
                            {index < activeStep ? (
                              <BiCheck />
                            ) : activeStep === index ? (
                              state.stepIcons[index]
                            ) : (
                              <p
                                className={`${afacad.className} font-medium text-lg`}
                              >
                                {index + 1}
                              </p>
                            )}
                          </div>
                        );
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
          <form
            onSubmit={actions.handleSubmit}
            className="lg:mt-8 mt-4 px-6 md:px-12 lg:px-24"
          >
            {state.formComponents[activeStep]}
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
