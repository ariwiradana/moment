import { montserrat } from "@/lib/fonts";
import useClientFormStore from "@/store/useClientFormStore";
import React from "react";
import ButtonPrimary from "../elements/button.primary";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const FilesForm = () => {
  const { activeStep, setActiveStep } = useClientFormStore();

  return (
    <div className={`${montserrat.className}`}>
      <div className="flex justify-between p-6 bg-zinc-50 mt-5 rounded-lg">
        <ButtonPrimary
          size="medium"
          type="button"
          icon={<IoArrowBack />}
          title="Sebelumnya"
          onClick={() => {
            setActiveStep(activeStep - 1);
          }}
        />
        <ButtonPrimary
          size="medium"
          type="button"
          icon={<IoArrowForward />}
          iconPosition="right"
          title="Berikutnya"
          onClick={() => {
            setActiveStep(activeStep + 1);
          }}
        />
      </div>
    </div>
  );
};

export default FilesForm;
