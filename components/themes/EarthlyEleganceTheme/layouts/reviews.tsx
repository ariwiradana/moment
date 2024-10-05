import React, { FC } from "react";
import Title from "../elements/title";
import Image from "next/image";
import Button from "../elements/button";
import { BiSolidSend, BiTime, BiUser } from "react-icons/bi";
import { UseEarthlyEleganceTheme } from "@/hooks/themes/useEarthlyEleganceTheme";
import Input from "../elements/input";
import InputTextarea from "../elements/textarea";
import InputCheckbox from "../elements/checkbox";
import { comforta } from "@/lib/fonts";
import { getInitial } from "@/utils/getInitial";
import moment from "moment";

interface Props {
  state: UseEarthlyEleganceTheme["state"];
  actions: UseEarthlyEleganceTheme["actions"];
}

const ReviewsComponent: FC<Props> = (props) => {
  const { loading, formData } = props.state;
  const isDisabled =
    loading || !formData.name || !formData.attendant || !formData.wishes;

  const attendantText: Record<string, string> = {
    Hadir: "Saya akan hadir",
    "Tidak Hadir": "Maaf saya tidak bisa hadir",
    Ragu: "Maaf saya masih ragu",
  };
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
            placeholder="Masukkan nama kamu"
            value={props.state.formData.name}
            id="name"
            onChange={(e) => props.actions.handleChange("name", e.target.value)}
          />
          <InputTextarea
            placeholder="Masukkan ucapan kamu"
            value={props.state.formData.wishes}
            id="wishes"
            rows={6}
            onChange={(e) =>
              props.actions.handleChange("wishes", e.target.value)
            }
          />
          <div className="flex gap-x-4 justify-between lg:justify-start">
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
            <Button
              disabled={isDisabled}
              isLoading={props.state.loading}
              type="submit"
              title="Kirim Ucapan"
              icon={<BiSolidSend />}
            />
          </div>
        </form>

        <div className="flex flex-col mt-8 w-full max-h-[17rem] overflow-y-auto gap-2">
          {props.state.reviews?.map((r) => (
            <div key={r.id} className="flex mb-4" data-aos="fade-up">
              <div className="flex-shrink-0">
                <div className="w-9 h-9 bg-gray-100 rounded-full flex justify-center items-center text-xs font-bold text-admin-dark">
                  <span className={comforta.className}>
                    {getInitial(r.name)}
                  </span>
                </div>
              </div>

              <div className="ml-4 relative max-w-md">
                <div className="p-3 bg-gray-100 rounded-lg relative">
                  <div className="absolute left-[-8px] top-3 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-gray-100"></div>

                  <div className="flex items-center gap-x-3">
                    <h1
                      className={`${comforta.className} text-sm text-admin-dark font-bold`}
                    >
                      {r.name}
                    </h1>
                  </div>
                  <p
                    className={`${comforta.className} text-sm text-gray-500 leading-5 my-2`}
                  >
                    {r.wishes}
                  </p>
                </div>

                <div className="flex divide-x-[0.5px] divide-theme1-gold mt-2">
                  <div className="flex items-center gap-1 text-xs text-theme1-gold pr-2">
                    <BiTime />
                    <p>{moment(r.created_at).format("DD MMM YYYY")}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-theme1-gold pl-2">
                    <BiUser />
                    <p>{attendantText[r.attendant]}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsComponent;
