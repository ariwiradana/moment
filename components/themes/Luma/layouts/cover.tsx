import { rubik } from "@/lib/fonts";
import { NextPage } from "next";
import ButtonPrimary from "../elements/button.primary";
import { IoMailOpenOutline } from "react-icons/io5";
import { getEventNames } from "@/utils/getEventNames";
import { memo, useMemo, useCallback } from "react";
import useEvents from "@/hooks/themes/useEvents";
import { UseMusic } from "@/hooks/themes/useMusic";
import useCoverStore from "@/store/useCoverStore";

interface Props {
  untuk: string;
  actions: UseMusic["actions"];
}

const Cover: NextPage<Props> = ({ untuk, actions }) => {
  const {
    state: { events },
  } = useEvents();
  const { isOpen, toggleIsOpen } = useCoverStore();

  // Memoize event names supaya tidak dihitung ulang setiap render
  const eventNames = useMemo(() => getEventNames(events), [events]);

  // Memoize click handler supaya tidak membuat fungsi baru setiap render
  const handleOpen = useCallback(() => {
    toggleIsOpen();
    actions.handlePlayPause();
  }, [toggleIsOpen, actions]);

  return (
    <section
      className={`fixed transition-all ease-in-out duration-1000 delay-200 z-30 mx-auto ${
        isOpen ? "-bottom-full inset-x-0 opacity-0" : "inset-0 opacity-100"
      }`}
    >
      <div
        data-aos="fade-up"
        data-aos-delay="800"
        className="h-dvh w-full px-8 py-[60px] flex flex-col justify-end bg-gradient-to-b from-[30%] via-luma-primary/70 from-transparent to-luma-primary"
      >
        <p
          data-aos="fade-up"
          data-aos-delay="1000"
          className={`${rubik.className} text-[10px] md:text-xs lg:text-sm text-center tracking-[1px] font-light text-white`}
        >
          Yth, Bapak / Ibu / Saudara / i
        </p>
        <h5
          data-aos="fade-up"
          data-aos-delay="1200"
          className={`text-xl ${rubik.className} text-white lg:text-2xl text-center mt-2`}
        >
          {untuk}
        </h5>
        <p
          data-aos="fade-up"
          data-aos-delay="1400"
          className={`${rubik.className} text-[10px] max-w-md mx-auto md:text-xs lg:text-sm font-light text-center text-white mt-8 mb-6`}
        >
          Tanpa mengurangi rasa hormat, kami mengundang anda untuk menghadiri
          acara {eventNames} kami.
        </p>
        <div
          className="flex justify-center"
          data-aos="fade-up"
          data-aos-delay="1600"
        >
          <ButtonPrimary
            onClick={handleOpen}
            icon={<IoMailOpenOutline />}
            title="Buka Undangan"
          />
        </div>
      </div>
    </section>
  );
};

export default memo(Cover);
