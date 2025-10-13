import { BiMenu } from "react-icons/bi";
import { FC } from "react";
import { montserrat } from "@/lib/fonts";
import ImageShimmer from "../image.shimmer";
import { useAdminSidebar } from "@/hooks/admin/useAdminSidebar";
import { getGreeting } from "@/utils/getGreeting";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import Link from "next/link";

const Navbar: FC = () => {
  const { isSidebarOpen, toggleSidebar } = useAdminSidebar();
  const { data: user } = useSWR("/api/auth/user", fetcher);

  const sanitizedUser = ((user as string) ?? "").replaceAll(/[^a-zA-Z]+/g, " ");
  return (
    <nav
      className={`${montserrat.className} px-6 md:px-8 h-16 lg:hidden border-b fixed inset-x-0 top-0 z-20 bg-white flex justify-between shadow-md`}
    >
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black bg-opacity-50 transition-all ease-in-out duration-500 ${
          isSidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />
      <div className="flex gap-x-4 items-center">
        <Link href="/">
          <div className="relative flex justify-center items-center aspect-square w-12">
            <ImageShimmer
              priority
              sizes="100px"
              alt="user-image"
              fill
              className="object-contain h-full w-full"
              src="/logo.png"
            />
          </div>
        </Link>
        <div>
          <h1 className="font-semibold text-admin-dark">{sanitizedUser}</h1>
          <p className="text-xs text-darkgray">
            {getGreeting()}, have a good day!
          </p>
        </div>
      </div>
      <button onClick={toggleSidebar}>
        <BiMenu className="text-lg" />
      </button>
    </nav>
  );
};

export default Navbar;
