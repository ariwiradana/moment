import React, { FC, memo, useCallback } from "react";
import { BiCheck, BiChevronRight, BiSend, BiTime } from "react-icons/bi";
import { rubik } from "@/lib/fonts";
import { Review } from "@/lib/types";
import useClientStore from "@/store/useClientStore";
import InputTextarea from "../elements/textarea";
import InputCheckbox from "../elements/checkbox";
import { getInitial } from "@/utils/getInitial";
import moment from "moment";
import Input from "../elements/input";
import ButtonDark from "../elements/button.dark";
import ButtonPrimary from "../elements/button.primary";
import { HiX } from "react-icons/hi";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import useRSVPWishesLimit from "@/hooks/themes/useRSVPWishesLimit";
import { RotatingLines } from "react-loader-spinner";

const WishItem = memo(
  ({
    wish,
    attendantText,
  }: {
    wish: Review;
    attendantText: Record<string, string>;
  }) => (
    <div className="py-2 first:pt-0 last:pb-0">
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
    4
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
      {/* Modal Form */}
      <div
        onClick={() => actions.setIsOpen((state) => !state)}
        className={`fixed inset-0 bg-luma-dark/80 z-[999] flex items-end md:items-center md:justify-center transition-all ease-in-out duration-300 ${
          state.isOpen ? "opacity-100 visible" : "opacity-0 invisible delay-200"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white w-full md:w-auto md:min-w-[40vw] p-8 transform transition-all ease-in-out duration-300 ${
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
              disabled={client?.status === "completed"}
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

      {/* Wishes Section */}
      <section className="h-dvh snap-start w-full relative">
        <div className="absolute z-20 inset-0 bg-luma-dark/80 flex flex-col justify-center items-center py-10">
          <div
            className={`w-full px-8 mb-8 ${
              state.wishes.length > 0 ? "text-left" : "text-center"
            }`}
          >
            <h2 className="font-bigilla leading-[40px] text-white text-4xl mb-2">
              RSVP <span className="font-italic">dan</span> Ucapan
            </h2>
            {state.wishes.length === 0 && (
              <p
                className={`${rubik.className} text-[10px] md:text-xs font-light text-white mb-4`}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt harum soluta aut blanditiis non veniam quidem maxime
                molestiae voluptatum fugiat?
              </p>
            )}
            <div
              className={`flex ${
                state.wishes.length > 0 ? "justify-left" : "justify-center"
              }`}
            >
              <ButtonPrimary
                onClick={() => actions.setIsOpen((state) => !state)}
                title="Kirim Ucapan"
                icon={<BiChevronRight />}
              />
            </div>
          </div>

          <div className="w-full px-8">
            {state.isLoadingWishes && (
              <div className="flex justify-center">
                <RotatingLines
                  strokeColor="#fff"
                  width="16"
                  strokeWidth="3"
                  animationDuration="1"
                  ariaLabel="rotating-lines-loading"
                />
              </div>
            )}
            {state.wishes.map((wish, index) => (
              <WishItem
                key={`ucapan-${index + 1}`}
                wish={wish}
                attendantText={state.attendantText}
              />
            ))}
          </div>
          {state.totalRows > 0 &&
          Math.ceil(state.totalRows / state.limit) > state.page ? (
            <div className="flex items-center gap-4 mt-6">
              <button
                disabled={state.page === 1}
                onClick={() => actions.setPage((state) => state - 1)}
                className="p-2 rounded-full border border-white/50 text-white aspect-square disabled:opacity-50 disabled:pointer-events-none"
              >
                <HiArrowLeft />
              </button>
              <p
                className={`text-white/70 text-[8px] md:text-[10px] uppercase text-center tracking-[3px] ${rubik.className}`}
              >
                {state.page} / {Math.ceil(state.totalRows / state.limit)}
              </p>
              <button
                disabled={
                  state.page === Math.ceil(state.totalRows / state.limit)
                }
                onClick={() => actions.setPage((state) => state + 1)}
                className="p-2 rounded-full border border-white/50 text-white aspect-square disabled:opacity-50 disabled:pointer-events-none"
              >
                <HiArrowRight />
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default memo(RSVPWishesComponent);
