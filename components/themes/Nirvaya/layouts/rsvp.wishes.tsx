import React, { FC, memo, useCallback } from "react";
import { BiCheck, BiSend, BiTime } from "react-icons/bi";
import { raleway } from "@/lib/fonts";
import { Pagination } from "@mui/material";
import { Wish } from "@/lib/types";
import useRSVPWishes from "@/hooks/themes/useRSVPWishes";
import useClientStore from "@/store/useClientStore";
import Input from "../elements/input";
import InputTextarea from "../elements/textarea";
import InputCheckbox from "../elements/checkbox";
import Button from "../elements/button";
import { getInitial } from "@/utils/getInitial";
import moment from "moment";

const WishItem = memo(
  ({
    wish,
    attendantText,
  }: {
    wish: Wish;
    attendantText: Record<string, string>;
  }) => {
    return (
      <div className="py-4 first:pt-0 first:md:pt-4 last:pb-0 last:md:pb-4">
        <div className="flex items-center gap-x-2">
          <div
            className="w-8 h-8 lg:w-10 lg:h-10 bg-white aspect-square rounded-full flex justify-center items-center uppercase font-medium text-nirvaya-dark"
            style={{ lineHeight: "none" }}
          >
            <span className={`${raleway.className} text-xs lg:text-base`}>
              {getInitial(wish.name ?? "")}
            </span>
          </div>
          <div>
            <h3
              className={`capitalize text-white text-sm lg:text-base leading-5 line-clamp-1 ${raleway.className}`}
            >
              {wish.name ?? "-"}
            </h3>
            <p
              className={`${raleway.className} text-[10px] md:text-xs lg:text-sm tracking-[1px] text-white/50`}
            >
              {attendantText[wish.attendant ?? ""] ?? "-"}
            </p>
          </div>
        </div>
        <p className="text-white tracking-[1px] md:text-xs text-[10px] lg:text-sm mt-2">
          {wish.wishes ?? "-"}
        </p>
        <div className="flex items-center gap-x-1 text-white/80 mt-1">
          <BiTime className="text-xs md:text-sm lg:text-base" />
          <p
            className={`${raleway.className} text-[10px] md:text-xs lg:text-sm lg:mt-1 tracking-[1px]`}
          >
            {wish.created_at ? moment(wish.created_at).fromNow() : "-"}
          </p>
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

  const handleChange = useCallback(
    (field: "name" | "wishes" | "attendant") =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        actions.handleChange(field, e.target.value);
      },
    [actions]
  );

  if (!client?.package?.rsvp_and_greetings) return;

  const isDisabled = client?.status === "inactive" || client.status === "done";

  return (
    <section className="relative bg-nirvaya-dark w-full overflow-hidden">
      <div className="relative w-full flex flex-col justify-center items-center z-20 pt-16 md:pb-16">
        {/* Header */}
        <div
          data-aos="fade-up"
          className={`flex flex-col md:flex-row items-center gap-x-6 w-full px-8 max-w-screen-lg mx-auto ${raleway.className}`}
        >
          <div className="flex justify-between items-center gap-x-6 md:gap-x-12 w-full">
            <h2 className="text-white text-4xl md:text-6xl font-edensor whitespace-nowrap leading-8">
              RSVP <span className="italic">dan</span> Ucapan
            </h2>
            <div className="h-[1px] bg-white/10 w-full"></div>
          </div>
          <p className="text-white/50 md:text-right tracking-[2px] md:text-xs lg:text-sm text-[10px] pr-8 md:pr-0 mt-2 max-w-[400px]">
            Konfirmasi kehadiran Anda melalui RSVP, dan jangan lupa sampaikan
            doa serta ucapan terbaik untuk pengantin di hari bahagia mereka.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={actions.handleSubmit}
          className="flex flex-col gap-4 w-full mt-8 md:mt-16 px-8 max-w-screen-lg mx-auto"
          data-aos="fade-up"
        >
          <Input
            disabled={isDisabled}
            error={state.errors.name}
            placeholder="Masukkan nama kamu"
            value={state.formData.name ?? ""}
            id="name"
            onChange={handleChange("name")}
          />
          <InputTextarea
            disabled={isDisabled}
            error={state.errors.wishes}
            placeholder="Masukkan ucapan kamu"
            value={state.formData.wishes ?? ""}
            id="wishes"
            rows={6}
            onChange={handleChange("wishes")}
          />
          <div className="flex gap-x-8 justify-between lg:justify-start">
            {["Hadir", "Tidak Hadir", "Masih Ragu"].map((option) => (
              <InputCheckbox
                key={option}
                disabled={isDisabled}
                value={option}
                checked={state.formData.attendant === option}
                label={option}
                onChange={handleChange("attendant")}
              />
            ))}
          </div>
          {client?.status === "active" && (
            <div className="mt-4">
              <Button
                isLoading={state.loading}
                type="submit"
                title="Kirim"
                icon={<BiSend />}
              />
            </div>
          )}
        </form>

        {/* Wishes List */}
        {state.wishes?.length > 0 && (
          <div data-aos="fade-up" className="w-full">
            <div className="bg-nirvaya-primary p-6 md:px-8 md:py-4 mt-16">
              <div className="grid items-start md:grid-cols-2 gap-x-3 md:gap-x-12 divide-y md:divide-y-0 divide-white/10">
                {state.wishes.map((wish, index) => (
                  <WishItem
                    key={wish.id ?? `ucapan-${index}`}
                    wish={wish}
                    attendantText={state.attendantText}
                  />
                ))}
              </div>

              {/* Pagination */}
              {state.totalRows > state.limit && (
                <div className="w-full mt-6">
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
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(RSVPWishesComponent);
