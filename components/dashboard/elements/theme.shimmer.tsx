import { NextPage } from "next";

interface Props {
  className?: string;
}

const ThemeShimmer: NextPage<Props> = ({ className = "" }) => {
  return (
    <div className={className}>
      <div className="w-full aspect-square bg-white/5 shine-dark"></div>
      <div className="h-3 w-32 bg-white/5 mt-6 shine-dark"></div>
      <div className="h-3 w-16 bg-white/5 mt-4 shine-dark"></div>
      <div className="h-3 w-28 bg-white/5 mt-4 shine-dark"></div>
      <div className="w-36 bg-white/5 mt-4 py-4 rounded-full shine-dark"></div>
    </div>
  );
};

export default ThemeShimmer;
