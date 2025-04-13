import { rubik } from "@/lib/fonts";
import useClientStore from "@/store/useClientStore";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
import { NextPage } from "next";
import YoutubeEmbed from "../../Aruna/elements/youtube.embed";
import { getParticipantNames } from "@/utils/getParticipantNames";
import { Participant } from "@/lib/types";
import { useMemo } from "react";

const Videos: NextPage = () => {
  const { client } = useClientStore();

  const quotes = [
    {
      name: "Sam Keen",
      quote:
        "Cinta sejati tidak datang dari menemukan pasangan yang sempurna, tetapi dengan melihat ketidaksempurnaan secara sempurna.",
    },
    {
      name: "Dave Meurer",
      quote:
        "Pernikahan yang bahagia bukanlah ketika pasangan yang sempurna bersatu, tapi ketika pasangan yang tidak sempurna belajar menikmati perbedaan mereka.",
    },
  ];

  const youtubeVideos = useMemo(
    () =>
      (client?.videos as string[]).filter((url) => isYoutubeVideo(url)) || [],
    [client?.videos]
  );

  if (client?.videos && client?.videos?.length > 0)
    return (
      <>
        {youtubeVideos.map((url, index) => {
          const youtubeId = getYouTubeVideoId(url);
          return (
            <section
              key={`Video ${index + 1}`}
              className="h-dvh snap-start w-full relative"
            >
              <div className="absolute z-20 inset-0 bg-luma-dark/60 flex flex-col justify-center items-center">
                <div className="w-full aspect-video">
                  <YoutubeEmbed
                    title={getParticipantNames(
                      client?.participants as Participant[]
                    )}
                    key={youtubeId}
                    youtubeId={youtubeId}
                  />
                </div>
                <div className="w-full px-8 pt-10">
                  <p
                    className={`${rubik.className} text-[10px] md:text-xs font-light text-justify text-white`}
                  >
                    <span>
                      <div className="w-5 h-[1px] bg-white/50 mb-1 inline-block mr-2"></div>
                    </span>
                    {quotes[index].quote}
                  </p>
                  <p
                    className={`text-white/70 mt-4 text-[8px] md:text-[10px] uppercase tracking-[3px] ${rubik.className}`}
                  >
                    {quotes[index].name}
                  </p>
                </div>
              </div>
            </section>
          );
        })}
      </>
    );
};

export default Videos;
