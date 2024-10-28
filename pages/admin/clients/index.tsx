import ButtonPrimary from "@/components/admin/elements/button.primary";
import AdminLayout from "@/components/admin/layouts";
import { useAdminClients } from "@/hooks/admin/useAdminClients";
import { montserrat } from "@/lib/fonts";
import { getInitial } from "@/utils/getInitial";
import moment from "moment";
import Link from "next/link";
import React from "react";
import {
  BiCheckSquare,
  BiEditAlt,
  BiLink,
  BiMessageAdd,
  BiMoney,
  BiMoneyWithdraw,
  BiPlus,
  BiSlideshow,
  BiSolidShow,
  BiTrash,
} from "react-icons/bi";
import Pagination from "@mui/material/Pagination";
import { getRandomColors } from "@/utils/getRandomColor";
import Loader from "@/components/admin/elements/loader";
import ImageShimmer from "@/components/image.shimmer";
import ButtonActionDialog from "@/components/admin/elements/button.action.dialog";
import { useRouter } from "next/router";
import ButtonText from "@/components/admin/elements/button.text";
import Cookies from "cookies";
import { GetServerSideProps } from "next";
import { isTokenExpired } from "@/lib/auth";

interface ClientDashboardProps {
  token: string | null;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ token }) => {
  const { state, actions } = useAdminClients(token);
  const router = useRouter();

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
                        {client.cover ? (
                          <div className="w-8 h-8 rounded-full flex justify-center items-center relative overflow-hidden">
                            <ImageShimmer
                              priority
                              alt={client.name}
                              src={client.cover}
                              fill
                              className="object-cover rounded-full overflow-hidden"
                            />
                          </div>
                        ) : (
                          <div
                            style={{
                              backgroundColor: getRandomColors(),
                            }}
                            className="w-8 h-8 rounded-full flex justify-center items-center font-medium text-white text-sm p-1"
                          >
                            {getInitial(client.name)}
                          </div>
                        )}

                        <div>
                          <h1 className="text-gray-800 font-semibold text-sm">
                            {client.name}
                          </h1>
                          <p className="text-gray-500 font-medium text-xs">
                            {client.slug}
                          </p>
                        </div>

                        {client.is_preview && (
                          <div>
                            <p className="bg-dashboard-primary text-dashboard-dark text-xs font-semibold px-2 py-[2px] rounded-lg">
                              Preview
                            </p>
                          </div>
                        )}
                        <Link
                          target="_bank"
                          href={`/${client.slug}?untuk=${encodeURIComponent(
                            "Nama Undangan"
                          )}`}
                          className="text-gray-500 text-lg"
                        >
                          <BiSolidShow />
                        </Link>
                      </div>

                      <div className="ml-2 flex items-center relative z-10">
                        <ButtonActionDialog>
                          {!client.is_preview && (
                            <ButtonText
                              onClick={() =>
                                actions.handleSetAsPreview(client.id as number)
                              }
                              size="small"
                              title="Set as Preview"
                              icon={<BiSlideshow className="text-base" />}
                            />
                          )}
                          {client.status === "completed" && (
                            <>
                              <ButtonText
                                onClick={() =>
                                  actions.handleCopyURL(
                                    `${window.location.hostname}${
                                      window.location.port
                                        ? `:${window.location.port}`
                                        : ""
                                    }/testimoni/${client?.slug}`
                                  )
                                }
                                size="small"
                                title="Copy Link Testimonial"
                                icon={<BiMessageAdd className="text-base" />}
                              />
                            </>
                          )}
                          {client.status === "paid" && (
                            <>
                              <ButtonText
                                onClick={() =>
                                  actions.handleSetCompletedStatus(
                                    client.id as number
                                  )
                                }
                                type="button"
                                size="small"
                                title="Mark as Completed"
                                icon={<BiCheckSquare className="text-base" />}
                              />
                              <ButtonText
                                onClick={() =>
                                  actions.handleCopyURL(
                                    `${window.location.hostname}${
                                      window.location.port
                                        ? `:${window.location.port}`
                                        : ""
                                    }/${client?.slug}?untuk=Nama Undangan`
                                  )
                                }
                                type="button"
                                size="small"
                                title="Copy Invitation Link"
                                icon={<BiLink className="text-base" />}
                              />
                            </>
                          )}
                          {client.status === "unpaid" && (
                            <>
                              <ButtonText
                                onClick={() =>
                                  actions.handleCopyURL(
                                    `${window.location.hostname}${
                                      window.location.port
                                        ? `:${window.location.port}`
                                        : ""
                                    }/pembayaran/${client?.slug}`
                                  )
                                }
                                size="small"
                                title="Copy Link Payment"
                                icon={<BiMoney className="text-base" />}
                              />
                              <ButtonText
                                onClick={() =>
                                  actions.handleSetPaidStatus(
                                    client.id as number
                                  )
                                }
                                type="button"
                                size="small"
                                title="Mark as Paid"
                                icon={<BiMoneyWithdraw className="text-base" />}
                              />
                            </>
                          )}

                          <ButtonText
                            onClick={() =>
                              router.push(`/admin/clients/${client.slug}`)
                            }
                            size="small"
                            title="Detail"
                            icon={<BiEditAlt className="text-base" />}
                          />
                          <ButtonText
                            type="button"
                            onClick={() =>
                              client.id && actions.handleDelete(client.id)
                            }
                            size="small"
                            title="Delete"
                            icon={<BiTrash className="text-base" />}
                          />
                        </ButtonActionDialog>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 flex flex-col gap-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {client.events.map((event) => (
                        <div key={`event-${event.id}`}>
                          <p className="text-gray-500 font-medium text-xs">
                            {moment(event.date).format("dddd, D MMM YYYY")}
                          </p>
                          <h1 className="text-gray-800 font-semibold text-sm capitalize">
                            {event.name}
                          </h1>
                        </div>
                      ))}
                      <div>
                        <p className="text-gray-500 font-medium text-xs">
                          Status
                        </p>
                        <p className="text-gray-800 font-semibold text-sm capitalize">
                          {client.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium text-xs">
                          Package
                        </p>
                        <p className="text-gray-800 font-semibold text-sm capitalize">
                          {client.packages?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium text-xs">
                          Theme
                        </p>
                        <p className="text-gray-800 font-semibold text-sm">
                          {client.theme?.name ?? "-"}
                        </p>
                      </div>
                    </div>
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
                        Event(s)
                      </td>
                      <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                        Package
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
                            <div className="flex items-center gap-x-3">
                              {client.cover ? (
                                <div className="w-10 h-10 rounded-full flex justify-center items-center relative overflow-hidden">
                                  <ImageShimmer
                                    sizes="40px"
                                    priority
                                    alt={client.name}
                                    src={client.cover}
                                    fill
                                    className="object-cover rounded-full overflow-hidden"
                                  />
                                </div>
                              ) : (
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
                              )}

                              <div>
                                <span>{client.name}</span>
                                <p className="text-gray-500 font-medium text-xs">
                                  {client.slug}
                                </p>
                              </div>
                              {client.is_preview && (
                                <div>
                                  <p className="bg-dashboard-primary text-dashboard-dark text-xs font-semibold px-2 py-[2px] rounded-lg">
                                    Preview
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="ml-2 flex items-center relative z-10">
                              <Link
                                target="_bank"
                                href={`/${
                                  client.slug
                                }?untuk=${encodeURIComponent("Nama Undangan")}`}
                                className="text-gray-500 text-lg"
                              >
                                <BiSolidShow />
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          <div className="grid grid-cols-2 gap-4">
                            {client.events.map((event) => (
                              <div key={`event-desktop-${event.id}`}>
                                <h1>{event.name}</h1>
                                <p className="text-gray-500 font-medium text-xs">
                                  {moment(event.date).format(
                                    "dddd, D MMM YYYY"
                                  )}
                                </p>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          <div className="flex">
                            <p
                              className={`text-admin-dark  bg-gray-200 rounded-lg font-semibold px-3 py-1 text-sm`}
                            >
                              {client.packages?.name}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          <div className="flex items-center">
                            <div
                              className={`${
                                client.status === "paid"
                                  ? "bg-admin-success/10"
                                  : client.status === "completed"
                                  ? "bg-admin-primary/10"
                                  : "bg-admin-hover-dark/10"
                              } px-3 py-1 rounded-lg flex items-center gap-x-2`}
                            >
                              <div
                                className={`w-2 h-2 rounded-lg ${
                                  client.status === "paid"
                                    ? "bg-admin-success"
                                    : client.status === "completed"
                                    ? "bg-admin-primary"
                                    : "bg-admin-hover-dark/30"
                                }`}
                              ></div>
                              <span className="capitalize text-admin-hover-dark">
                                {client.status}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          {client.theme?.name ?? "-"}
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          <ButtonActionDialog>
                            {!client.is_preview && (
                              <ButtonText
                                onClick={() =>
                                  actions.handleSetAsPreview(
                                    client.id as number
                                  )
                                }
                                size="medium"
                                title="Set as Preview"
                                icon={<BiSlideshow className="text-base" />}
                              />
                            )}
                            {client.status === "completed" && (
                              <>
                                <ButtonText
                                  onClick={() =>
                                    actions.handleCopyURL(
                                      `${window.location.hostname}${
                                        window.location.port
                                          ? `:${window.location.port}`
                                          : ""
                                      }/testimoni/${client?.slug}`
                                    )
                                  }
                                  size="medium"
                                  title="Copy Link Testimonial"
                                  icon={<BiMessageAdd className="text-base" />}
                                />
                              </>
                            )}
                            {client.status === "paid" && (
                              <>
                                <ButtonText
                                  onClick={() =>
                                    actions.handleSetCompletedStatus(
                                      client.id as number
                                    )
                                  }
                                  type="button"
                                  size="medium"
                                  title="Mark as Completed"
                                  icon={<BiCheckSquare className="text-base" />}
                                />
                                <ButtonText
                                  onClick={() =>
                                    actions.handleCopyURL(
                                      `${window.location.hostname}${
                                        window.location.port
                                          ? `:${window.location.port}`
                                          : ""
                                      }/${client?.slug}?untuk=Nama Undangan`
                                    )
                                  }
                                  type="button"
                                  size="medium"
                                  title="Copy Invitation Link"
                                  icon={<BiLink className="text-base" />}
                                />
                              </>
                            )}
                            {client.status === "unpaid" && (
                              <>
                                <ButtonText
                                  onClick={() =>
                                    actions.handleCopyURL(
                                      `${window.location.hostname}${
                                        window.location.port
                                          ? `:${window.location.port}`
                                          : ""
                                      }/pembayaran/${client?.slug}`
                                    )
                                  }
                                  size="medium"
                                  title="Copy Link Payment"
                                  icon={<BiMoney className="text-base" />}
                                />
                                <ButtonText
                                  onClick={() =>
                                    actions.handleSetPaidStatus(
                                      client.id as number
                                    )
                                  }
                                  type="button"
                                  size="medium"
                                  title="Mark as Paid"
                                  icon={
                                    <BiMoneyWithdraw className="text-base" />
                                  }
                                />
                              </>
                            )}

                            <ButtonText
                              onClick={() =>
                                router.push(`/admin/clients/${client.slug}`)
                              }
                              size="medium"
                              title="Detail"
                              icon={<BiEditAlt className="text-base" />}
                            />
                            <ButtonText
                              type="button"
                              onClick={() =>
                                client.id && actions.handleDelete(client.id)
                              }
                              size="medium"
                              title="Delete"
                              icon={<BiTrash className="text-base" />}
                            />
                          </ButtonActionDialog>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token") || null;

  if (token) {
    const isExpired = isTokenExpired(token);
    if (isExpired) {
      return {
        redirect: {
          destination: "/admin/login",
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
};

export default ClientDashboard;
