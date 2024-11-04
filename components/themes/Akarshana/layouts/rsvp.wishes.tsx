import React, { FC } from "react";
import Title from "../elements/title";
import Image from "next/image";
import Button from "../elements/button";
import { BiSolidSend, BiTime, BiUser } from "react-icons/bi";
import { useAakarshana } from "@/hooks/themes/useAakarshana";
import Input from "../elements/input";
import InputTextarea from "../elements/textarea";
import InputCheckbox from "../elements/checkbox";
import { afacad } from "@/lib/fonts";
import { getInitial } from "@/utils/getInitial";
import moment from "moment";

interface Props {
  state: useAakarshana["state"];
  actions: useAakarshana["actions"];
}

const RSVPWishesComponent: FC<Props> = (props) => {
  const attendantText: Record<string, string> = {
    Hadir: "Saya akan hadir",
    "Tidak Hadir": "Maaf saya tidak bisa hadir",
    "Masih Ragu": "Maaf saya masih ragu",
  };
  return (
    <section className="relative bg-white w-full">
      <div
        className="relative px-6 md:pb-8 w-full flex flex-col justify-center items-center z-20"
        data-aos="fade-up"
      >
        <div className="w-full max-w-screen-sm mx-auto">
          <div
            data-aos="zoom-in-up"
            className="relative h-12 lg:h-16 w-full mb-8 mt-16"
          >
            <Image
              alt="leaf-datetime"
              src="/images/theme1/leaf.svg"
              fill
              className="object-contain"
            />
          </div>
          <div data-aos="fade-up">
            <Title
              className="text-aakarshana-primary"
              title="RSVP & Ucapan"
              caption="Mohon doa restu"
            />
          </div>
          <form
            onSubmit={props.actions.handleSubmit}
            className="mt-12 flex flex-col gap-4 w-full"
            data-aos="fade-up"
          >
            <Input
              error={props.state.errors.name}
              placeholder="Masukkan nama kamu"
              value={props.state.formData.name}
              id="name"
              onChange={(e) =>
                props.actions.handleChange("name", e.target.value)
              }
            />
            <InputTextarea
              error={props.state.errors.wishes}
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
                isLoading={props.state.loading ? true : false}
                type="submit"
                title="Kirim"
                icon={<BiSolidSend />}
              />
            </div>
          </form>

          <div
            className="flex flex-col mt-8 w-full max-h-[25rem] overflow-y-auto gap-2"
            data-aos="fade-up"
          >
            {props.state.wishes?.map((r) => (
              <div key={r.id} className="flex mb-4">
                <div className="flex-shrink-0">
                  <div className="w-9 h-9 bg-zinc-100 rounded-full flex justify-center items-center text-base font-medium text-aakarshana-primary">
                    <span className={afacad.className}>
                      {getInitial(r.name)}
                    </span>
                  </div>
                </div>

                <div className="ml-4 relative">
                  <div className="p-3 bg-zinc-100 rounded-lg relative">
                    <div className="absolute left-[-8px] top-3 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-zinc-100"></div>

                    <div className="flex items-center gap-x-3">
                      <h1
                        className={`${afacad.className} text-base text-aakarshana-primary font-semibold`}
                      >
                        {r.name}
                      </h1>
                    </div>
                    <p
                      className={`${afacad.className} text-base text-gray-500 leading-5 my-2`}
                    >
                      {r.wishes}
                    </p>
                  </div>

                  <div
                    className={`flex divide-x-[0.5px] divide-aakarshana-gold mt-2 ${afacad.className}`}
                  >
                    <div className="flex gap-1 text-sm text-aakarshana-gold pr-2">
                      <BiTime className="mt-[3px]" />
                      <p>{moment(r.created_at).fromNow()}</p>
                    </div>
                    <div className="flex gap-1 text-sm text-aakarshana-gold pl-2">
                      <BiUser className="mt-[3px]" />
                      <p>{attendantText[r.attendant]}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPWishesComponent;
