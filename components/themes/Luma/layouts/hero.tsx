import useEvents from "@/hooks/themes/useEvents";
import useParticipants from "@/hooks/themes/useParticipants";
import usePhotos from "@/hooks/themes/usePhotos";
import { rubik } from "@/lib/fonts";
import moment from "moment";
import { NextPage } from "next";
import Image from "next/image";
import { memo } from "react";
import Slider, { Settings } from "react-slick";

const Hero: NextPage = () => {
  const {
    state: { images },
  } = usePhotos();

  const {
    state: { events, fade, currentIndex },
  } = useEvents();

  const {
    state: { bride, groom },
  } = useParticipants();

  const settings: Settings = {
    dots: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 6000,
    speed: 3000,
    cssEase: "ease-in-out",
  };

  return (
    <section className="h-dvh snap-start w-full bg-luma-dark relative">
      <div className="absolute inset-0 z-10 bg-gradient-to-b h-full from-luma-dark/50 to-luma-dark/70 py-[60px] px-8 flex flex-col justify-between">
        <div>
          <h1
            data-aos="fade-up"
            data-aos-delay="400"
            className="font-bigilla leading-[40px] text-white text-5xl mb-3 mt-5"
          >
            {groom?.nickname} <br />& {bride?.nickname}
          </h1>
          <div data-aos="fade-up" data-aos-delay="600">
            <div
              className={`transform transition-all flex items-center ease-in-out duration-200 ${
                fade ? "opacity-100 translate-y-0" : "opacity-10 translate-y-1"
              }`}
            >
              <p
                className={`${rubik.className} uppercase text-[10px] md:text-xs tracking-[1px] font-light text-white`}
              >
                {events[currentIndex].name}
              </p>
              <div className="w-[2px] h-[2px] aspect-square rounded-full bg-white mx-3"></div>
              <p
                className={`${rubik.className} uppercase text-[10px] md:text-xs tracking-[1px] font-light text-white`}
              >
                {moment(events[currentIndex].date).format("dddd, DD MMMM YYYY")}
              </p>
            </div>
          </div>
        </div>
        <div data-aos="fade-up" data-aos-delay="1800">
          <p
            className={`${rubik.className} text-[10px] md:text-xs font-light text-white`}
          >
            Wahai pasangan suami-isteri, kembangkanlah cinta kasih di dalam
            dirimu, tekun dan tetaplah berkarma dalam menggapai kebahagiaan.
            Karena hanya orang yang bersungguh-sungguhlah mendapatkan
            keberhasilan dalam berkeluarga.
          </p>
          <p
            className={`${rubik.className} uppercase text-[10px] mt-4 md:text-xs tracking-[1px] font-light text-white`}
          >
            Rgveda : X.85.42
          </p>
        </div>
      </div>
      <div data-aos="zoom-out" className="w-full h-full">
        <Slider {...settings} className="w-full h-full">
          {images.map((image, index) => (
            <Image
              key={`Main Slider ${index + 1}`}
              sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
              fill
              quality={100}
              alt={`Main Slider ${index + 1}`}
              priority
              className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform shimmer-dark"
              src={image as string}
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default memo(Hero);
