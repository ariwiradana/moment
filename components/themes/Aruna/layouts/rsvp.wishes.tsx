import React, { FC, memo, useCallback, useMemo } from "react";
import {
  BiCheck,
  BiSend,
  BiTime,
  BiUserCheck,
  BiUserPlus,
  BiUserX,
} from "react-icons/bi";
import Input from "../elements/input";
import InputTextarea from "../elements/textarea";
import InputCheckbox from "../elements/checkbox";
import { roboto } from "@/lib/fonts";
import moment from "moment";
import ButtonDark from "../elements/button.dark";
import { Pagination } from "@mui/material";
import { Review } from "@/lib/types";
import useRSVPWishes from "@/hooks/themes/useRSVPWishes";
import useClientStore from "@/store/useClientStore";

const WishItem = memo(
  ({
    wish,
    attendantText,
  }: {
    wish: Review;
    attendantText: Record<string, string>;
  }) => {
    const attendantIcon = useMemo(() => {
      if (wish.attendant === "Hadir")
        return <BiUserCheck className="text-xs md:text-sm" />;
      if (wish.attendant === "Tidak Hadir")
        return <BiUserX className="text-xs md:text-sm" />;
      return <BiUserPlus className="text-xs md:text-sm" />;
    }, [wish.attendant]);

    const timeText = useMemo(
      () => moment(wish.created_at).fromNow(),
      [wish.created_at]
    );

    return (
      <div className="py-6">
        <h4
          className={`${roboto.className} relative text-white text-xs md:text-sm uppercase tracking-[2px] mb-2`}
        >
          {wish.name}
        </h4>
        <p className={`${roboto.className} text-white/60 text-xs md:text-sm`}>
          {wish.wishes}
        </p>
        <div className="flex mt-4 items-center gap-x-4 whitespace-nowrap">
          <div className="flex items-center gap-x-1 text-white/80">
            {attendantIcon}
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
              {timeText}
            </p>
          </div>
          <div className="w-full h-[0.5px] bg-white/20"></div>
        </div>
      </div>
    );
  }
);

WishItem.displayName = "WishItem";

const RSVPWishesComponent: FC = () => {
  const { client } = useClientStore();
  const { state, actions } = useRSVPWishes(
    <div className="p-1 text-sm bg-aruna-dark text-white">
      <BiCheck />
    </div>
  );

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      actions.handleChange("name", e.target.value),
    [actions]
  );
  const handleWishesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      actions.handleChange("wishes", e.target.value),
    [actions]
  );
  const handleAttendantChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      actions.handleChange("attendant", e.target.value),
    [actions]
  );

  const paginationStyles = useMemo(
    () => ({
      "& .MuiPaginationItem-root": {
        color: "white",
        fontSize: 12,
        maxWidth: 24,
        maxHeight: 24,
        minHeight: 24,
        minWidth: 24,
        borderRadius: 0,
        "&:hover": { backgroundColor: "#FFFFFF0D", color: "white" },
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
    }),
    []
  );

  if (!client?.package?.rsvp_and_greetings) return;

  return (
    <section className="relative bg-white w-full overflow-hidden">
      <div className="relative w-full flex flex-col justify-center items-center z-20 pt-[60px] md:pt-[100px]">
        <div className="px-6">
          <p
            className={`${roboto.className} text-[10px] md:text-xs tracking-[1px] text-center text-aruna-dark/80 max-w-screen-sm mb-8`}
            data-aos="fade-up"
          >
            Konfirmasi kehadiran Anda melalui RSVP, dan jangan lupa sampaikan
            doa serta ucapan terbaik untuk pengantin di hari bahagia mereka.
          </p>
          <p
            className={`text-aruna-dark/60 text-[8px] md:text-[10px] uppercase text-center tracking-[6px] ${roboto.className}`}
            data-aos="fade-up"
          >
            RSVP & Ucapan
          </p>
        </div>

        <form
          onSubmit={actions.handleSubmit}
          className="flex flex-col gap-4 w-full md:max-w-screen-sm mx-auto p-6"
          data-aos="fade-up"
        >
          <Input
            disabled={client?.status === "completed"}
            error={state.errors.name}
            placeholder="Masukkan nama kamu"
            value={state.formData.name}
            id="name"
            onChange={handleNameChange}
          />
          <InputTextarea
            disabled={client?.status === "completed"}
            error={state.errors.wishes}
            placeholder="Masukkan ucapan kamu"
            value={state.formData.wishes}
            id="wishes"
            rows={6}
            onChange={handleWishesChange}
          />
          <div className="flex gap-x-8 justify-between lg:justify-start">
            {["Hadir", "Tidak Hadir", "Masih Ragu"].map((val) => (
              <InputCheckbox
                key={val}
                disabled={client?.status === "completed"}
                value={val}
                checked={state.formData.attendant === val}
                label={val}
                onChange={handleAttendantChange}
              />
            ))}
          </div>
          {client?.status === "paid" && (
            <div className="mt-4">
              <ButtonDark
                isLoading={state.loading}
                type="submit"
                title="Kirim"
                icon={<BiSend />}
              />
            </div>
          )}
        </form>

        {state.wishes?.length > 0 && (
          <div className="w-full bg-aruna-dark py-8" data-aos="fade-up">
            <div className="max-w-screen-sm mx-auto w-full px-6">
              {state.wishes.map((wish, index) => (
                <WishItem
                  key={`ucapan-${index + 1}`}
                  wish={wish}
                  attendantText={state.attendantText}
                />
              ))}
            </div>

            {state.totalRows > state.limit && (
              <div className="max-w-screen-sm w-full py-6 px-6">
                <Pagination
                  shape="rounded"
                  page={state.page}
                  sx={paginationStyles}
                  onChange={actions.handleChangePagination}
                  count={Math.ceil(state.totalRows / state.limit)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(RSVPWishesComponent);
