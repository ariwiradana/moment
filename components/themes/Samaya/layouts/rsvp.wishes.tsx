import React from "react";
import Button from "../elements/button";
import { BiCheck, BiSolidSend, BiTime, BiUser } from "react-icons/bi";
import Input from "../elements/input";
import InputTextarea from "../elements/textarea";
import InputCheckbox from "../elements/checkbox";
import { afacad, marcellus } from "@/lib/fonts";
import { getInitial } from "@/utils/getInitial";
import moment from "moment";
import { Pagination } from "@mui/material";
import useRSVPWishes from "@/hooks/themes/useRSVPWishes";
import useClientStore from "@/store/useClientStore";

const RSVPWishesComponent = () => {
  const { client } = useClientStore();
  const { state, actions } = useRSVPWishes(
    <div className="p-1 rounded bg-samaya-primary">
      <BiCheck />
    </div>
  );

  return (
    <section className="relative bg-samaya-dark w-full overflow-hidden z-20">
      <div
        className="absolute inset-0 bg-repeat opacity-80 md:opacity-35 bg-center"
        style={{
          backgroundImage: "url('/images/samaya/texture.svg')",
        }}
      ></div>
      <div
        data-aos="fade-up"
        className="relative w-full flex flex-col justify-center items-center z-20 py-16 lg:py-24"
      >
        <div className="w-full">
          <h1
            className={`font-tan-pearl text-2xl md:text-3xl text-center text-samaya-primary`}
          >
            Ucapan & Doa
          </h1>
          <p
            className={`${marcellus.className} text-sm md:text-base text-center leading-5 text-white mt-2 mb-16 max-w-screen-sm mx-auto`}
          >
            Bagikan doa dan ucapan kamu untuk kedua mempelai sebagai tanda kasih
            dan kebahagiaan.
          </p>
          <form
            onSubmit={actions.handleSubmit}
            className="flex flex-col gap-4 w-full md:max-w-screen-sm mx-auto px-4"
          >
            <Input
              disabled={client?.status === "completed"}
              error={state.errors.name}
              placeholder="Masukkan nama kamu"
              value={state.formData.name}
              id="name"
              onChange={(e) => actions.handleChange("name", e.target.value)}
            />
            <InputTextarea
              disabled={client?.status === "completed"}
              error={state.errors.wishes}
              placeholder="Masukkan ucapan kamu"
              value={state.formData.wishes}
              id="wishes"
              rows={6}
              onChange={(e) => actions.handleChange("wishes", e.target.value)}
            />
            <div className="flex gap-x-4 justify-between lg:justify-start">
              <InputCheckbox
                disabled={client?.status === "completed"}
                value="Hadir"
                checked={state.formData.attendant === "Hadir"}
                label="Hadir"
                onChange={(e) =>
                  actions.handleChange("attendant", e.target.value)
                }
              />
              <InputCheckbox
                disabled={client?.status === "completed"}
                value="Tidak Hadir"
                checked={state.formData.attendant === "Tidak Hadir"}
                label="Tidak Hadir"
                onChange={(e) =>
                  actions.handleChange("attendant", e.target.value)
                }
              />
              <InputCheckbox
                disabled={client?.status === "completed"}
                checked={state.formData.attendant === "Masih Ragu"}
                value="Masih Ragu"
                label="Masih Ragu"
                onChange={(e) =>
                  actions.handleChange("attendant", e.target.value)
                }
              />
            </div>
            {client?.status === "paid" && (
              <div className="mt-4">
                <Button
                  isLoading={state.loading ? true : false}
                  type="submit"
                  title="Kirim"
                  icon={<BiSolidSend />}
                />
              </div>
            )}
          </form>
          {state.wishes && state.wishes?.length > 0 ? (
            <div className="flex flex-col w-full gap-4 px-4 mt-8" id="wishes">
              <div className="md:max-w-screen-sm mx-auto w-full flex flex-col gap-7 border-t border-t-samaya-primary/50 py-4">
                <p
                  className={`${marcellus.className} text-sm md:text-base leading-5 text-white`}
                >
                  {state.totalRows} Ucapan
                </p>
                {state.wishes?.map((r) => (
                  <div key={r.id} className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-samaya-primary/20 rounded-full flex justify-center items-center text-base font-medium text-samaya-primary">
                        <span className={marcellus.className}>
                          {getInitial(r.name)}
                        </span>
                      </div>
                    </div>

                    <div className="ml-4 relative">
                      <div className="p-3 bg-samaya-primary/20 rounded-lg relative">
                        <div className="absolute left-[-8px] top-3 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-samaya-primary/20"></div>

                        <div className="flex items-center gap-x-3">
                          <div className="flex items-center gap-x-2">
                            <div className="h-[0.5px] w-4 bg-white"></div>
                            <p
                              className={`${marcellus.className} text-white text-base md:text-lg`}
                            >
                              {r.name}
                            </p>
                          </div>
                        </div>
                        <p
                          className={`${afacad.className} text-base text-white leading-5 mt-1`}
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
                          <p>{state.attendantText[r.attendant]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {state.totalRows > state.limit && (
                <div className="md:max-w-screen-sm mx-auto w-full border-t border-t-samaya-primary/50 pt-4">
                  <div className="-ml-4">
                    <Pagination
                      page={state.page}
                      sx={{
                        "& .MuiPaginationItem-root": {
                          color: "#D1CAA1",
                          "&:hover": {
                            backgroundColor: "#D1CAA133",
                            color: "white",
                          },
                        },
                        "& .MuiPaginationItem-page.Mui-selected": {
                          backgroundColor: "#D1CAA133",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#D1CAA133",
                            color: "white",
                          },
                        },
                      }}
                      onChange={actions.handleChangePagination}
                      count={Math.ceil(state.totalRows / state.limit)}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default RSVPWishesComponent;
