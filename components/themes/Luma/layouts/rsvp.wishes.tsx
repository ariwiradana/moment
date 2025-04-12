import React, { FC, memo, useCallback } from "react";
import { BiCheck, BiSend, BiTime } from "react-icons/bi";
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
    2
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
    <section className="h-dvh snap-start w-full relative">
      <div className="absolute z-20 inset-0 bg-gradient-to-b from-luma-dark/70 to-luma-primary flex flex-col justify-center items-center">
        <div className="w-full px-8 flex items-center justify-between mb-6">
          <h2 className="font-bigilla leading-[40px] text-white text-4xl">
            RSVP <span className="font-italic">dan</span> Ucapan
          </h2>
        </div>
        <form
          onSubmit={actions.handleSubmit}
          className="flex flex-col gap-4 w-full px-8 max-w-screen-lg mx-auto"
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
          <div className="w-full">
            <div className="px-8 mt-12">
              <div className="grid items-start md:grid-cols-2 gap-x-3 md:gap-x-12 divide-y md:divide-y-0 divide-white/10">
                {state.wishes.map((wish, index) => (
                  <WishItem
                    key={`ucapan-${index + 1}`}
                    wish={wish}
                    attendantText={state.attendantText}
                  />
                ))}
              </div>

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
        )}
      </div>
    </section>
  );
};

export default memo(RSVPWishesComponent);
