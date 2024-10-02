import ButtonPrimary from "@/components/admin/elements/button.primary";
import ButtonSecondary from "@/components/admin/elements/button.secondary";
import AdminLayout from "@/components/admin/layouts";
import { useAdminThemes } from "@/hooks/admin/useAdminThemes";
import { montserrat } from "@/lib/fonts";
import { Pagination } from "@mui/material";
import Link from "next/link";
import React from "react";
import { BiPlus, BiShowAlt, BiTrash } from "react-icons/bi";

const ClientDashboard: React.FC = () => {
  const { state, actions } = useAdminThemes();

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
          {state.themes.map((theme) => (
            <div key={theme.id} className="border rounded-lg p-3">
              <div className="flex justify-between items-center pb-3 border-b">
                <h1 className="text-gray-800 font-semibold text-sm">
                  {theme.name}
                </h1>
              </div>
              <div className=" pt-3 flex justify-end gap-x-3">
                <Link target="_blank" href={`/themes/${theme.id}`}>
                  <ButtonPrimary
                    size="extrasmall"
                    title="Preview"
                    icon={<BiShowAlt className="text-base" />}
                  />
                </Link>
                <ButtonSecondary
                  size="extrasmall"
                  title="Delete"
                  icon={<BiTrash className="text-base" />}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="border border-gray-200 rounded-xl hidden lg:block">
          <table className="table-fixed overflow-x-auto w-full table">
            <thead>
              <tr>
                <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100 rounded-tl-xl">
                  Name
                </td>
                <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100 rounded-tr-xl">
                  Actions
                </td>
              </tr>
            </thead>
            <tbody>
              {state.themes.map((theme, index) => (
                <tr
                  key={theme.id}
                  className={`border-b ${
                    state.themes.length - 1 === index
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
        {state.toalRows > state.limit && (
          <div className="mt-6 flex justify-center">
            <Pagination
              page={state.page}
              onChange={actions.handleChangePagination}
              count={Math.ceil(state.toalRows / state.limit)}
              shape="rounded"
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ClientDashboard;
