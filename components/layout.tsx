import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  pageTitle: string;
}

const Layout: FC<Props> = (props) => {
  return (
    <>
      <div className="w-full h-full">
        <div className="overflow-hidden">
          <div>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
