import { comforta } from "@/lib/fonts";
import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gray-100 p-4 ${comforta.className}`}
    >
      <div className="text-center">
        <h1 className="md:text-6xl text-4xl font-bold text-theme1-primary mb-4">
          404
        </h1>
        <p className="text-xl lg:text-2xl text-gray-700 mb-4">
          Oops! Page Not Found
        </p>
        <p className="text-base lg:text-lg text-gray-500 mb-8">
          The page you are looking for should include a project name (e.g.,
          /project-name).
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
