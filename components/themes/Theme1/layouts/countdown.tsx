import React, { FC, useEffect, useState } from "react";
import { afacad } from "@/lib/fonts";
import moment from "moment";
import Title from "../elements/title";
import Image from "next/image";
import Button from "../elements/button";
import { BiSolidCalendarCheck } from "react-icons/bi";
import { useTheme1 } from "@/hooks/themes/useTheme1";
import ImageShimmer from "@/components/image.shimmer";

interface Props {
  state: useTheme1["state"];
  actions: useTheme1["actions"];
}

const CountdownComponent: FC<Props> = ({ state, actions }) => {
  const [randomGalleryImage, setRandomGalleryImage] = useState("");

  useEffect(() => {
    const gallery = state.client?.gallery;

    if (Array.isArray(gallery) && gallery.length > 0) {
      const randomIndex = Math.floor(Math.random() * gallery.length);
      setRandomGalleryImage(gallery[randomIndex]);
    } else {
      setRandomGalleryImage("");
    }
  }, [state.client?.gallery]);

  return (
    <section className="relative h-screen overflow-hidden z-0">
      <div className="fixed inset-0 z-0">
        <div className="relative h-full w-full">
          {randomGalleryImage && (
            <ImageShimmer
              sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1600px"
              priority
              alt="bg-countdown"
              fill
              className="object-cover scale-110 grayscale-[50%]"
              src={randomGalleryImage}
              style={{ transform: "translateZ(0)" }}
            />
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0000008f] via-[#0000005a] to-white"></div>
      <div className="flex flex-col z-10 items-center justify-center h-screen">
        <div className="w-full mb-8">
          <div data-aos="zoom-in-up" className="relative h-12 lg:h-16 w-full">
            <Image
              alt="leaf-datetime"
              src="/images/theme1/leaf.svg"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div data-aos="fade-up" className="text-center">
          <Title
            white
            title="Hitung Mundur"
            caption={moment(state.client?.date).format("DD MMMM YYYY")}
          />
        </div>
        <div className="mt-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {[
              { label: "Hari", value: state.countdown.days },
              { label: "Jam", value: state.countdown.hours },
              { label: "Menit", value: state.countdown.minutes },
              { label: "Detik", value: state.countdown.seconds },
            ].map(({ label, value }) => (
              <div
                key={label}
                data-aos="fade-up"
                className={`text-white ${afacad.className} border border-white p-2 aspect-square h-24 w-24 lg:h-32 lg:w-32 flex flex-col justify-center items-center`}
              >
                <h1 className="text-white text-6xl">{value}</h1>
                <p className={`text-base mt-1 ${afacad.className}`}>{label}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-16" data-aos="fade-up">
            <Button
              type="button"
              onClick={actions.handleAddEvent}
              title="Save The Date"
              icon={<BiSolidCalendarCheck />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownComponent;
