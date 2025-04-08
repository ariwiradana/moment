import useParticipants from "@/hooks/themes/useParticipants";
import { rubik } from "@/lib/fonts";
import useClientStore from "@/store/useClientStore";
import { NextPage } from "next";
import Image from "next/image";
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
  const { client } = useClientStore();
  const {
    state: { bride, groom },
  } = useParticipants();
  const {
    state: { events },
  } = useEvents();
  const { isOpen, toggleIsOpen } = useCoverStore();

  const eventNames = useMemo(() => getEventNames(events), [events]);

  return (
    <section
      className={`fixed transition-all ease-in-out duration-1000 delay-500 z-30 ${
        isOpen ? "-top-full inset-x-0" : "inset-0"
      }`}
    >
      <div data-aos="zoom-out" className="h-dvh w-full flex flex-col">
        <div className="w-full h-full bg-luma-primary relative aspect-square">
          <Image
            fill
            src={client?.cover || ""}
            className="object-cover shimmer aspect-square"
            alt={`Cover Undangan Luma`}
          />
        </div>

        <div className="w-full h-full bg-luma-primary relative px-8 pt-12 pb-14 gap-5 flex flex-col justify-between">
          <div>
            <h1
              data-aos="fade-up"
              data-aos-delay="200"
              className="font-bigilla leading-[40px] text-white text-5xl"
            >
              {groom?.nickname} <br />& {bride?.nickname}
            </h1>
          </div>

          <div>
            <p
              data-aos="fade-up"
              data-aos-delay="400"
              className={`mt-3 ${rubik.className} text-[10px] md:text-xs font-light text-white`}
            >
              Yth. Bapak / Ibu / Saudara / i
            </p>
            <h5
              data-aos="fade-up"
              data-aos-delay="600"
              className={`mt-2 ${rubik.className} text-white`}
            >
              {untuk}
            </h5>
            <p
              data-aos="fade-up"
              data-aos-delay="800"
              className={`${rubik.className} text-[10px] md:text-xs font-light text-white my-9`}
            >
              Tanpa mengurangi rasa hormat, kami mengundang anda untuk
              menghadiri acara {eventNames} kami.
            </p>
            <div data-aos="fade-up" data-aos-delay="1000">
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
        </div>
      </div>
    </section>
  );
};

export default CoverComponent;
