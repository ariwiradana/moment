import React, { FC } from "react";
import Title from "../elements/title";
import Image from "next/image";
import Button from "../elements/button";
import { BiSolidSend } from "react-icons/bi";
import { UseEarthlyEleganceTheme } from "@/hooks/themes/useEarthlyEleganceTheme";
import Input from "../elements/input";
import InputTextarea from "../elements/textarea";
import InputCheckbox from "../elements/checkbox";

interface Props {
  state: UseEarthlyEleganceTheme["state"];
  actions: UseEarthlyEleganceTheme["actions"];
}

const ReviewsComponent: FC<Props> = (props) => {
  return (
    <section>
      <div className="relative px-6 pb-16 w-full flex flex-col justify-center items-center max-w-screen-sm mx-auto">
        <div data-aos="zoom-in-up">
          <Image
            alt="leaf-datetime"
            src="/images/theme1/leaf5-gold.svg"
            width={110}
            height={50}
            className="mb-8"
          />
        </div>
        <div data-aos="fade-up">
          <Title className="text-theme1-gold" title="Mohon Doa Restu" />
        </div>
        <form
          onSubmit={props.actions.handleSubmit}
          className="mt-8 flex flex-col gap-4 w-full"
          data-aos="fade-up"
        >
          <Input
            value={props.state.formData.name}
            label="Nama"
            id="name"
            onChange={(e) => props.actions.handleChange("name", e.target.value)}
          />
          <InputTextarea
            value={props.state.formData.wishes}
            label="Ucapan"
            id="wishes"
            rows={6}
            onChange={(e) =>
              props.actions.handleChange("wishes", e.target.value)
            }
          />
          <div className="flex gap-x-4 justify-between">
            <InputCheckbox
              value="Hadir"
              checked={props.state.formData.attendant === "Hadir"}
              label="Hadir"
              onChange={(e) =>
                props.actions.handleChange("attendant", e.target.value)
              }
            />
            <InputCheckbox
              value="Tidak Hadir"
              checked={props.state.formData.attendant === "Tidak Hadir"}
              label="Tidak Hadir"
              onChange={(e) =>
                props.actions.handleChange("attendant", e.target.value)
              }
            />
            <InputCheckbox
              checked={props.state.formData.attendant === "Masih Ragu"}
              value="Masih Ragu"
              label="Masih Ragu"
              onChange={(e) =>
                props.actions.handleChange("attendant", e.target.value)
              }
            />
          </div>
          <div className="mt-4">
            <Button type="submit" title="Kirim Ucapan" icon={<BiSolidSend />} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default ReviewsComponent;
