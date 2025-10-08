import { rubik } from "@/lib/fonts";
import { Participant } from "@/lib/types";
import useClientStore from "@/store/useClientStore";
import { getParticipantNames } from "@/utils/getParticipantNames";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { memo, useMemo } from "react";

const YoutubeEmbed = dynamic(() => import("./youtube.embed"), { ssr: false });

const Videos: NextPage = () => {
  const { client } = useClientStore();

  const youtubeVideos = useMemo(
    () =>
      (client?.videos as string[]).filter((url) => isYoutubeVideo(url)) || [],
    [client?.videos]
  );

  const quotes = [
    "Cinta sejati tidak datang dari menemukan pasangan yang sempurna, tetapi dengan melihat ketidaksempurnaan secara sempurna.",
    "Pernikahan yang bahagia bukanlah ketika pasangan yang sempurna bersatu, tapi ketika pasangan yang tidak sempurna belajar menikmati perbedaan mereka.",
  ];

  if (!youtubeVideos.length) return null;

  return (
    <>
      {youtubeVideos.map((url, index) => {
        const youtubeId = url.split("v=")[1]?.split("&")[0];
        return (
          <section
            key={`Video ${index}`}
            className="h-dvh snap-start w-full relative"
          >
            <div className="absolute z-20 inset-0 bg-luma-dark/60 flex flex-col justify-center items-center px-8 py-10">
              <div className="w-full aspect-video">
                <YoutubeEmbed
                  youtubeId={youtubeId || null}
                  title={getParticipantNames(
                    client?.participants as Participant[]
                  )}
                />
              </div>
              {quotes[index] && (
                <p
                  className={`${rubik.className} text-[10px] md:text-xs font-light text-justify text-white mt-6`}
                >
                  <span className="inline-block w-5 h-[1px] bg-white/50 mr-2 mb-1"></span>
                  {quotes[index]}
                </p>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
};

export default memo(Videos);
