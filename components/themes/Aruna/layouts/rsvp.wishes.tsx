import React, { FC } from "react";
import Button from "../elements/button";
import { BiSend, BiTime, BiUser } from "react-icons/bi";
import { useAruna } from "@/hooks/themes/useAruna";
import Input from "../elements/input";
import InputTextarea from "../elements/textarea";
import InputCheckbox from "../elements/checkbox";
import { balthazar, italiana } from "@/lib/fonts";
import { getInitial } from "@/utils/getInitial";
import moment from "moment";

interface Props {
  state: useAruna["state"];
  actions: useAruna["actions"];
}

const RSVPWishesComponent: FC<Props> = (props) => {
  const attendantText: Record<string, string> = {
    Hadir: "Saya akan hadir",
    "Tidak Hadir": "Maaf saya tidak bisa hadir",
    "Masih Ragu": "Maaf saya masih ragu",
  };
  return (
    <section className="relative bg-white w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-repeat bg-center"
        style={{
          backgroundImage: "url('/images/nirvaya/texture.svg')",
        }}
      ></div>
      <div className="relative w-full flex flex-col justify-center items-center z-20 py-[60px] md:py-[100px]">
        <h1
          data-aos="fade-up"
          className={`${italiana.className} text-4xl md:text-5xl text-center text-nirvaya-dark px-8`}
        >
          RSVP & Ucapan
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className={`${balthazar.className} text-sm md:text-base text-nirvaya-dark/80 px-8 mt-1 mb-8 md:mb-12 text-center max-w-screen-sm mx-auto`}
        >
          Bagikan doa dan ucapan kamu untuk kedua mempelai sebagai tanda kasih
          dan kebahagiaan.
        </p>
        <form
          onSubmit={props.actions.handleSubmit}
          className="flex flex-col gap-4 w-full md:max-w-screen-sm mx-auto px-8"
          data-aos="fade-up"
        >
          <Input
            error={props.state.errors.name}
            placeholder="Masukkan nama kamu"
            value={props.state.formData.name}
            id="name"
            onChange={(e) => props.actions.handleChange("name", e.target.value)}
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
          {props.state.client?.status === "paid" && (
            <div className="mt-4">
              <Button
                isLoading={props.state.loading ? true : false}
                type="submit"
                title="Kirim"
                icon={<BiSend />}
              />
            </div>
          )}
        </form>

        {props.state.wishes && props.state.wishes?.length > 0 ? (
          <div
            className="flex flex-col w-full gap-4 max-h-[440px] overflow-y-auto mt-12 px-8"
            data-aos="fade-up"
          >
            <div className="md:max-w-screen-sm mx-auto w-full flex flex-col gap-5">
              {props.state.wishes?.map((r) => (
                <div key={r.id} className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-9 h-9 bg-nirvaya-dark rounded-full flex justify-center items-center text-base font-medium text-white">
                      <span className={italiana.className}>
                        {getInitial(r.name)}
                      </span>
                    </div>
                  </div>

                  <div className="ml-4 relative">
                    <div className="p-4 bg-nirvaya-dark rounded-lg relative">
                      <div className="absolute left-[-8px] top-3 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-samaya-dark"></div>
                      <div className="flex items-center gap-x-3">
                        <div className="flex items-center gap-x-2">
                          <div className="h-[0.5px] w-4 bg-white"></div>
                          <p
                            className={`${balthazar.className} text-white text-base md:text-lg`}
                          >
                            {r.name}
                          </p>
                        </div>
                      </div>
                      <p
                        className={`${balthazar.className} text-sm md:text-base text-gray-100 leading-5 mt-1`}
                      >
                        {r.wishes}
                      </p>
                    </div>

                    <div
                      className={`flex divide-x-[0.5px] divide-nirvaya-dark mt-2 ${balthazar.className}`}
                    >
                      <div className="flex gap-1 text-sm md:text-base text-nirvaya-dark pr-2">
                        <BiTime className="mt-[3px]" />
                        <p>{moment(r.created_at).fromNow()}</p>
                      </div>
                      <div className="flex gap-1 text-sm md:text-base text-nirvaya-dark pl-2">
                        <BiUser className="mt-[3px]" />
                        <p>{attendantText[r.attendant]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default RSVPWishesComponent;
