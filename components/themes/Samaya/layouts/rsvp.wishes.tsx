"use client";
import React, { memo } from "react";
import { BiCheck, BiSolidSend, BiTime, BiUser } from "react-icons/bi";
import Input from "../elements/input";
import InputTextarea from "../elements/textarea";
import { raleway } from "@/lib/fonts";
import { getInitial } from "@/utils/getInitial";
import moment from "moment";
import { Pagination } from "@mui/material";
import useRSVPWishes from "@/hooks/themes/useRSVPWishes";
import useClientStore from "@/store/useClientStore";
import ButtonDark from "../elements/button.dark";
import InputCheckbox from "../elements/checkbox";

const RSVPWishesComponent = () => {
  const { client } = useClientStore();
  const { state, actions } = useRSVPWishes(
    <div className="p-1 rounded bg-samaya-primary">
      <BiCheck />
    </div>
  );

  if (!client) return null;

  return (
    <section className="relative bg-white w-full overflow-hidden z-20">
      <div className="max-w-screen-sm mx-auto relative flex flex-col justify-center items-center w-full z-20 pb-[60px] md:pb-[100px] px-6 md:px-12 lg:px-4">
        <div className="w-full">
          {/* --- Form Input --- */}
          <form
            data-aos="fade-up"
            onSubmit={actions.handleSubmit}
            className="flex flex-col gap-4 w-full"
          >
            <Input
              placeholder="Masukkan nama kamu"
              disabled={client.status === "completed"}
              error={state.errors.name}
              value={state.formData.name}
              id="name"
              onChange={(e) => actions.handleChange("name", e.target.value)}
            />
            <InputTextarea
              placeholder="Masukkan ucapan kamu"
              disabled={client.status === "completed"}
              error={state.errors.wishes}
              value={state.formData.wishes}
              id="wishes"
              rows={6}
              onChange={(e) => actions.handleChange("wishes", e.target.value)}
            />

            {/* --- Attendance Options --- */}
            <div className="flex gap-x-4 justify-between lg:justify-start">
              {["Hadir", "Tidak Hadir", "Masih Ragu"].map((val) => (
                <InputCheckbox
                  key={val}
                  disabled={client.status === "completed"}
                  value={val}
                  checked={state.formData.attendant === val}
                  label={val}
                  onChange={(e) =>
                    actions.handleChange("attendant", e.target.value)
                  }
                />
              ))}
            </div>

            {client.status === "paid" && (
              <div className="mt-4">
                <ButtonDark
                  isLoading={!!state.loading}
                  type="submit"
                  title="Kirim"
                  icon={<BiSolidSend />}
                />
              </div>
            )}
          </form>

          {/* --- Wishes List --- */}
          {state.wishes && state.wishes.length > 0 && (
            <div
              data-aos="fade-up"
              className="flex flex-col w-full gap-4 mt-8"
              id="wishes"
            >
              <div className="w-full flex flex-col gap-7 border-t border-t-samaya-dark/50 py-4">
                <p
                  className={`${raleway.className} text-[10px] md:text-xs uppercase tracking-[2px] text-samaya-dark font-medium`}
                >
                  {state.totalRows} Ucapan
                </p>

                {state.wishes.map((r) => (
                  <div key={r.id} className="flex">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 border border-samaya-dark/10 rounded-full flex justify-center items-center uppercase font-medium text-samaya-dark">
                        <span className="font-tan-pearl">
                          {getInitial(r.name)}
                        </span>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="ml-4 relative">
                      <div className="p-3 bg-samaya-dark rounded-lg relative">
                        <div className="absolute left-[-8px] top-3 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-samaya-dark" />
                        <div className="flex items-center gap-x-3">
                          <div className="flex items-center gap-x-2">
                            <div className="h-[0.5px] w-4 bg-white" />
                            <p
                              className={`${raleway.className} text-white text-sm md:text-base`}
                            >
                              {r.name}
                            </p>
                          </div>
                        </div>
                        <p
                          className={`${raleway.className} text-[10px] md:text-xs text-white mt-1`}
                        >
                          {r.wishes}
                        </p>
                      </div>

                      <div
                        className={`flex divide-x divide-samaya-dark/10 mt-2 ${raleway.className}`}
                      >
                        <div className="flex gap-1 text-[10px] md:text-xs text-samaya-dark pr-2">
                          <BiTime className="mt-[3px]" />
                          <p>{moment(r.created_at).fromNow()}</p>
                        </div>
                        <div className="flex gap-1 text-[10px] md:text-xs text-samaya-dark pl-2">
                          <BiUser className="mt-[3px]" />
                          <p>{state.attendantText[r.attendant]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* --- Pagination --- */}
              {state.totalRows > state.limit && (
                <div className="w-full border-t border-t-samaya-dark/10 pt-4">
                  <div className="-ml-4">
                    <Pagination
                      page={state.page}
                      count={Math.ceil(state.totalRows / state.limit)}
                      onChange={actions.handleChangePagination}
                      sx={{
                        "& .MuiPaginationItem-root": {
                          color: "#101010",
                          "&:hover": {
                            backgroundColor: "#10101033",
                            color: "white",
                          },
                        },
                        "& .MuiPaginationItem-page.Mui-selected": {
                          backgroundColor: "#10101033",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#10101033",
                            color: "white",
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(RSVPWishesComponent);
