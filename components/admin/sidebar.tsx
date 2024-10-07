import Head from "next/head";
import { useRouter } from "next/router";
import { BiChat, BiFolder, BiLogOut, BiUser, BiX } from "react-icons/bi";
import ButtonPrimary from "./elements/button.primary";
import { FC } from "react";
import { montserrat } from "@/lib/fonts";
import { capitalizeWords } from "@/utils/capitalizeWords";
import ImageShimmer from "../image.shimmer";
import { useAdminSidebar } from "@/hooks/admin/useAdminSidebar";
import { getGreeting } from "@/utils/getGreeting";

type MenuItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const Sidebar: FC = () => {
  const router = useRouter();
  const { isSidebarOpen, toggleSidebar } = useAdminSidebar();

  const menuItems: MenuItem[] = [
    { name: "Clients", path: "/admin/clients", icon: <BiUser /> },
    { name: "Themes", path: "/admin/themes", icon: <BiFolder /> },
    { name: "RSVP & Wishes", path: "/admin/wishes", icon: <BiChat /> },
  ];

  const pageTitle = menuItems.find(
    (menu) => menu.path === router.pathname
  )?.name;

  return (
    <div className={montserrat.className}>
      <Head>
        <title>
          {pageTitle ?? capitalizeWords(router.pathname.split("/")[2] ?? "")}
        </title>
      </Head>
      <aside
        className={`lg:w-72 bg-white h-screen transition-all duration-300 ease-in-out shadow-lg divide-y divide-admin-border inset-y-0 z-30 fixed ${
          isSidebarOpen ? "left-0" : "-left-full lg:left-0"
        }`}
      >
        <nav className="flex items-center px-4 py-3 gap-3 md:gap-x-6 justify-center md:justify-between">
          <div className="flex gap-x-4 items-center">
            <div className="rounded-full overflow-hidden relative flex justify-center items-center aspect-square w-10 md:w-14">
              <ImageShimmer
                priority
                sizes="100px"
                alt="user-image"
                fill
                className="object-cover h-full w-full rounded-full overflow-hidden"
                src="https://avatar.iran.liara.run/public/2"
              />
            </div>
            <div className="pr-4">
              <h1 className="font-semibold text-admin-dark">Admin</h1>
              <p className="text-xs text-darkgray">
                {getGreeting()}, have a good day!
              </p>
            </div>
            <button
              className="self-start ml-4 outline-none md:hidden"
              onClick={toggleSidebar}
            >
              <BiX className="text-lg text-gray-500" />
            </button>
          </div>
        </nav>
        <nav className="p-4">
          <ul className="flex flex-col gap-y-3">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => {
                    toggleSidebar();
                    setTimeout(() => {
                      router.push(item.path);
                    }, 200);
                  }}
                  className={`flex items-center w-full justify-start p-3 transition duration-200 rounded-md border ${
                    router.pathname.split("/").includes(item.path.split("/")[2])
                      ? "bg-gray-100"
                      : "bg-white hover:bg-gray-100 border-transparent"
                  }`}
                >
                  <span className="text-lg text-admin-dark">{item.icon}</span>
                  <span className="ml-3 text-sm md:text-base font-medium">
                    {item.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="p-4">
          <div>
            <ButtonPrimary
              className="hidden md:flex"
              size="medium"
              title="Logout"
              icon={<BiLogOut />}
            />
            <ButtonPrimary
              className="md:hidden"
              size="small"
              title="Logout"
              icon={<BiLogOut />}
            />
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
