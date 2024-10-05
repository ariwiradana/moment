import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

const Loading = () => {
  return (
    <div className="h-dvh w-screen bg-theme1-dark-chocolate flex justify-center items-center">
      <BiLoaderAlt className="text-3xl text-theme1-gold animate-spin" />
    </div>
  );
};

export default Loading;
