import { RotatingLines } from "react-loader-spinner";

const LoadingDark = () => {
  return (
    <div className="p-6 w-full h-dvh flex justify-center items-center bg-dashboard-dark">
      <RotatingLines
        strokeColor="#ffff"
        width="24"
        strokeWidth="3"
        animationDuration="1"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

export default LoadingDark;
