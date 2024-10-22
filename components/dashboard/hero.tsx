import React from "react";
import ButtonPrimary from "./elements/button.primary";
import Image from "next/image";
import { BiCalendarEvent, BiEdit } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Blob } from "@/lib/types";
import { Autoplay, EffectCards } from "swiper/modules";
import { dm, marcellus } from "@/lib/fonts";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import useDashboardStore from "@/lib/dashboardStore";

const HeroComponent = () => {
  const { data } = useSWR("/api/_im?pathname=Themes/Dashboard", fetcher);
  const images: Blob[] = data?.blobs || [];
  const thumbnails: string[] = images.map((theme) => theme.url);
  const router = useRouter();

  const slicedThumbnails =
    thumbnails.length > 3 ? thumbnails.slice(0, 3) : thumbnails;

  const { setSelectedPackageId } = useDashboardStore();

  return (
    <section
      id="section1"
      className={`w-full select-none pt-16 md:pt-20 lg:pt-24 bg-zinc-50 overflow-x-hidden`}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col md:grid md:grid-cols-5 gap-16 lg:gap-36 pt-16 pb-24 lg:pb-32 relative px-6 md:px-12 lg:px-24">
        <div className="h-full flex justify-center md:col-span-2">
          {images.length > 0 && (
            <div className="w-[180px] lg:w-[260px]" data-aos="zoom-out-up">
              <Swiper
                initialSlide={1}
                speed={2000}
                autoplay
                effect="cards"
                grabCursor={false}
                modules={[Autoplay, EffectCards]}
                spaceBetween={0}
                slidesPerView={1}
                allowTouchMove={false}
                preventInteractionOnTransition={false}
                preventClicks={false}
                cardsEffect={{
                  slideShadows: false,
                  perSlideOffset: 15,
                  perSlideRotate: 4,
                }}
              >
                {slicedThumbnails.map((thumb, index) => (
                  <SwiperSlide
                    className="select-none"
                    key={`thumbnail-${index}`}
                  >
                    <Image
                      priority
                      sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 260px, 260px"
                      src={thumb ?? ""}
                      alt={`thumbnail-${index}`}
                      width={260}
                      height={80}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
        <div className="h-full flex flex-col justify-center col-span-3">
          <div
            data-aos="fade-right"
            data-aos-delay="200"
            className={`mb-4 text-dashboard-dark uppercase flex items-center gap-x-2 ${marcellus.className}`}
          >
            <span className="pr-2">Praktis</span>
            <span>
              <div className="w-1 h-1 bg-dashboard-dark rounded"></div>
            </span>
            <span className="px-2">Mudah</span>
            <span>
              <div className="w-1 h-1 bg-dashboard-dark rounded"></div>
            </span>
            <span className="pl-2">Cepat</span>
          </div>
          <h1
            data-aos="fade-right"
            data-aos-delay="400"
            className={`mb-8 text-dashboard-dark text-4xl md:text-5xl lg:text-7xl flex flex-wrap gap-x-2 ${dm.className}`}
          >
            Bagikan{" "}
            <span className="flex items-center">
              m
              <span className="relative w-10 md:w-12 lg:w-16 aspect-square">
                <Image
                  fill
                  sizes="52px"
                  className="animate-spin-slow md:mt-1 lg:mt-2 object-contain"
                  src="/icon.png"
                  alt="font-moment"
                />
              </span>
              men
            </span>{" "}
            <span>tak terlupakan bersama kami!</span>
          </h1>

          <div data-aos="fade-right" data-aos-delay="600">
            <ButtonPrimary
              onClick={() => {
                toast.success("Silahkan pilih tema terlebih dahulu", {
                  icon: (
                    <div className="p-1 rounded bg-dashboard-primary">
                      <BiCalendarEvent />
                    </div>
                  ),
                });
                setSelectedPackageId(1);
                router.push("/tema");
              }}
              icon={<BiEdit />}
              title="Buat Undangan"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
