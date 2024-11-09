import React, { FC } from "react";
import {
  BiSend,
  BiTime,
  BiUserCheck,
  BiUserPlus,
  BiUserX,
} from "react-icons/bi";
import { useAruna } from "@/hooks/themes/useAruna";
import Input from "../elements/input";
import InputTextarea from "../elements/textarea";
import InputCheckbox from "../elements/checkbox";
import { roboto } from "@/lib/fonts";
import moment from "moment";
import ButtonDark from "../elements/button.dark";
import { Pagination } from "@mui/material";

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
      <div className="relative w-full flex flex-col justify-center items-center z-20 pt-[60px] md:pt-[100px]">
        <div className="px-8">
          <h2
            data-aos="fade-up"
            className="font-high-summit text-4xl md:text-5xl text-aruna-dark text-center whitespace-nowrap"
          >
            Mohon Doa Restu
          </h2>
          <p
            data-aos="fade-up"
            className={`${roboto.className} text-xs md:text-sm text-center text-aruna-dark/80 max-w-screen-sm my-8`}
          >
            Konfirmasi kehadiran Anda melalui RSVP, dan jangan lupa sampaikan
            doa serta ucapan terbaik untuk pengantin di hari bahagia mereka.
          </p>
          <p
            data-aos="fade-up"
            className={`text-aruna-dark/60 text-[8px] md:text-[10px] uppercase text-center tracking-[6px] ${roboto.className}`}
          >
            RSVP & Ucapan
          </p>
        </div>
        <form
          onSubmit={props.actions.handleSubmit}
          className="flex flex-col gap-4 w-full md:max-w-screen-sm mx-auto p-8"
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
          <div className="flex gap-x-8 justify-between lg:justify-start">
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
              <ButtonDark
                isLoading={props.state.loading ? true : false}
                type="submit"
                title="Kirim"
                icon={<BiSend />}
              />
            </div>
          )}
        </form>

        {props.state.wishes && props.state.wishes?.length > 0 ? (
          <div className="w-full bg-aruna-dark py-8" data-aos="fade-up">
            <div className="max-w-screen-sm mx-auto w-full px-8">
              {props.state.wishes.map((wish, index) => (
                <div key={`ucapan-${index + 1}`} className="py-6">
                  <div className="relative flex flex-col items-start">
                    <h4
                      className={`${roboto.className} relative text-white text-xs md:text-sm uppercase tracking-[2px] mb-2`}
                    >
                      {wish.name}
                    </h4>
                  </div>
                  <p
                    className={`${roboto.className} text-white/60 text-xs md:text-sm`}
                  >
                    {wish.wishes}
                  </p>
                  <div className="flex mt-4 items-center gap-x-4 whitespace-nowrap">
                    <div className="flex items-center gap-x-1 text-white/80">
                      {wish.attendant === "Hadir" ? (
                        <BiUserCheck className="text-xs md:text-sm" />
                      ) : wish.attendant === "Tidak Hadir" ? (
                        <BiUserX className="text-xs md:text-sm" />
                      ) : (
                        <BiUserPlus className="text-xs md:text-sm" />
                      )}
                      <p
                        className={`${roboto.className} text-[10px] md:text-xs tracking-[1px]`}
                      >
                        {attendantText[wish.attendant]}
                      </p>
                    </div>
                    <div className="w-[2px] min-w-[2px] h-[2px] min-h-[2px] rounded-full bg-white/80"></div>
                    <div className="flex items-center gap-x-1 text-white/80">
                      <BiTime className="text-xs md:text-sm" />
                      <p
                        className={`${roboto.className} text-[10px] md:text-xs tracking-[1px]`}
                      >
                        {moment(wish.created_at).fromNow()}
                      </p>
                    </div>
                    <div className="w-full h-[0.5px] bg-white/20"></div>
                  </div>
                </div>
              ))}
            </div>

            {props.state.totalRows > props.state.limit && (
              <div className="max-w-screen-sm w-full py-6 px-8">
                <div className="-ml-2">
                  <Pagination
                    shape="rounded"
                    page={props.state.page}
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: "white",
                        fontSize: 12,
                        maxWidth: 24,
                        maxHeight: 24,
                        minHeight: 24,
                        minWidth: 24,
                        borderRadius: 0,
                        "&:hover": {
                          backgroundColor: "#FFFFFF0D",
                          color: "white",
                        },
                      },
                      "& .MuiPaginationItem-page.Mui-selected": {
                        backgroundColor: "#FFFFFF0D",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#FFFFFF0D",
                          color: "white",
                          cursor: "default",
                        },
                      },
                    }}
                    onChange={props.actions.handleChangePagination}
                    count={Math.ceil(props.state.totalRows / props.state.limit)}
                  />
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default RSVPWishesComponent;
