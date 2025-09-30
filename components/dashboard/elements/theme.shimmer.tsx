import { NextPage } from "next";

const ThemeShimmer: NextPage = () => {
  return (
    <div className="w-full aspect-[1/2] relative">
      <div className="flex flex-col items-center p-6">
        <div className="w-full aspect-[1/2] bg-white/[0.01] rounded-3xl shimmer-dark"></div>
        <div className="h-3 w-28 bg-white/[0.01] mt-6 shimmer-dark"></div>
        <div className="h-3 w-8 bg-white/[0.01] mt-6 shimmer-dark"></div>
        <div className="h-3 w-20 bg-white/[0.01] mt-2 shimmer-dark"></div>
        <div className="w-36 bg-white/[0.01] mt-5 py-4 shimmer-dark rounded-full"></div>
      </div>
    </div>
  );
};

export default ThemeShimmer;
