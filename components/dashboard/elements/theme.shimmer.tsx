import { NextPage } from "next";

interface Props {
  className?: string;
}

const ThemeShimmer: NextPage<Props> = ({ className = "" }) => {
  return (
    <div className={className}>
      <div className="w-full h-full bg-white/5 shimmer-dark relative">
        <div className="absolute inset-0 flex flex-col items-center p-6">
          <div className="h-[380px] w-full bg-white/[0.01] rounded-3xl"></div>
          <div className="h-3 w-28 bg-white/[0.01] mt-6"></div>
          <div className="h-3 w-8 bg-white/[0.01] mt-6"></div>
          <div className="h-3 w-20 bg-white/[0.01] mt-2"></div>
          <div className="w-36 bg-white/[0.01] mt-5 py-4 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ThemeShimmer;
