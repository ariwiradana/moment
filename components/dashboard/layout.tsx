import React, { FC, ReactNode } from "react";
import Navbar from "./navbar";
import FooterComponent from "./footer";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen lg:min-h-full">{children}</main>
      <FooterComponent />
    </div>
  );
};

export default Layout;
