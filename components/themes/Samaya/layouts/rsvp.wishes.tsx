import React, { FC } from "react";
import Button from "../elements/button";
import { BiSolidSend, BiTime, BiUser } from "react-icons/bi";
import { useSamaya } from "@/hooks/themes/useSamaya";
import Input from "../elements/input";
import InputTextarea from "../elements/textarea";
import InputCheckbox from "../elements/checkbox";
import { afacad, marcellus, windsong } from "@/lib/fonts";
import { getInitial } from "@/utils/getInitial";
import moment from "moment";

interface Props {
  state: useSamaya["state"];
  actions: useSamaya["actions"];
}

const RSVPWishesComponent: FC<Props> = (props) => {
  const attendantText: Record<string, string> = {
    Hadir: "Saya akan hadir",
    "Tidak Hadir": "Maaf saya tidak bisa hadir",
    "Masih Ragu": "Maaf saya masih ragu",
  };
  return (
    <section className="relative bg-samaya-dark w-full">
      <div
        className="relative w-full flex flex-col justify-center items-center z-20"
        data-aos="fade-up"
      >
        <div className="w-full">
          <div className="text-center" data-aos="fade-up">
            <h1
              className={`${marcellus.className} text-white text-4xl lg:text-5xl mr-8`}
            >
              RSVP &
            </h1>
            <h1
              className={`${windsong.className} text-samaya-primary text-5xl lg:text-6xl transform -translate-y-3`}
            >
              Ucapan
            </h1>
          </div>
          <form
            onSubmit={props.actions.handleSubmit}
            className="flex flex-col gap-4 w-full px-6 py-12 max-w-screen-xl mx-auto"
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
            className="flex flex-col w-full max-h-[25rem] gap-4 overflow-y-auto bg-samaya-primary bg-opacity-10 px-6 py-12"
            data-aos="fade-up"
          >
            <div className="max-w-screen-xl mx-auto w-full">
              {props.state.reviews?.map((r) => (
                <div key={r.id} className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-9 h-9 bg-samaya-dark rounded-full flex justify-center items-center text-sm font-medium text-samaya-primary">
                      <span className={marcellus.className}>
                        {getInitial(r.name)}
                      </span>
                    </div>
                  </div>

                  <div className="ml-4 relative">
                    <div className="p-3 bg-samaya-dark rounded-lg relative">
                      <div className="absolute left-[-8px] top-3 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-samaya-dark"></div>

                      <div className="flex items-center gap-x-3">
                        <h1
                          className={`${marcellus.className} text-base text-samaya-primary font-semibold`}
                        >
                          {r.name}
                        </h1>
                      </div>
                      <p
                        className={`${afacad.className} text-base text-white leading-5 my-2`}
                      >
                        {r.wishes}
                      </p>
                    </div>

                    <div
                      className={`flex divide-x-[0.5px] divide-samaya-primary mt-2 ${afacad.className}`}
                    >
                      <div className="flex gap-1 text-sm text-samaya-primary pr-2">
                        <BiTime className="mt-[3px]" />
                        <p>{moment(r.created_at).fromNow()}</p>
                      </div>
                      <div className="flex gap-1 text-sm text-samaya-primary pl-2">
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
      </div>
    </section>
  );
};

export default RSVPWishesComponent;
