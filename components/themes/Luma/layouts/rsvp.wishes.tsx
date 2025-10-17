import React, { FC, memo, useCallback, useMemo } from "react";
import { BiCheck, BiChevronRight, BiSend, BiTime } from "react-icons/bi";
import { rubik } from "@/lib/fonts";
import { Wish } from "@/lib/types";
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

// Memoized Wish Item
const WishItem = memo(
  ({
    wish,
    attendantText,
  }: {
    wish: Wish;
    attendantText: Record<string, string>;
  }) => {
    const timeFromNow = useMemo(
      () => moment(wish.created_at).fromNow(),
      [wish.created_at]
    );

    return (
      <div
        className="py-2 lg:py-4 first:pt-0 last:pb-0 first:lg:pt-4 last:lg:pb-4"
        aria-label={`Ucapan dari ${wish.name}`}
      >
        <div className="flex items-center gap-x-2 lg:gap-x-3">
          <div
            className="w-8 h-8 lg:w-10 lg:h-10 bg-white aspect-square rounded-full flex justify-center items-center uppercase font-medium text-nirvaya-dark"
            style={{ lineHeight: "none" }}
          >
            <span className={`${rubik.className} text-xs lg:text-sm`}>
              {getInitial(wish.name)}
            </span>
          </div>
          <div>
            <h5
              className={`capitalize text-white text-xs lg:text-base leading-5 line-clamp-1 ${rubik.className}`}
            >
              {wish.name}
            </h5>
            <p
              className={`${rubik.className} text-[10px] md:text-xs lg:text-sm tracking-[1px] text-white/50`}
            >
              {attendantText[wish.attendant]}
            </p>
          </div>
        </div>
        <p className="text-white tracking-[1px] md:text-xs text-[10px] lg:text-sm mt-2">
          {wish.wishes}
        </p>
        <div className="flex items-center gap-x-1 text-white/80 mt-1">
          <BiTime className="text-xs md:text-sm" />
          <p
            className={`${rubik.className} text-[10px] md:text-xs lg:text-sm lg:mt-1 tracking-[1px]`}
          >
            {timeFromNow}
          </p>
        </div>
      </div>
    );
  }
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

  const totalPages = useMemo(
    () => Math.ceil(state.totalRows / state.limit),
    [state.totalRows, state.limit]
  );

  return (
    <>
      {/* Modal Form */}
      <div
        onClick={() => actions.setIsOpen((state) => !state)}
        className={`fixed inset-0 bg-luma-dark/80 z-[100] flex items-center px-4 justify-center transition-all ease-in-out duration-300 ${
          state.isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-hidden={!state.isOpen}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white w-full md:w-auto md:min-w-[40vw] p-8 transform transition-all ease-in-out duration-300 ${
            state.isOpen ? "translate-y-0" : "translate-y-8"
          }`}
        >
          <button
            onClick={() => actions.setIsOpen(false)}
            className="absolute top-6 right-6 text-luma-dark"
            aria-label="Tutup form kirim ucapan"
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
              disabled={client?.status === "inactive"}
              error={state.errors.name}
              placeholder="Masukkan nama kamu"
              value={state.formData.name}
              id="name"
              onChange={handleNameChange}
            />
            <InputTextarea
              label="Ucapan"
              disabled={client?.status === "inactive"}
              error={state.errors.wishes}
              placeholder="Masukkan ucapan kamu"
              value={state.formData.wishes}
              id="wishes"
              rows={6}
              onChange={handleWishesChange}
            />
            <div className="flex gap-x-4 justify-between lg:justify-start">
              {["Hadir", "Tidak Hadir", "Masih Ragu"].map((value) => (
                <InputCheckbox
                  key={value}
                  disabled={client?.status === "inactive"}
                  value={value}
                  checked={state.formData.attendant === value}
                  label={value}
                  onChange={handleAttendantChange}
                />
              ))}
            </div>
            {client?.status === "active" && (
              <div className="mt-6">
                <ButtonDark
                  isLoading={state.loading}
                  type="submit"
                  title="Kirim"
                  icon={<BiSend />}
                  aria-label="Kirim ucapan"
                />
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Wishes Section */}
      <section className="h-dvh snap-start w-full relative">
        <div className="absolute z-20 inset-0 bg-gradient-to-b from-luma-dark/80 to-luma-primary/95 flex flex-col justify-center items-center py-10">
          <div
            className={`w-full px-6 mb-8 lg:mb-12 ${
              state.wishes.length > 0 ? "text-left" : "text-center"
            }`}
          >
            <h2
              className="font-bigilla leading-[40px] lg:text-center text-white text-[40px] md:text-5xl lg:text-7xl mb-2"
              aria-label="Judul RSVP dan Ucapan"
            >
              RSVP <span className="font-italic">dan</span> Ucapan
            </h2>
            <div
              className={`flex lg:justify-center ${
                state.wishes.length > 0 ? "justify-left" : "justify-center"
              }`}
            >
              <ButtonPrimary
                onClick={() => actions.setIsOpen((state) => !state)}
                title="Kirim Ucapan"
                icon={<BiChevronRight />}
                aria-label="Buka form kirim ucapan"
              />
            </div>
          </div>

          <div className="w-full mx-auto px-6 max-w-4xl lg:columns-2 gap-4">
            {state.isLoadingWishes && (
              <div
                className="flex justify-center mb-4"
                aria-label="Loading ucapan"
              >
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
              <div
                key={wish.id || `ucapan-${index + 1}`}
                className="break-inside-avoid mb-4 lg:mb-0"
              >
                <WishItem wish={wish} attendantText={state.attendantText} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div
              className="flex items-center gap-4 mt-6 lg:mt-10"
              aria-label="Navigasi halaman ucapan"
            >
              <button
                disabled={state.page === 1}
                onClick={() => actions.setPage((state) => state - 1)}
                className="p-2 rounded-full border lg:text-lg border-white/50 text-white aspect-square disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Halaman sebelumnya"
              >
                <HiArrowLeft />
              </button>
              <p
                className={`text-white/70 text-[8px] md:text-[10px] lg:text-sm uppercase text-center tracking-[3px] ${rubik.className}`}
                aria-label={`Halaman ${state.page} dari ${totalPages}`}
              >
                {state.page} / {totalPages}
              </p>
              <button
                disabled={state.page === totalPages}
                onClick={() => actions.setPage((state) => state + 1)}
                className="p-2 rounded-full border lg:text-lg border-white/50 text-white aspect-square disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Halaman berikutnya"
              >
                <HiArrowRight />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default memo(RSVPWishesComponent);
