import { RotatingLines } from "react-loader-spinner";

const LoadingComponent = () => {
  return (
    <div className="h-dvh w-full flex justify-center items-center bg-white">
      <RotatingLines
        strokeColor="#000"
        width="24"
        strokeWidth="3"
        animationDuration="1"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

export default LoadingComponent;
