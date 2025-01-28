import Seo from "@/components/dashboard/elements/seo";
import BrideForm from "@/components/dashboard/form/bride";
import CustomOpeningClosingForm from "@/components/dashboard/form/custom.opening.closing";
import EventForm from "@/components/dashboard/form/events";
import FilesForm from "@/components/dashboard/form/files";
import GiftForm from "@/components/dashboard/form/gift";
import GroomForm from "@/components/dashboard/form/groom";
import PackageThemeLinkForm from "@/components/dashboard/form/package.theme.link";
import Layout from "@/components/dashboard/layout";
import { afacad } from "@/lib/fonts";
import useClientFormStore from "@/store/useClientFormStore";
import { Step, StepConnector, StepLabel, Stepper, styled } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import {
  BiCheck,
  BiGift,
  BiGroup,
  BiImages,
  BiNote,
  BiParty,
  BiText,
} from "react-icons/bi";

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
  const { activeStep, setActiveStep, form } = useClientFormStore();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "sadasdadsad"; // This is required for most browsers to show the dialog.
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeStep]);

  const Form: Record<number, ReactNode> = {
    0: <PackageThemeLinkForm category={category} />,
    1: <EventForm />,
    2: <GroomForm />,
    3: <BrideForm />,
    4: <FilesForm />,
    5: <GiftForm />,
    6: <CustomOpeningClosingForm />,
  };

  const steps = [
    "Paket, Tema & Link Undangan",
    "Acara Undangan",
    "Mempelai Pria",
    "Mempelai Wanita",
    "File Pendukung Undangan",
    "Hadiah Digital",
    "Kalimat Pembuka & Penutup Undangan",
  ];

  const stepIcons = [
    <BiNote key="Step Icon 1" />,
    <BiParty key="Step Icon 2" />,
    <BiGroup key="Step Icon 3" />,
    <BiGroup key="Step Icon 4" />,
    <BiImages key="Step Icon 5" />,
    <BiGift key="Step Icon 6" />,
    <BiText key="Step Icon 7" />,
  ];

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (activeStep === 6) {
      try {
        alert(JSON.stringify(form));
        toast.success("Informasi Undangan berhasil ditambahkan.");
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

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
                  {stepIcons[activeStep]}
                </div>
                <div>
                  <h6 className="text-xs uppercase tracking-widest text-dashboard-dark/60">
                    Step {activeStep + 1}
                  </h6>
                  <h4
                    className={`text-dashboard-dark text-lg font-semibold ${afacad.className}`}
                  >
                    {steps[activeStep]}
                  </h4>
                </div>
              </div>
              <div className="w-full relative h-[3px] bg-zinc-100 mt-4 rounded-full">
                <div
                  style={{
                    width:
                      activeStep === 0
                        ? "5%"
                        : `${(100 / (steps.length - 1)) * activeStep}%`,
                  }}
                  className="absolute inset-0 bg-dashboard-primary rounded-full transition-all ease-in-out duration-500 delay-150"
                ></div>
              </div>
            </div>
            <Stepper
              className="hidden lg:flex"
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
              {steps.map((label, index) => (
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
                            stepIcons[index]
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
          <form
            onSubmit={handleSubmit}
            className="lg:mt-8 mt-4 px-6 md:px-12 lg:px-24"
          >
            {Form[activeStep]}
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
