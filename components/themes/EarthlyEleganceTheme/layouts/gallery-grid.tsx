import React, { FC } from "react";
import Title from "../elements/title";
import { UseEarthlyEleganceTheme } from "@/hooks/themes/useEarthlyEleganceTheme";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";

interface Props {
  state: UseEarthlyEleganceTheme["state"];
}

const GalleryGridComponent: FC<Props> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const getCols = () => {
    if (isMobile) return 2;
    if (isTablet) return 3;
    if (isDesktop) return 4;
    return 4;
  };

  return (
    <section>
      <div className="bg-gray-100 relative z-10 h-full py-12 md:py-16 lg:py-20">
        <div className="absolute inset-0 bg-[url('/images/theme1/flower-pattern.png')] bg-repeat bg-contain opacity-10"></div>
        <div className="w-full h-full px-1 relative z-40">
          <div data-aos="fade-up" className="flex flex-col items-center">
            <Title title="Momen Bahagia" />
          </div>

          <div className="w-full mt-8" data-aos="fade-up">
            <ImageList variant="masonry" cols={getCols()} gap={4}>
              {Array.isArray(props.state.client?.gallery) &&
              props.state.client?.gallery.length > 0 ? (
                props.state.client.gallery.map(
                  (item: string, index: number) => (
                    <ImageListItem key={`gallery-${index}`}>
                      <Image
                        src={`${item}`}
                        alt={`gallery-${index}`}
                        width={248}
                        height={248}
                        layout="responsive"
                        objectFit="cover"
                        priority={index < 3}
                        quality={100}
                      />
                    </ImageListItem>
                  )
                )
              ) : (
                <></>
              )}
            </ImageList>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryGridComponent;
