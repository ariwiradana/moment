import React, { FC } from "react";
import { dm } from "@/lib/fonts";
import { useSamaya } from "@/hooks/themes/useSamaya";

interface Props {
  state: useSamaya["state"];
}

const PreviewNav: FC<Props> = ({ state }) => {
  if (state.client)
    return (
      <>
        <nav className="fixed inset-x-0 z-[999]">
          <ul className="px-6 md:px-12 lg:px-24 flex items-center justify-center gap-8 h-16 md:h-20 bg-dashboard-dark bg-opacity-30 backdrop-blur-md">
            <li>
              <h1
                className={`${dm.className} text-xl lg:text-2xl font-bold text-white`}
              >
                Preview Undangan {state.client.theme?.category}
              </h1>
            </li>
          </ul>
        </nav>
      </>
    );
};

export default PreviewNav;
