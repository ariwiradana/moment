import { memo } from "react";
import { roboto } from "@/lib/fonts";
import { BiMusic } from "react-icons/bi";
import useClientStore from "@/store/useClientStore";
import useParticipants from "@/hooks/themes/useParticipants";
import Image from "next/image";
import usePhotos from "@/hooks/themes/usePhotos";

const ThankyouComponent = () => {
  const { client } = useClientStore();
  const { state: participantState } = useParticipants();

  const {
    state: { images },
  } = usePhotos();

  return (
    <section
      style={{ marginTop: 0 }}
      className="relative flex flex-col justify-center h-screen bg-aruna-dark"
    >
      <div className="absolute inset-0 z-10 bg-aruna-dark/80"></div>
      <div className="absolute top-0 inset-x-0 grid" data-aos="zoom-out">
        {images.map((image, idx) => (
          <div
            key={`FotoEvent-${idx}`}
            className="w-full h-[10vh] relative overflow-hidden opacity-30"
          >
            <Image
              src={image}
              alt={`Foto Event ${idx + 1}`}
              fill
              className="object-cover grayscale"
              loading="lazy"
              quality={70}
              sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, 1280px"
            />
          </div>
        ))}
      </div>

      <div className="relative z-20 max-w-screen-sm mx-auto py-[60px] md:py-[100px] px-6 flex flex-col items-center text-center">
        <h1 className="font-high-summit text-3xl md:text-4xl text-white mb-8">
          {client?.closing_title}
        </h1>
        <p
          className={`${roboto.className} text-xs md:text-sm text-white/80 mb-16`}
        >
          {client?.closing_description}
        </p>

        {client?.theme_category?.name === "Pernikahan" && (
          <>
            <p
              className={`${roboto.className} text-white/60 text-[8px] md:text-[10px] uppercase tracking-[6px] mb-6`}
            >
              Kami Yang Berbahagia
            </p>
            <h2 className="font-high-summit text-white text-4xl mt-2">
              {participantState.groom?.nickname} &{" "}
              {participantState.bride?.nickname}
            </h2>
          </>
        )}

        {client?.music_title && (
          <div className="flex items-center gap-2 mt-6 relative z-10 text-white text-xs uppercase tracking-[2px]">
            <BiMusic className="animate-pulse" />
            <span>{client?.music_title}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(ThankyouComponent);
