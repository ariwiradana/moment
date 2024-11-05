import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  return (
    <>
      <div className="w-full h-full select-none">
        <div className="overflow-hidden">
          <div>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
