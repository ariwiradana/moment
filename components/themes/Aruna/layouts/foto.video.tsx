import React, { FC, useState } from "react";
import { useAruna } from "@/hooks/themes/useAruna";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { balthazar, dm, italiana } from "@/lib/fonts";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";
import {
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";

interface Props {
  state: useAruna["state"];
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

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getCols = () => {
    if (isDesktop) return 3;
    if (isTablet) return 2;
    if (isMobile) return 2;
  };

  const getGap = () => {
    if (isDesktop) return 8;
    if (isTablet) return 8;
    if (isMobile) return 8;
  };

  return (
    <section className="relative bg-gradient-to-b from-white via-white via-[60%] to-nirvaya-dark/70 to-[85%] overflow-hidden">
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

      <div
        data-aos="fade-up"
        className="w-full h-full relative z-20 py-[60px] md:py-[100px]"
      >
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
          <div className="grid gap-4 mb-2 px-2" data-aos="zoom-in-up">
            {videos
              .filter((v) => v.includes("www.youtube.com"))
              .map((v) => {
                const youtubeId = getYouTubeVideoId(v);
                return (
                  <div
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
        <div className="mx-auto flex flex-col gap-4 px-2" data-aos="zoom-in-up">
          <ImageList
            variant="masonry"
            cols={getCols()}
            gap={getGap()}
            className="overflow-hidden"
          >
            {images.map((img, index) => (
              <ImageListItem key={img}>
                <div className="w-full h-full overflow-hidden rounded">
                  <Image
                    onClick={() => {
                      setOpen(() => true);
                      setImageIndex(() => index);
                    }}
                    className="hover:scale-110 transition-transform ease-in-out duration-500"
                    src={img}
                    alt={`gallery-img-${index + 1}`}
                    width={360}
                    height={360}
                    layout="responsive"
                    objectFit="cover"
                    priority
                  />
                </div>
              </ImageListItem>
            ))}
          </ImageList>
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
