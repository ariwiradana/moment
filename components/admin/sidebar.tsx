import { montserrat } from "@/lib/fonts";
import Link from "next/link";
import React from "react";

const Sidebar: React.FC = () => {
  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <aside
      className={`flex flex-col w-64 bg-gray-800 text-white h-screen p-4 ${montserrat.className}`}
    >
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gray-700 flex items-center justify-center rounded-full">
          <span className="text-xl font-bold">M</span>
        </div>
        <h1 className="ml-2 text-xl font-bold">Meundang</h1>
      </div>
      <nav>
        <ul>
          <li className="p-4">
            <Link
              href="/admin/clients"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Clients
            </Link>
          </li>
          <li className="p-4">
            <Link
              href="/admin/themes"
              className="block p-2 hover:bg-gray-700 rounded"
            >
              Themes
            </Link>
          </li>
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto p-2 bg-red-600 hover:bg-red-700 rounded transition duration-200"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
