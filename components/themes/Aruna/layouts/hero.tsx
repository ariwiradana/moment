import ImageShimmer from "@/components/image.shimmer";
import useEvents from "@/hooks/themes/useEvents";
import useParticipants from "@/hooks/themes/useParticipants";
import { roboto } from "@/lib/fonts";
import useClientStore from "@/store/useClientStore";
import useCoverStore from "@/store/useCoverStore";
import { getEventNames } from "@/utils/getEventNames";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
import moment from "moment";
import React, { memo } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HeroComponent = () => {
  const { client } = useClientStore();
  const { isOpen } = useCoverStore();
  const {
    state: { events, fade, currentIndex },
  } = useEvents();
  const { state: participant } = useParticipants();

  const video =
    Array.isArray(client?.videos) && client.videos.length > 0
      ? client.videos.filter((v) => !isYoutubeVideo(v))
      : [];

  return (
    <section className="relative min-h-[600px] h-lvh overflow-hidden">
      <div className="top-0 right-0 w-full xl:w-[40vw] 2xl:w-[30vw] overflow-hidden">
        {video && video?.length > 0 ? (
          <div
            className="min-h-[600px] h-lvh w-full"
            data-aos="zoom-out"
            data-aos-delay="500"
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <video
                className="min-w-full min-h-full absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 object-cover"
                src={video[0]}
                autoPlay
                muted
                loop
                playsInline
              ></video>
            </div>
          </div>
        ) : (
          <div data-aos="zoom-out-up">
            <Swiper
              loop
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              effect="fade"
              speed={2000}
              className="w-full transition-transform min-h-[600px] h-lvh"
              spaceBetween={0}
              slidesPerView={1}
              modules={[Autoplay, EffectFade]}
            >
              <>
                {Array.isArray(client?.gallery) && client?.gallery.length > 0
                  ? client.gallery
                      .filter(
                        (image) =>
                          image !== client?.cover && image !== client?.seo
                      )
                      .map((image, index) => (
                        <SwiperSlide
                          className="relative w-full h-full"
                          key={`hero-img-${index}`}
                        >
                          <div className="absolute inset-0 z-0">
                            <ImageShimmer
                              fill
                              quality={100}
                              alt={`hero-img-${index}`}
                              priority
                              sizes="100vw"
                              className="object-cover transform translate-y-0 lg:translate-y-0 transition-transform"
                              src={image}
                            />
                          </div>
                        </SwiperSlide>
                      ))
                  : null}
              </>
            </Swiper>
          </div>
        )}
      </div>
      <div
        className={`absolute inset-0 z-10 from-aruna-dark/50 from-[5%] via-aruna-dark/20 to-[95%] to-aruna-dark transition-opacity ease-in-out duration-1000 delay-500 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {isOpen && (
          <div className="relative z-40 bg-gradient-to-b from-aruna-dark/40 from-[5%] via-aruna-dark/20 to-[95%] to-aruna-dark h-screen flex flex-col py-[60px] md:py-[100px] px-6 justify-between items-center">
            <div className="text-center">
              <p
                data-aos="fade-up"
                data-aos-delay="200"
                className={`text-white/60 text-[8px] md:text-[10px] uppercase text-center tracking-[4px] ${roboto.className}`}
              >
                Undangan {getEventNames(events)}
              </p>
              <h1
                data-aos="fade-up"
                data-aos-delay="400"
                className={`font-high-summit text-white text-4xl md:text-5xl 2xl:text-6xl leading-10 mt-4`}
              >
                {participant.groom?.nickname} & {participant.bride?.nickname}
              </h1>
            </div>
            <div className="text-center flex flex-col items-center">
              <div data-aos="fade-down" data-aos-delay="800">
                <div
                  className={`w-full flex items-center gap-x-5 md:gap-x-6 transform transition-all duration-500 ease-in-out ${
                    fade
                      ? "opacity-100 translate-y-0"
                      : "opacity-10 translate-y-1"
                  }`}
                >
                  <p
                    className={`${roboto.className} text-white text-[10px] md:text-xs tracking-[4px] uppercase`}
                  >
                    {events[currentIndex].name}
                  </p>
                  <div className="h-[2px] w-[2px] min-h-[2px] min-w-[2px] rounded-full bg-white"></div>
                  <p
                    className={`${roboto.className} text-white text-[10px] md:text-xs tracking-[4px] uppercase`}
                  >
                    {moment(events[currentIndex].date).format(
                      "DD / MMM / YYYY"
                    )}
                  </p>
                </div>
              </div>
              <p
                data-aos="fade-down"
                data-aos-delay="1000"
                className={`text-white/60 text-[10px] md:text-xs text-center mt-4 ${roboto.className}`}
              >
                {client?.opening_title}, {client?.opening_description}
              </p>
            </div>
          </div>
          // <div className="min-h-[600px] h-svh flex flex-col max-w-screen-sm lg:max-w-screen-lg mx-auto py-[60px] md:py-[100px] px-6 md:px-12 w-full">
          //   <div>
          //     <h1
          //       data-aos="fade-up"
          //       data-aos-delay="200"
          //       className={`font-high-summit text-white text-5xl leading-10 2xl:text-6xl mb-2`}
          //     >
          //       {client?.theme_category?.name === "Pernikahan" ? (
          //         <>
          //           {participant.groom?.nickname}
          //           <br />& {participant.bride?.nickname}
          //         </>
          //       ) : (
          //         <>Undangan {getEventNames(client?.events || [])}</>
          //       )}
          //     </h1>
          //   </div>
          //   <div
          //     data-aos="zoom-in"
          //     data-aos-delay="1200"
          //     className="h-full w-[1px] bg-white/50 my-8"
          //   ></div>
          //   <div>
          //     <div data-aos="fade-down" data-aos-delay="800">
          //       <div
          //         className={`w-full flex items-center gap-x-5 md:gap-x-6 transform transition-all duration-500 ease-in-out ${
          //           event.fade
          //             ? "opacity-100 translate-y-0"
          //             : "opacity-10 translate-y-1"
          //         }`}
          //       >
          //         <p
          //           className={`${roboto.className} text-white text-xs md:text-sm tracking-[3px] uppercase`}
          //         >
          //           {event.events[event.currentIndex].name}
          //         </p>
          //         <div className="h-[2px] w-[2px] min-h-[2px] min-w-[2px] rounded-full bg-white"></div>
          //         <p
          //           className={`${roboto.className} text-white text-xs md:text-sm tracking-[3px] uppercase`}
          //         >
          //           {moment(event.events[event.currentIndex].date).format(
          //             "DD / MMM / YYYY"
          //           )}
          //         </p>
          //       </div>
          //     </div>
          //     <p
          //       data-aos="fade-down"
          //       data-aos-delay="600"
          //       className={`${roboto.className} text-white text-[10px] md:text-xs tracking-[1px] mt-8 max-w-screen-sm`}
          //     >
          //       {client?.theme_category?.name === "Pernikahan" ? (
          //         <>
          //           Wahai pasangan suami-isteri, semoga kalian tetap bersatu dan
          //           tidak pernah terpisahkan. Semoga kalian mencapai hidup penuh
          //           kebahagiaan, tinggal di rumah yang penuh kegembiraan bersama
          //           seluruh keturunanmu.
          //         </>
          //       ) : (
          //         <>
          //           Tanpa mengurangi rasa hormat, kami mengundang anda untuk
          //           menghadiri acara{" "}
          //           <span className="lowercase">
          //             {getEventNames(client?.events || [])}
          //           </span>{" "}
          //           kami.
          //         </>
          //       )}
          //     </p>
          //     {client?.theme_category?.name === "Pernikahan" && (
          //       <div
          //         className="flex items-center gap-x-3 md:gap-x-5 mt-8"
          //         data-aos="fade-down"
          //         data-aos-delay="400"
          //       >
          //         <div className="h-[0.5px] w-4 md:w-6 lg:w-8 bg-white"></div>
          //         <p
          //           className={`font-high-summit text-white text-base md:text-lg`}
          //         >
          //           Rgveda X.85.42
          //         </p>
          //       </div>
          //     )}
          //   </div>
          // </div>
        )}
      </div>
    </section>
  );
};

export default memo(HeroComponent);
