import AdminLayout from "@/components/admin/layouts";
import { useAdminClients } from "@/hooks/admin/useAdminClients";
import { montserrat } from "@/lib/fonts";
import { getInitial } from "@/utils/getInitial";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  BiEditAlt,
  BiLink,
  BiMessageAdd,
  BiPlus,
  BiShow,
  BiSlideshow,
  BiTrash,
  BiUserPlus,
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
import InputSelect from "@/components/admin/elements/select";
import { clientStatus } from "@/constants/status";
import ButtonPrimary from "@/components/admin/elements/button.primary";

interface ClientDashboardProps {
  token: string | null;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ token }) => {
  const { state, actions } = useAdminClients(token);
  const router = useRouter();

  const [baseURL, setBaseURL] = useState<string>("");

  useEffect(() => {
    const url = `${window.location.protocol}//${window.location.hostname}${
      window.location.port ? `:${window.location.port}` : ""
    }`;
    setBaseURL(url);
  }, []);

  return (
    <AdminLayout>
      <div className={`w-full ${montserrat.className}`}>
        <h1 className="text-2xl font-bold mb-4">Dashboard Klien</h1>
        <Link href="/admin/clients/create">
          <div>
            <ButtonPrimary
              size="small"
              title="Tambah Klien"
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
                          <h1 className="text-gray-800 font-semibold text-sm line-clamp-1">
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
                      </div>

                      <div className="flex items-center relative gap-x-2">
                        <ButtonActionDialog>
                          <Link
                            href={`/${client.slug}`}
                            target="_blank"
                            aria-label={`Live preview undangan tema ${client.theme?.name}`}
                          >
                            <ButtonText
                              size="small"
                              title="Live Preview"
                              icon={<BiShow className="text-base" />}
                            />
                          </Link>

                          {client.status === "done" && (
                            <>
                              <ButtonText
                                onClick={() =>
                                  actions.handleCopyURL(
                                    `${baseURL}/${client?.slug}/testimoni/`
                                  )
                                }
                                size="small"
                                title="Salin Link Testimonial"
                                icon={<BiMessageAdd className="text-base" />}
                              />
                            </>
                          )}
                          {client.status === "active" && (
                            <>
                              <ButtonText
                                onClick={() =>
                                  actions.handleCopyURL(
                                    `${baseURL}/${client?.slug}/tamu`
                                  )
                                }
                                size="small"
                                title="Salin Link Tambah Tamu"
                                icon={<BiUserPlus className="text-base" />}
                              />
                              <ButtonText
                                onClick={() =>
                                  actions.handleCopyURL(
                                    `${baseURL}/${client?.slug}`
                                  )
                                }
                                type="button"
                                size="small"
                                title="Salin Link Undangan"
                                icon={<BiLink className="text-base" />}
                              />
                            </>
                          )}

                          <ButtonText
                            onClick={() =>
                              actions.handleSetAsPreview(
                                client.id as number,
                                !client.is_preview
                              )
                            }
                            size="small"
                            title={
                              client.is_preview
                                ? "Nonaktifkan Preview"
                                : "Aktifkan Preview"
                            }
                            icon={<BiSlideshow className="text-base" />}
                          />
                          <ButtonText
                            onClick={() =>
                              router.push(`/admin/clients/${client.slug}`)
                            }
                            size="small"
                            title="Lihat Detail"
                            icon={<BiEditAlt className="text-base" />}
                          />
                          {client.status === "inactive" && (
                            <ButtonText
                              type="button"
                              onClick={() =>
                                client.id && actions.handleDelete(client.id)
                              }
                              size="small"
                              title="Hapus Klien"
                              icon={<BiTrash className="text-base" />}
                            />
                          )}
                        </ButtonActionDialog>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 flex flex-col gap-y-2 w-full">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-gray-500 font-medium text-xs">
                          Acara
                        </p>
                        <p className="text-gray-800 font-semibold text-sm capitalize">
                          {client.events.length} Acara
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium text-xs">
                          Paket
                        </p>
                        <p className="text-gray-800 font-semibold text-sm capitalize">
                          {client.package?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium text-xs">
                          Tema
                        </p>
                        <p className="text-gray-800 font-semibold text-sm">
                          {client.theme?.name ?? "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium text-xs">
                          Kategori Tema
                        </p>
                        <p className="text-gray-800 font-semibold text-sm">
                          {client.theme_category?.name ?? "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium text-xs">
                          Telepon
                        </p>
                        <p className="text-gray-800 font-semibold text-sm capitalize">
                          {client.phone || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium text-xs">
                          Status Klien
                        </p>
                        <div className="flex">
                          <InputSelect
                            full={false}
                            inputSize="extrasmall"
                            options={clientStatus}
                            value={client.status}
                            onChange={(e) =>
                              actions.handleChangeStatus(
                                client.id as number,
                                e.target.value
                              )
                            }
                          />
                        </div>
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
                        Klien
                      </td>
                      <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                        Order
                      </td>
                      <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                        Tema
                      </td>
                      <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                        Acara
                      </td>
                      <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                        Paket
                      </td>
                      <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100">
                        Status
                      </td>
                      <td className="px-4 py-1 text-gray-600 font-medium text-sm bg-gray-100 rounded-tr-xl">
                        Aksi
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
                                <span className="whitespace-nowrap">
                                  {client.name}
                                </span>
                                <p className="text-gray-600 font-medium text-sm">
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
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          {client.order ? (
                            <div className="flex">
                              <span
                                className={`capitalize text-xs font-semibold px-2 py-[2px] rounded-lg ${
                                  client.order?.status === "pending"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : client.order?.status === "settlement"
                                    ? "bg-green-100 text-green-600"
                                    : client.order?.status === "expire"
                                    ? "bg-red-100 text-red-600"
                                    : client.order?.status === "cancel"
                                    ? "bg-gray-100 text-gray-600"
                                    : client.order?.status === "deny"
                                    ? "bg-red-200 text-red-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {client.order?.status}
                              </span>
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          <p>{client.theme?.name ?? "-"}</p>
                          <p className="text-gray-500 font-medium text-xs">
                            {client.theme_category?.name ?? "-"}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          <h1>{client.events.length} Acara</h1>
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          <div className="flex">
                            <p
                              className={`text-admin-dark  bg-gray-200 rounded-lg font-semibold px-3 py-1 text-sm`}
                            >
                              {client.package?.name}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          <InputSelect
                            inputSize="extrasmall"
                            options={clientStatus}
                            value={client.status}
                            onChange={(e) =>
                              actions.handleChangeStatus(
                                client.id as number,
                                e.target.value
                              )
                            }
                          />
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-semibold text-sm">
                          <ButtonActionDialog>
                            <Link
                              href={`/${client.slug}`}
                              target="_blank"
                              aria-label={`Live preview undangan tema ${client.theme?.name}`}
                            >
                              <ButtonText
                                size="medium"
                                title="Live Preview"
                                icon={<BiShow className="text-base" />}
                              />
                            </Link>
                            {client.status === "done" && (
                              <>
                                <ButtonText
                                  onClick={() =>
                                    actions.handleCopyURL(
                                      `${baseURL}/${client?.slug}/testimoni`
                                    )
                                  }
                                  size="medium"
                                  title="Salin Link Testimonial"
                                  icon={<BiMessageAdd className="text-base" />}
                                />
                              </>
                            )}
                            {client.status === "active" && (
                              <>
                                <ButtonText
                                  onClick={() =>
                                    actions.handleCopyURL(
                                      `${baseURL}/${client?.slug}/tamu`
                                    )
                                  }
                                  size="medium"
                                  title="Salin Link Tambah Tamu"
                                  icon={<BiUserPlus className="text-base" />}
                                />

                                <ButtonText
                                  onClick={() =>
                                    actions.handleCopyURL(
                                      `${baseURL}/${client?.slug}`
                                    )
                                  }
                                  type="button"
                                  size="medium"
                                  title="Salin Link Undangan"
                                  icon={<BiLink className="text-base" />}
                                />
                              </>
                            )}
                            <ButtonText
                              onClick={() =>
                                actions.handleSetAsPreview(
                                  client.id as number,
                                  !client.is_preview
                                )
                              }
                              size="medium"
                              title={
                                client.is_preview
                                  ? "Nonaktifkan Preview"
                                  : "Aktifkan Preview"
                              }
                              icon={<BiSlideshow className="text-base" />}
                            />
                            <ButtonText
                              onClick={() =>
                                router.push(`/admin/clients/${client.slug}`)
                              }
                              size="medium"
                              title="Lihat Detail"
                              icon={<BiEditAlt className="text-base" />}
                            />
                            {client?.status === "inactive" && (
                              <ButtonText
                                type="button"
                                onClick={() =>
                                  client.id && actions.handleDelete(client.id)
                                }
                                size="medium"
                                title="Hapus Klien"
                                icon={<BiTrash className="text-base" />}
                              />
                            )}
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
  const role = cookies.get("role") || null;

  if (token && role) {
    const isExpired = isTokenExpired(token);
    if (isExpired) {
      return {
        redirect: {
          destination: "/admin/login",
          permanent: false,
        },
      };
    }
    if (role !== "admin") {
      cookies.set("token", "", { maxAge: -1, path: "/" });
      cookies.set("user", "", { maxAge: -1, path: "/" });
      cookies.set("role", "", { maxAge: -1, path: "/" });
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
