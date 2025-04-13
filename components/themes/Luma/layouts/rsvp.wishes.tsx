import React, { FC, memo, useCallback } from "react";
import { BiCheck, BiChevronRight, BiSend, BiTime } from "react-icons/bi";
import { rubik } from "@/lib/fonts";
import { Pagination } from "@mui/material";
import { Review } from "@/lib/types";
import useClientStore from "@/store/useClientStore";
import InputTextarea from "../elements/textarea";
import InputCheckbox from "../elements/checkbox";
import { getInitial } from "@/utils/getInitial";
import moment from "moment";
import Input from "../elements/input";
import useRSVPWishesLimit from "@/hooks/themes/useRSVPWishesLimit";
import ButtonDark from "../elements/button.dark";
import ButtonPrimary from "../elements/button.primary";
import { RotatingLines } from "react-loader-spinner";
import { HiX } from "react-icons/hi";

const WishItem = memo(
  ({
    wish,
    attendantText,
  }: {
    wish: Review;
    attendantText: Record<string, string>;
  }) => (
    <div className="py-4 first:pt-0 first:md:pt-4 last:pb-0 last:md:pb-4">
      <div className="flex items-center gap-x-2">
        <div
          className="w-8 h-8 bg-white aspect-square rounded-full flex justify-center items-center uppercase font-medium text-nirvaya-dark"
          style={{ lineHeight: "none" }}
        >
          <span className={`${rubik.className} text-xs`}>
            {getInitial(wish.name)}
          </span>
        </div>
        <div>
          <h5
            className={`capitalize text-white text-xs leading-5 line-clamp-1 ${rubik.className}`}
          >
            {wish.name}
          </h5>
          <p
            className={`${rubik.className} text-[10px] md:text-xs tracking-[1px] text-white/50`}
          >
            {attendantText[wish.attendant]}
          </p>
        </div>
      </div>
      <p className="text-white tracking-[1px] md:text-xs text-[10px] mt-2">
        {wish.wishes}
      </p>
      <div className="flex items-center gap-x-1 text-white/80 mt-1">
        <BiTime className="text-xs md:text-sm" />
        <p
          className={`${rubik.className} text-[10px] md:text-xs tracking-[1px]`}
        >
          {moment(wish.created_at).fromNow()}
        </p>
      </div>
    </div>
  )
);

WishItem.displayName = "WishItem";

const RSVPWishesComponent: FC = () => {
  const { client } = useClientStore();
  const { state, actions } = useRSVPWishesLimit(
    <div className="p-1 text-sm bg-aruna-dark text-white">
      <BiCheck />
    </div>,
    10
  );
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      actions.handleChange("name", e.target.value);
    },
    [actions]
  );

  const handleWishesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      actions.handleChange("wishes", e.target.value);
    },
    [actions]
  );

  const handleAttendantChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      actions.handleChange("attendant", e.target.value);
    },
    [actions]
  );

  return (
    <>
      <div
        onClick={() => actions.setIsOpen((state) => !state)}
        className={`fixed inset-0 bg-luma-dark/80 z-[999] flex items-end transition-all ease-in-out duration-300 ${
          state.isOpen ? "opacity-100 visible" : "opacity-0 invisible delay-200"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white w-full px-8 py-12 transform transition-all ease-in-out duration-300 ${
            state.isOpen ? "translate-y-0 delay-200" : "translate-y-full"
          }`}
        >
          <button
            onClick={() => actions.setIsOpen(false)}
            className="absolute top-6 right-6 text-luma-dark"
          >
            <HiX />
          </button>
          <h2 className={`text-luma-dark text-2xl mb-4 ${rubik.className}`}>
            Kirim Ucapan
          </h2>

          <form
            onSubmit={actions.handleSubmit}
            className="flex flex-col gap-2 w-full"
          >
            <Input
              label="Nama"
              disabled={client?.status === "completed"}
              error={state.errors.name}
              placeholder="Masukkan nama kamu"
              value={state.formData.name}
              id="name"
              onChange={handleNameChange}
            />
            <InputTextarea
              label="Ucapan"
              disabled
              error={state.errors.wishes}
              placeholder="Masukkan ucapan kamu"
              value={state.formData.wishes}
              id="wishes"
              rows={6}
              onChange={handleWishesChange}
            />
            <div className="flex gap-x-8 justify-between lg:justify-start">
              <InputCheckbox
                disabled={client?.status === "completed"}
                value="Hadir"
                checked={state.formData.attendant === "Hadir"}
                label="Hadir"
                onChange={handleAttendantChange}
              />
              <InputCheckbox
                disabled={client?.status === "completed"}
                value="Tidak Hadir"
                checked={state.formData.attendant === "Tidak Hadir"}
                label="Tidak Hadir"
                onChange={handleAttendantChange}
              />
              <InputCheckbox
                disabled={client?.status === "completed"}
                checked={state.formData.attendant === "Masih Ragu"}
                value="Masih Ragu"
                label="Masih Ragu"
                onChange={handleAttendantChange}
              />
            </div>
            {client?.status === "paid" && (
              <div className="mt-6">
                <ButtonDark
                  isLoading={state.loading}
                  type="submit"
                  title="Kirim"
                  icon={<BiSend />}
                />
              </div>
            )}
          </form>
        </div>
      </div>

      <section className="h-dvh snap-start w-full relative">
        <div className="absolute z-20 inset-0 bg-gradient-to-b from-luma-dark/70 to-luma-primary flex flex-col justify-center items-center">
          <div className="w-full px-8 mb-8">
            <h2 className="font-bigilla leading-[40px] text-white text-4xl mb-2">
              RSVP <span className="font-italic">dan</span> Ucapan
            </h2>
            <ButtonPrimary
              onClick={() => actions.setIsOpen((state) => !state)}
              title="Kirim Ucapan"
              icon={<BiChevronRight />}
            />
          </div>
          <div className="w-full">
            <div>
              {state.wishes.length > 0 && (
                <div className="grid items-start divide-y md:divide-y-0 divide-white/10 max-h-[60vh] overflow-y-auto px-8">
                  {state.wishes.map((wish, index) => (
                    <WishItem
                      key={`ucapan-${index + 1}`}
                      wish={wish}
                      attendantText={state.attendantText}
                    />
                  ))}
                </div>
              )}
              {state.isLoadingWishes && (
                <div className="flex justify-center mt-6">
                  <RotatingLines
                    strokeColor="#ffff"
                    width="16"
                    strokeWidth="3"
                    animationDuration="1"
                    ariaLabel="rotating-lines-loading"
                  />
                </div>
              )}
              {state.totalRows > state.limit && (
                <div className="w-full mt-6">
                  <div className="-ml-2">
                    <Pagination
                      shape="rounded"
                      page={state.page}
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
                      onChange={actions.handleChangePagination}
                      count={Math.ceil(state.totalRows / state.limit)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(RSVPWishesComponent);
