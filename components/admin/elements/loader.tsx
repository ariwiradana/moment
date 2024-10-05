import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

const Loader = () => {
  return (
    <div className="p-6 flex justify-center text-admin-dark">
      <BiLoaderAlt className="animate-spin text-2xl" />
    </div>
  );
};

export default Loader;
