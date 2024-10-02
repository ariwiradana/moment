import ButtonPrimary from "@/components/admin/elements/button.primary";
import ButtonSecondary from "@/components/admin/elements/button.secondary";
import AdminLayout from "@/components/admin/layouts";
import { useAdminClients } from "@/hooks/admin/useAdminClients";
import { montserrat } from "@/lib/fonts";
import { getInitial } from "@/utils/getInitial";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { BiDetail, BiPlus, BiTrash } from "react-icons/bi";
import Pagination from "@mui/material/Pagination";

const ClientDashboard: React.FC = () => {
  const { state, actions } = useAdminClients();

  return (
    <AdminLayout>
      <div className={`w-full ${montserrat.className}`}>
        <h1 className="text-2xl font-bold mb-4">Client Dashboard</h1>

        <Link href="/admin/clients/create">
          <div className="mb-8">
            <ButtonPrimary
              size="small"
              title="Add"
              icon={<BiPlus className="text-lg" />}
            />
          </div>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
          {state.clients.map((client) => (
            <div key={client.id} className="border rounded-lg p-3">
              <div className="flex justify-between items-center pb-3 border-b">
                <h1 className="text-gray-800 font-semibold text-sm">
                  {client.name}
                </h1>
                <p className="bg-gray-50 border px-2 py-1 rounded-md text-gray-800 font-medium text-[13px]">
                  {moment(client.date).format("D MMM YYYY")}
                </p>
              </div>
              <div className="py-3 flex flex-col gap-y-2">
                <div>
                  <p className="text-gray-500 font-medium text-xs">Address</p>
                  <p className="text-gray-800 font-semibold text-sm">
                    {client.address_full}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-xs">Time</p>
                  <p className="text-gray-800 font-semibold text-sm">
                    {client.start_time} - {client.end_time}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-xs">Theme</p>
                  <p className="text-gray-800 font-semibold text-sm">
                    {client.theme?.name ?? "-"}
                  </p>
                </div>
              </div>
              <div className="border-t pt-3 flex justify-end gap-x-3">
                <Link href={`/admin/clients/${client.slug}`}>
                  <ButtonPrimary
                    size="extrasmall"
                    title="Detail"
                    icon={<BiDetail className="text-base" />}
                  />
                </Link>
                <ButtonSecondary
                  type="button"
                  onClick={() => client.id && actions.handleDelete(client.id)}
                  size="extrasmall"
                  title="Delete"
                  icon={<BiTrash className="text-base" />}
                />
              </div>
            </div>
          ))}
        </div>

        {state.toalRows > 0 && (
          <div className="border border-gray-200 rounded-xl hidden lg:block">
            <table className="table-auto overflow-x-auto w-full table">
              <thead>
                <tr>
                  <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100 rounded-tl-xl">
                    Client
                  </td>
                  <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                    Date
                  </td>
                  <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                    Time
                  </td>
                  <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                    Address
                  </td>
                  <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                    Theme
                  </td>
                  <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100 rounded-tr-xl">
                    Actions
                  </td>
                </tr>
              </thead>
              <tbody>
                {state.clients.map((client, index) => (
                  <tr
                    key={client.id}
                    className={`border-b ${
                      state.clients.length - 1 === index
                        ? "border-b-transparent"
                        : "border-b-gray-200"
                    }`}
                  >
                    <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                      <div className="flex items-center gap-x-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 aspect-square flex justify-center items-center text-base">
                          <span>{getInitial(client.name)}</span>
                        </div>
                        <span>{client.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                      {moment(client.date).format("dddd, D MMM YYYY")}
                    </td>
                    <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                      {client.start_time} - {client.end_time}
                    </td>
                    <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                      {client.address_full}
                    </td>
                    <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                      {client.theme?.name ?? "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                      <div className="flex gap-2">
                        <Link href={`/admin/clients/${client.slug}`}>
                          <ButtonPrimary
                            size="extrasmall"
                            title="Detail"
                            icon={<BiDetail className="text-base" />}
                          />
                        </Link>
                        <ButtonSecondary
                          type="button"
                          onClick={() =>
                            client.id && actions.handleDelete(client.id)
                          }
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
        )}

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
