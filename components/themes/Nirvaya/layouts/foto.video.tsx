import React, { FC, useState } from "react";
import { useNirvaya } from "@/hooks/themes/useNirvaya";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { balthazar, dm, italiana } from "@/lib/fonts";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
import ImageShimmer from "@/components/image.shimmer";

interface Props {
  state: useNirvaya["state"];
}

const GalleryComponent: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const images =
    Array.isArray(props.state.client?.gallery) &&
    props.state.client?.gallery.length > 0
      ? props.state.client?.gallery
      : [];

  const lightboxImage = images.map((img) => ({ src: img }));

  const videos =
    Array.isArray(props.state.client?.videos) &&
    props.state.client.videos.length > 0
      ? props.state.client.videos
      : [];

  return (
    <section className="relative overflow-hidden -mt-10">
      <Lightbox
        styles={{ root: { "--yarl__color_backdrop": "rgba(0, 0, 0, .8)" } }}
        close={() => setOpen(false)}
        slides={lightboxImage}
        index={imageIndex}
        open={open}
        on={{
          view(props: { index: number }) {
            setImageIndex(props.index);
          },
        }}
      />

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 25">
        <path
          className="fill-white"
          fill-opacity="1"
          d="M0,0L120,5C240,10,480,20,720,20C960,20,1200,10,1320,5L1440,0L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        ></path>
      </svg>

      <div className="w-full h-full relative z-20 py-[60px] md:py-[100px] bg-gradient-to-b from-white from-[40%] via-nirvaya-dark/60 to-nirvaya-dark">
        <h1
          data-aos="fade-up"
          className={`${italiana.className} text-4xl md:text-5xl text-center text-nirvaya-dark px-8`}
        >
          Momen Bahagia
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className={`${balthazar.className} text-sm md:text-base text-nirvaya-dark/80 px-8 mt-1 mb-8 md:mb-12 text-center max-w-screen-sm mx-auto`}
        >
          Foto {videos.length > 0 && "& Video "} dari Klien{" "}
          {props.state.groom?.nickname} & {props.state.bride?.nickname}
        </p>
        {videos.length > 0 && (
          <div className="grid gap-1 mb-2 px-1">
            {videos.map((v) => {
              const youtubeId = getYouTubeVideoId(v);
              const youtubeVideo = isYoutubeVideo(v);
              if (youtubeVideo)
                return (
                  <div
                    data-aos="zoom-in-up"
                    key={youtubeId}
                    className="relative w-full aspect-video rounded overflow-hidden"
                  >
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=1&modestbranding=1&showinfo=0&rel=0&vq=hd1080`}
                      title={v}
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
            })}
          </div>
        )}
        <div className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 px-1">
          {images.map((img, index) => (
            <div
              key={`gallery-${index + 1}`}
              data-aos="zoom-in-up"
              className="w-full aspect-square relative"
              onClick={() => {
                setOpen(() => true);
                setImageIndex(() => index);
              }}
            >
              <ImageShimmer
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 25vw"
                priority
                alt={`gallery-${index + 1}`}
                src={img}
                className="hover:scale-110 transition-transform ease-in-out duration-500 object-cover cursor-pointer"
                fill
              />
            </div>
          ))}
        </div>

        <div
          data-aos="fade-up"
          className="px-8 mt-[60px] md:mt-[100px] max-w-lg mx-auto"
        >
          <h1
            className={` ${dm.className} text-white text-5xl h-10 text-center`}
          >
            &rdquo;
          </h1>
          <p
            className={`${balthazar.className} text-white text-base md:text-lg text-center`}
          >
            Cinta sejati dimulai ketika satu orang menerima semua kekurangan
            orang lain, dan tetap memilih untuk bersama.
          </p>
          <div className="flex items-center justify-center gap-x-2 mt-4 md:mt-6">
            <div className="h-[0.5px] w-4 bg-white"></div>
            <p
              className={`${balthazar.className} text-white text-base md:text-lg`}
            >
              Fred Rogers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryComponent;
