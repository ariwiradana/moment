import { useState } from "react";
import Image from "next/image";
import { BiPlay } from "react-icons/bi";

type YouTubePlayerProps = {
  youtubeId: string;
  poster?: string; // Poster is optional
};

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ youtubeId, poster }) => {
  const [isPlaying, setIsPlaying] = useState(!poster); // If no poster, start with playing mode

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full aspect-video rounded-lg bg-gray-100 object-cover">
      {!isPlaying && poster && (
        <div className="relative inset-0 w-full h-full">
          <div className="absolute inset-0 flex justify-center items-center z-10">
            <button
              type="button"
              onClick={handlePlay}
              className="h-12 w-12 rounded-full bg-white flex justify-center items-center text-3xl bg-opacity-80 hover:bg-opacity-90 text-admin-dark transition-all ease-in-out duration-300"
            >
              <BiPlay />
            </button>
          </div>
          <Image
            src={poster}
            alt={`Video poster ${poster}`}
            fill
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}
      {(isPlaying || !poster) && (
        <iframe
          width="100%"
          height="100%"
          className="rounded-lg"
          src={`https://www.youtube.com/embed/${youtubeId}?loop=1&playlist=${youtubeId}&controls=1&modestbranding=1&showinfo=0&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default YouTubePlayer;
