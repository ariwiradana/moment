import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="p-6 flex justify-center">
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

export default Loader;
