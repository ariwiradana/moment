import { satisfy } from "@/lib/fonts";
import React from "react";

const Loading = () => {
  return (
    <div
      className={`bg-[url('/images/theme1/pattern2.png')] bg-cover bg-no-repeat`}
    >
      <div className="text-center min-h-screen flex items-center justify-center bg-admin-hover-dark flex-col bg-opacity-[97%] p-6">
        <h1
          className={`text-3xl font-semibold mb-4 text-theme1-gold ${satisfy.className}`}
        >
          Loading...
        </h1>
      </div>
    </div>
  );
};

export default Loading;
