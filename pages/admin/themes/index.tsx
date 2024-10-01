import ButtonPrimary from "@/components/admin/elements/button.primary";
import ButtonSecondary from "@/components/admin/elements/button.secondary";
import ButtonSecondaryIcon from "@/components/admin/elements/button.secondary.icon";
import AdminLayout from "@/components/admin/layouts";
import { useAdminThemes } from "@/hooks/admin/useAdminThemes";
import { montserrat } from "@/lib/fonts";
import Link from "next/link";
import React from "react";
import { BiPlus, BiTrash } from "react-icons/bi";

const ClientDashboard: React.FC = () => {
  const { themes } = useAdminThemes();

  return (
    <AdminLayout>
      <div className={`w-full ${montserrat.className}`}>
        <h1 className="text-2xl font-bold mb-4">Theme Dashboard</h1>

        <Link href="/admin/themes/create">
          <div className="mb-8">
            <ButtonPrimary
              size="small"
              title="Add"
              icon={<BiPlus className="text-lg" />}
            />
          </div>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
          {themes.map((theme) => (
            <div key={theme.id} className="border border-admin-border rounded-lg p-3 flex justify-between items-center">
              <h1 className="text-gray-800 font-semibold text-sm">
                {theme.name}
              </h1>
              <ButtonSecondaryIcon
                size="extrasmall"
                title="Delete"
                icon={<BiTrash className="text-base" />}
              />
            </div>
          ))}
        </div>

        <div className="border border-gray-200 px-2 pt-2 rounded-xl hidden lg:block">
          <table className="table-auto overflow-x-auto w-full table">
            <thead>
              <tr>
                <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100 rounded-l-lg">
                  Name
                </td>
                <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100 rounded-r-lg">
                  Actions
                </td>
              </tr>
            </thead>
            <tbody>
              {themes.map((theme, index) => (
                <tr
                  key={theme.id}
                  className={`border-b ${
                    themes.length - 1 === index
                      ? "border-b-transparent"
                      : "border-b-gray-200"
                  }`}
                >
                  <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                    {theme.name}
                  </td>
                  <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                    <div className="flex gap-x-2">
                      <ButtonSecondary
                        size="extrasmall"
                        title="Delete"
                        icon={<BiTrash className="text-base" />}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ClientDashboard;
