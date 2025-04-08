import useEvents from "@/hooks/themes/useEvents";
import useParticipants from "@/hooks/themes/useParticipants";
import { raleway } from "@/lib/fonts";
import useCoverStore from "@/store/useCoverStore";
import { getEventNames } from "@/utils/getEventNames";
import moment from "moment";
import Image from "next/image";
import React, { memo } from "react";
import usePhotos from "@/hooks/themes/usePhotos";
import Slider, { Settings } from "react-slick";

const Hero = () => {
  const { isOpen } = useCoverStore();
  const { state: participantsState } = useParticipants();
  const { state: eventState } = useEvents();
  const {
    state: { images },
  } = usePhotos();

  const settings: Settings = {
    dots: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 3000,
    cssEase: "ease-in-out",
  };

  return (
    <section
      data-aos="fade-in"
      data-aos-delay="400"
      className={`relative bg-nirvaya-dark ${raleway.className}`}
    >
      <div>
        <Slider className="h-lvh" {...settings}>
          {images.map((image, index) => (
            <Image
              key={`Main Slider ${index + 1}`}
              sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
              fill
              quality={100}
              alt={`hero-img-${index}`}
              priority
              className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform shimmer-dark object-center"
              src={image}
            />
          ))}
        </Slider>
      </div>
      <div
        className={`absolute inset-0 bg-gradient-to-b from-nirvaya-dark/60 via-nirvaya-dark/0 to-nirvaya-dark/90 to-[90%] z-10`}
      >
        {isOpen && (
          <div className="flex flex-col justify-between items-center py-16 px-8 h-svh relative z-20">
            <div>
              <p
                data-aos="fade-up"
                className="text-white text-center tracking-[2px] font-medium text-[10px] lg:text-xs uppercase"
              >
                Undangan {getEventNames(eventState.events || [])}
              </p>
              <h2
                data-aos="fade-up"
                data-aos-delay="200"
                className="text-white font-edensor mt-1 lg:mt-2 leading-10 text-4xl lg:text-5xl text-center"
              >
                <span>{participantsState.groom?.nickname}</span>
                <span className="italic"> dan </span>
                <span>{participantsState.bride?.nickname}</span>
              </h2>

              <p
                data-aos="fade-up"
                data-aos-delay="400"
                className="text-white text-[10px] lg:mt-2 text-center mt-[10px] lg:text-xs max-w-md"
              >
                Wahai pasangan suami-isteri, kembangkanlah cinta kasih di dalam
                dirimu, tekun dan tetaplah berkarma dalam menggapai kebahagiaan.
                Karena hanya orang yang bersungguh-sungguhlah mendapatkan
                keberhasilan dalam berkeluarga.
              </p>
            </div>

            <div>
              {eventState.events.length > 0 &&
              eventState.timeRemainings.length > 0 ? (
                <div>
                  <p
                    data-aos="fade-down"
                    data-aos-delay="1000"
                    className={`text-white text-center tracking-[3px] font-medium text-[10px] lg:text-xs uppercase transform transition-all ease-in-out duration-300 ${
                      eventState.fade
                        ? "opacity-100 translate-y-0"
                        : "opacity-10 translate-y-1"
                    }`}
                  >
                    {eventState.events[eventState.currentIndex].name}
                  </p>
                  <p
                    data-aos="fade-down"
                    data-aos-delay="800"
                    className={`text-white text-center tracking-[3px] font-medium text-[10px] lg:text-xs uppercase mt-2 transform transition-all ease-in-out duration-300 delay-100 ${
                      eventState.fade
                        ? "opacity-100 translate-y-0"
                        : "opacity-10 translate-y-1"
                    }`}
                  >
                    {moment(
                      eventState.events[eventState.currentIndex].date
                    ).format("dddd, DD/MM/YYYY")}
                  </p>
                  <div
                    data-aos="fade-down"
                    data-aos-delay="600"
                    className={`flex justify-center gap-x-14 mt-4 transform transition-all ease-in-out duration-300 delay-200 ${
                      eventState.fade
                        ? "opacity-100 translate-y-0"
                        : "opacity-10 translate-y-1"
                    }`}
                  >
                    <div className="text-center">
                      <h6 className="font-edensor leading-none text-2xl lg:text-3xl text-white">
                        {
                          eventState.timeRemainings[eventState.currentIndex]
                            .days
                        }
                      </h6>
                      <p className="text-[10px] lg:text-xs text-white mt-1 font-edensor">
                        Hari
                      </p>
                    </div>
                    <div className="text-center">
                      <h6 className="font-edensor leading-none text-2xl lg:text-3xl text-white">
                        {
                          eventState.timeRemainings[eventState.currentIndex]
                            .hours
                        }
                      </h6>
                      <p className="text-[10px] lg:text-xs text-white mt-1 font-edensor">
                        Jam
                      </p>
                    </div>
                    <div className="text-center">
                      <h6 className="font-edensor leading-none text-2xl lg:text-3xl text-white">
                        {
                          eventState.timeRemainings[eventState.currentIndex]
                            .minutes
                        }
                      </h6>
                      <p className="text-[10px] lg:text-xs text-white mt-1 font-edensor">
                        Menit
                      </p>
                    </div>
                    <div className="text-center">
                      <h6 className="font-edensor leading-none text-2xl lg:text-3xl text-white">
                        {
                          eventState.timeRemainings[eventState.currentIndex]
                            .seconds
                        }
                      </h6>
                      <p className="text-[10px] lg:text-xs text-white mt-1 font-edensor">
                        Detik
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Hero);
