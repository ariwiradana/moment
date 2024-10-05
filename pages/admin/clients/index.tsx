import ButtonPrimary from "@/components/admin/elements/button.primary";
import ButtonSecondary from "@/components/admin/elements/button.secondary";
import AdminLayout from "@/components/admin/layouts";
import { useAdminClients } from "@/hooks/admin/useAdminClients";
import { montserrat } from "@/lib/fonts";
import { getInitial } from "@/utils/getInitial";
import moment from "moment";
import Link from "next/link";
import React from "react";
import {
  BiDetail,
  BiMoneyWithdraw,
  BiPlus,
  BiSolidShow,
  BiTrash,
} from "react-icons/bi";
import Pagination from "@mui/material/Pagination";
import { getRandomColors } from "@/utils/getRandomColor";
import Loader from "@/components/admin/elements/loader";

const ClientDashboard: React.FC = () => {
  const { state, actions } = useAdminClients();

  return (
    <AdminLayout>
      <div className={`w-full ${montserrat.className}`}>
        <h1 className="text-2xl font-bold mb-4">Client Dashboard</h1>

        <Link href="/admin/clients/create">
          <div>
            <ButtonPrimary
              size="small"
              title="Add"
              icon={<BiPlus className="text-lg" />}
            />
          </div>
        </Link>

        {state.isLoading ? (
          <Loader />
        ) : (
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
              {state.clients.map((client) => (
                <div key={client.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <div className="flex justify-between items-center gap-x-2 w-full">
                      <div className="flex items-center gap-x-3">
                        <div
                          style={{
                            backgroundColor: getRandomColors(),
                          }}
                          className="w-8 h-8 rounded-full flex justify-center items-center font-medium text-white text-sm p-1"
                        >
                          {getInitial(client.name)}
                        </div>
                        <div>
                          <h1 className="text-gray-800 font-semibold text-sm">
                            {client.name}
                          </h1>
                          <p className="text-gray-500 font-medium text-xs">
                            {client.slug}
                          </p>
                        </div>
                      </div>
                      <div className="ml-2 flex items-center">
                        <Link
                          target="_bank"
                          href={`/${client.slug}`}
                          className="text-gray-500 text-lg"
                        >
                          <BiSolidShow />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="py-3 flex flex-col gap-y-2">
                    <div>
                      <p className="text-gray-500 font-medium text-xs">
                        Status
                      </p>
                      <p className="text-gray-800 font-semibold text-sm capitalize">
                        {client.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium text-xs">Date</p>
                      <p className="text-gray-800 font-semibold text-sm">
                        {moment(client.date).format("D MMM YYYY")}
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
                    {client.status === "unpaid" && (
                      <ButtonPrimary
                        onClick={() =>
                          actions.handleSetPaidStatus(client.id as number)
                        }
                        type="button"
                        size="extrasmall"
                        title="Paid"
                        icon={<BiMoneyWithdraw className="text-base" />}
                      />
                    )}
                    <Link href={`/admin/clients/${client.slug}`}>
                      <ButtonSecondary
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
                        Status
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
                          <div className="flex justify-between gap-x-3">
                            <div className="flex gap-x-3">
                              <div
                                style={{
                                  backgroundColor: getRandomColors(),
                                }}
                                className="h-10 w-10 rounded-full aspect-square flex justify-center items-center text-base"
                              >
                                <span className="text-white font-medium">
                                  {getInitial(client.name)}
                                </span>
                              </div>
                              <div>
                                <span>{client.name}</span>
                                <p className="text-gray-500 font-medium text-xs">
                                  {client.slug}
                                </p>
                              </div>
                            </div>
                            <div className="ml-2 flex items-center">
                              <Link
                                target="_bank"
                                href={`/${client.slug}`}
                                className="text-gray-500 text-lg"
                              >
                                <BiSolidShow />
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          {moment(client.date).format("dddd, D MMM YYYY")}
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          {client.start_time} - {client.end_time}
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          <div className="flex items-center">
                            {client.status === "paid" ? (
                              <div className="bg-[#eefbf4] px-3 py-1 rounded-lg flex items-center gap-x-2">
                                <div className="w-2 h-2 rounded-lg bg-[#2cc971]"></div>
                                <span className="capitalize text-[#254e2e]">
                                  {client.status}
                                </span>
                              </div>
                            ) : (
                              <div className="bg-[#f7f7f9] px-3 py-1 rounded-lg flex items-center gap-x-2">
                                <div className="w-2 h-2 rounded-lg bg-[#d2d3de]"></div>
                                <span className="capitalize text-gray-800">
                                  {client.status}
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          {client.theme?.name ?? "-"}
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          <div className="flex gap-2">
                            {client.status === "unpaid" && (
                              <ButtonPrimary
                                onClick={() =>
                                  actions.handleSetPaidStatus(
                                    client.id as number
                                  )
                                }
                                type="button"
                                size="extrasmall"
                                title="Paid"
                                icon={<BiMoneyWithdraw className="text-base" />}
                              />
                            )}
                            <Link href={`/admin/clients/${client.slug}`}>
                              <ButtonSecondary
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
