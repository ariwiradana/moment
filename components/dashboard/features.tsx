import React, { useState } from "react";
import { redhat } from "@/lib/fonts";
import { BsChevronDown } from "react-icons/bs";
import { features } from "@/constants/features";

const FeaturesComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <section
      data-aos="fade-up"
      id="section2"
      className="py-8 lg:py-16 px-4 md:px-12 lg:px-0 relative select-none"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 max-w-screen-xl mx-auto gap-6">
        {(isExpanded ? features : features.slice(0, 4)).map((f) => (
          <div
            className="flex flex-col lg:flex-row gap-2 lg:gap-4"
            key={`Tema ${f.title}`}
          >
            <div className="h-12 w-12 aspect-square rounded-full text-lg lg:text-xl flex justify-center items-center border border-zinc-300 text-dashboard-dark">
              {f.icon}
            </div>
            <div>
              <h5
                className={`${redhat.className} text-base text-dashboard-dark font-semibold`}
              >
                {f.title}
              </h5>
              <p
                className={`${redhat.className} text-sm text-dashboard-dark/70 mt-1`}
              >
                {f.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {!isExpanded && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setIsExpanded((state) => !state)}
            className={`${redhat.className} text-xs flex items-center gap-x-2 outline-none border whitespace-nowrap border-zinc-400 rounded-full px-4 py-2`}
          >
            Tampilkan Semua Fitur
            <BsChevronDown />
          </button>
        </div>
      )}
    </section>
  );
};

export default FeaturesComponent;
