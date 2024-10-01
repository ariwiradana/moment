import React, { FC, ReactNode } from "react";
import Sidebar from "./sidebar";

interface Props {
  children: ReactNode;
}

const AdminLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8">{children}</div>
    </div>
  );
};

export default AdminLayout;
