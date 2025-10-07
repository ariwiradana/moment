import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import ShimmerLoader from "./shimmer.loader";

interface ImageShimmerProps extends ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  onClick?: () => void;
}
const ImageShimmer: React.FC<ImageShimmerProps> = (props) => {
  const [loading, setLoading] = useState(true);

  return (
    <div
      onClick={props.onClick}
      className={`relative overflow-hidden ${props.className ?? ""}`}
      style={
        props.fill
          ? { width: "100%", height: "100%" } // wajib untuk fill
          : { width: props.width, height: props.height }
      }
    >
      {loading && <ShimmerLoader />}
      <Image
        {...props}
        onLoadingComplete={() => setLoading(false)}
        className={`${loading ? "hidden" : "block"} ${props.className ?? ""}`}
      />
    </div>
  );
};

export default ImageShimmer;
