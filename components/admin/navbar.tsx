import { BiMenu } from "react-icons/bi";
import { FC } from "react";
import { montserrat } from "@/lib/fonts";
import ImageShimmer from "../image.shimmer";
import { useAdminSidebar } from "@/hooks/admin/useAdminSidebar";
import { getGreeting } from "@/utils/getGreeting";

const Navbar: FC = () => {
  const { isSidebarOpen, toggleSidebar } = useAdminSidebar();
  return (
    <nav
      className={`${montserrat.className} px-6 md:px-8 h-16 lg:hidden border-b fixed inset-x-0 top-0 z-10 bg-white flex justify-between`}
    >
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black bg-opacity-50 transition-all ease-in-out duration-500 ${
          isSidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />
      <div className="flex gap-x-4 items-center">
        <div className="rounded-full overflow-hidden relative flex justify-center items-center aspect-square w-10">
          <ImageShimmer
            priority
            sizes="100px"
            alt="user-image"
            fill
            className="object-cover h-full w-full rounded-full overflow-hidden"
            src="https://avatar.iran.liara.run/public/2"
          />
        </div>
        <div>
          <h1 className="font-semibold text-admin-dark">Admin</h1>
          <p className="text-xs text-darkgray">{getGreeting()}, have a good day!</p>
        </div>
      </div>
      <button onClick={toggleSidebar}>
        <BiMenu className="text-lg" />
      </button>
    </nav>
  );
};

export default Navbar;
