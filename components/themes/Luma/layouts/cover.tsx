import { rubik } from "@/lib/fonts";
import { NextPage } from "next";
import ButtonPrimary from "../elements/button.primary";
import { IoMailOpenOutline } from "react-icons/io5";
import { getEventNames } from "@/utils/getEventNames";
import { useMemo } from "react";
import useEvents from "@/hooks/themes/useEvents";
import { UseMusic } from "@/hooks/themes/useMusic";
import useCoverStore from "@/store/useCoverStore";

interface Props {
  untuk: string;
  actions: UseMusic["actions"];
}

const CoverComponent: NextPage<Props> = ({ untuk, actions }) => {
  const {
    state: { events },
  } = useEvents();
  const { isOpen, toggleIsOpen } = useCoverStore();

  const eventNames = useMemo(() => getEventNames(events), [events]);

  return (
    <section
      className={`fixed transition-all ease-in-out duration-1000 delay-200 z-30 ${
        isOpen ? "-bottom-full inset-x-0 opacity-0" : "inset-0 opacity-100"
      }`}
    >
      <div
        data-aos="fade-up"
        data-aos-delay="800"
        className="h-dvh w-full px-8 py-[60px] flex flex-col justify-end bg-gradient-to-b from-[20%] via-luma-primary/95 from-transparent to-luma-primary"
      >
        <p
          data-aos="fade-up"
          data-aos-delay="1000"
          className={`mt-3 ${rubik.className} text-[10px] md:text-xs font-light text-white`}
        >
          Yth. Bapak / Ibu / Saudara / i
        </p>
        <h5
          data-aos="fade-up"
          data-aos-delay="1200"
          className={`mt-2 ${rubik.className} text-white`}
        >
          {untuk}
        </h5>
        <p
          data-aos="fade-up"
          data-aos-delay="1400"
          className={`${rubik.className} text-[10px] md:text-xs font-light text-white my-9`}
        >
          Tanpa mengurangi rasa hormat, kami mengundang anda untuk menghadiri
          acara {eventNames} kami.
        </p>
        <div data-aos="fade-up" data-aos-delay="1600">
          <ButtonPrimary
            onClick={() => {
              toggleIsOpen();
              actions.handlePlayPause();
            }}
            icon={<IoMailOpenOutline />}
            title="Buka Undangan"
          />
        </div>
      </div>
    </section>
  );
};

export default CoverComponent;
