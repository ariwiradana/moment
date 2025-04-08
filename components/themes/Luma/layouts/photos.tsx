import { rubik } from "@/lib/fonts";
import { NextPage } from "next";

const Photos: NextPage = () => {
  // const { client } = useClientStore();
  // const {
  //   state: { images },
  // } = usePhotos();

  // const theme = useTheme();
  // const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  // const isDesktop = useMediaQuery(theme.breakpoints.between("lg", "xl"));
  // const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // const getCols = () => {
  //   if (isLargeScreen) return 5;
  //   if (isDesktop) return 4;
  //   if (isTablet) return 2;
  //   if (isMobile) return 2;
  // };

  // const getGap = () => {
  //   if (isLargeScreen) return 8;
  //   if (isDesktop) return 8;
  //   if (isTablet) return 8;
  //   if (isMobile) return 4;
  // };

  return (
    <section className="h-dvh snap-start w-full relative">
      <div className="absolute z-20 inset-0 bg-luma-dark/60 flex flex-col justify-center items-center">
        <div className="w-full mb- px-8 pt-[60px]">
          <h2 className="font-bigilla leading-[40px] text-white text-4xl mb-1">
            Galeri Kami
          </h2>
          <p
            className={`${rubik.className} text-[10px] md:text-xs font-light text-justify text-white`}
          >
            <span>
              <div className="w-5 h-[1px] bg-white/50 mb-1 inline-block mr-2"></div>
            </span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id
            cupiditate maiores dolore enim reiciendis sit, debitis repudiandae
            neque possimus tempora!
          </p>
        </div>
        <div>
          {/* <ImageList variant="masonry" cols={getCols()} gap={getGap()}>
            {images.map((img, index) => (
              <ImageListItem key={img}>
                <div>
                  <Image
                    sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, (max-width: 1440px) 1280px, 1280px"
                    // onClick={() => {
                    //   actions.setIsOpen(true);
                    //   actions.setImageIndex(index);
                    // }}
                    className="hover:scale-[0.99] transition-transform ease-in-out duration-500 bg-white/5"
                    src={img}
                    alt={`gallery-img-${index + 1}`}
                    width={360}
                    height={360}
                    layout="responsive"
                    objectFit="cover"
                    loading="lazy"
                  />
                </div>
              </ImageListItem>
            ))}
          </ImageList> */}
        </div>
      </div>
    </section>
  );
};

export default Photos;
