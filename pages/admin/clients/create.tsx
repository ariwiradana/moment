import React from "react";
import { montserrat } from "@/lib/fonts";
import AdminLayout from "@/components/admin/layouts";
import Input from "@/components/admin/elements/input";
import InputTextarea from "@/components/admin/elements/textarea";
import ButtonPrimary from "@/components/admin/elements/button.primary";
import {
  BiLeftArrowAlt,
  BiSolidPlusCircle,
  BiTime,
  BiUserPlus,
} from "react-icons/bi";
import Link from "next/link";
import ButtonSecondary from "@/components/admin/elements/button.secondary";
import Accordion from "@/components/admin/elements/accordion.button";
import { useAdminCreateClient } from "@/hooks/admin/useAdminCreateClient";
import InputSelect from "@/components/admin/elements/select";
import { GenderOptions } from "@/constants/gender";
import { ChildOrderOptions } from "@/constants/childOrder";
import { roleOptions } from "@/constants/roles";
import InputChip from "@/components/admin/elements/input.chip";
import { isTokenExpired } from "@/lib/auth";
import { GetServerSideProps } from "next";
import Cookies from "cookies";

interface CreateClientProps {
  token: string | null;
}

const CreateClient: React.FC<CreateClientProps> = ({ token }) => {
  const { state, actions } = useAdminCreateClient(token);

  return (
    <AdminLayout>
      <div className={`${montserrat.className}`}>
        <Link href="/admin/clients">
          <div className="flex items-center gap-x-1 text-gray-400">
            <BiLeftArrowAlt className="text-base" />
            <span className="text-sm font-medium">kembali</span>
          </div>
        </Link>
        <h1 className="text-2xl font-bold mb-8 mt-2">Tambah Klien</h1>
        <form
          className="mt-8 max-w-screen-md flex flex-col gap-y-4"
          onSubmit={actions.handleSubmit}
        >
          <Input
            error={state.errors.name}
            value={state.formData.name}
            onChange={(e) => actions.handleChangeClient(e.target.value, "name")}
            label="Nama Klien"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              error={state.errors.slug}
              value={state.formData.slug}
              onChange={(e) =>
                actions.handleChangeClient(e.target.value, "slug")
              }
              label="Link Undangan"
            />
            <Input
              error={state.errors.password}
              value={state.formData.password}
              onChange={(e) =>
                actions.handleChangeClient(e.target.value, "password")
              }
              label="Kata Sansi"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <InputSelect
              options={state.themeOptions}
              value={state.formData.theme_id ?? ""}
              onChange={(e) =>
                actions.handleChangeClient(Number(e.target.value), "theme_id")
              }
              label="Tema"
            />
            <InputSelect
              options={state.themeCategoryOptions}
              value={(state.formData.theme_category_id as number) ?? ""}
              onChange={(e) =>
                actions.handleChangeClient(
                  Number(e.target.value),
                  "theme_category_id"
                )
              }
              label="Kategori Tema"
            />
          </div>
          <InputSelect
            options={state.packageOptions}
            value={state.formData.package_id ?? ""}
            onChange={(e) =>
              actions.handleChangeClient(Number(e.target.value), "package_id")
            }
            label="Paket"
          />
          <h1 className="text-2xl font-bold mb-4 mt-8">
            Kalimat Pembuka & Penutup
          </h1>
          <Input
            value={state.formData.opening_title}
            onChange={(e) =>
              actions.handleChangeClient(e.target.value, "opening_title")
            }
            label="Judul Pembuka"
          />
          <InputTextarea
            rows={6}
            value={state.formData.opening_description}
            onChange={(e) =>
              actions.handleChangeClient(e.target.value, "opening_description")
            }
            label="Deskripsi Pembuka"
          />
          <Input
            value={state.formData.closing_title}
            onChange={(e) =>
              actions.handleChangeClient(e.target.value, "closing_title")
            }
            label="Judul Penutup"
          />
          <InputTextarea
            rows={6}
            value={state.formData.closing_description}
            onChange={(e) =>
              actions.handleChangeClient(e.target.value, "closing_description")
            }
            label="Deskripsi Penutup"
          />
          <h1 className="text-2xl font-bold mb-4 mt-8">Foto & Video</h1>
          <Input
            id="gallery"
            accept="image/*"
            type="file"
            multiple
            onChange={(e) =>
              actions.handleChangeClient(e.target.files as FileList, "gallery")
            }
            className="w-full"
            label="Foto Galeri"
          />
          <div
            className={`grid md:${
              state.selectedTheme?.cover_video &&
              !state.formData.coverVideo &&
              ["Exclusive"].includes(state.selectedPackage?.name as string)
                ? "grid-cols-2"
                : "grid-cols-1"
            } gap-4`}
          >
            {!["Basic"].includes(state.selectedPackage?.name as string) && (
              <InputChip
                chips={state.formData.videos as string[]}
                onChange={(value) =>
                  actions.handleChangeClient(value, "videos")
                }
                label="Link Video Youtube"
              />
            )}
          </div>

          <h1 className="text-2xl font-bold mb-4 mt-8">Lagu Undangan</h1>

          <Input
            value={state.formData.music_title}
            onChange={(e) =>
              actions.handleChangeClient(e.target.value, "music_title")
            }
            label="Judul Lagu"
          />
          <Input
            accept="audio/mpeg"
            type="file"
            onChange={(e) =>
              actions.handleChangeClient(
                e.target.files?.length ? (e.target.files[0] as File) : "",
                "music"
              )
            }
            className="w-full"
            label="File lagu"
          />

          <h1 className="text-2xl font-bold mb-4 mt-8">Acara</h1>
          <div className="flex flex-col gap-y-4">
            {state.formData.events.map((event, index) => (
              <Accordion
                key={`event-${index}`}
                title={`Acara ${index + 1}`}
                content={
                  <div className="flex flex-col gap-y-4">
                    <Input
                      value={state.formData.events[index].name}
                      onChange={(e) =>
                        actions.handleChangeEvent(e.target.value, "name", index)
                      }
                      className="w-full"
                      label="Nama Acara"
                    />
                    <Input
                      accept="image/*"
                      type="file"
                      onChange={(e) =>
                        actions.handleChangeEvent(
                          e.target.files as FileList,
                          "image",
                          index
                        )
                      }
                      className="w-full"
                      label="Foto Acara"
                    />
                    <InputTextarea
                      rows={6}
                      value={state.formData.events[index].address}
                      onChange={(e) =>
                        actions.handleChangeEvent(
                          e.target.value,
                          "address",
                          index
                        )
                      }
                      label="Alamat"
                    />
                    <Input
                      value={state.formData.events[index].address_url}
                      onChange={(e) =>
                        actions.handleChangeEvent(
                          e.target.value,
                          "address_url",
                          index
                        )
                      }
                      className="w-full"
                      label="Link Google Maps"
                    />
                    <Input
                      value={state.formData.events[index].date}
                      onChange={(e) =>
                        actions.handleChangeEvent(e.target.value, "date", index)
                      }
                      className="w-full"
                      type="date"
                      label="Tanggal Acara"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                      <Input
                        value={state.formData.events[index].start_time}
                        onChange={(e) =>
                          actions.handleChangeEvent(
                            e.target.value,
                            "start_time",
                            index
                          )
                        }
                        className="w-full"
                        type="time"
                        label="Waktu Mulai"
                      />
                      <div className="flex justify-between gap-4 items-end">
                        {state.toggleEndTimes[index] ? (
                          <Input
                            disabled
                            value={state.formData.events[index].end_time}
                            onChange={(e) =>
                              actions.handleChangeEvent(
                                e.target.value,
                                "end_time",
                                index
                              )
                            }
                            className="w-full"
                            label="Waktu Selesai"
                          />
                        ) : (
                          <Input
                            type="time"
                            value={state.formData.events[index].end_time}
                            onChange={(e) =>
                              actions.handleChangeEvent(
                                e.target.value,
                                "end_time",
                                index
                              )
                            }
                            className="w-full"
                            label="Waktu Selesai"
                          />
                        )}

                        <div className="mb-[10px]">
                          <ButtonPrimary
                            icon={<BiTime />}
                            size="small"
                            title={
                              state.toggleEndTimes[index]
                                ? "Buat Waktu Selesai"
                                : "Hingga Selesai"
                            }
                            onClick={() => actions.handletoggleEndTime(index)}
                            type="button"
                            className="text-sm whitespace-nowrap"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
            ))}
            {state.formData.events.length <
            Number(state.selectedPackage?.max_events) ? (
              <div>
                <ButtonSecondary
                  onClick={actions.handleAddAnotherEvent}
                  type="button"
                  title="Tambah Acara Lainnya"
                  size="small"
                  icon={<BiSolidPlusCircle />}
                />
              </div>
            ) : null}
          </div>

          <h1 className="text-2xl font-bold mb-4 mt-8">Partisipan</h1>
          <div className="flex flex-col gap-y-4">
            {state.formData.participants.map((participant, index) => (
              <Accordion
                key={`participant-${index}`}
                title={`Partisipan ${index + 1}`}
                content={
                  <div className="flex flex-col gap-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        value={state.formData.participants[index].name}
                        className="w-full"
                        label="Nama Lengkap"
                        onChange={(e) =>
                          actions.handleChangeParticipant(
                            e.target.value,
                            "name",
                            index
                          )
                        }
                      />
                      <Input
                        value={state.formData.participants[index].nickname}
                        className="w-full"
                        label="Nama Panggilan"
                        onChange={(e) =>
                          actions.handleChangeParticipant(
                            e.target.value,
                            "nickname",
                            index
                          )
                        }
                      />
                    </div>
                    <Input
                      className="w-full"
                      type="file"
                      label="Foto"
                      onChange={(e) =>
                        actions.handleChangeParticipant(
                          e.target.files as FileList,
                          "image",
                          index
                        )
                      }
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        value={
                          state.formData.participants[index].parents_male ??
                          undefined
                        }
                        className="w-full"
                        label="Nama Ayah"
                        onChange={(e) =>
                          actions.handleChangeParticipant(
                            e.target.value,
                            "parents_male",
                            index
                          )
                        }
                      />
                      <Input
                        value={
                          state.formData.participants[index].parents_female ??
                          undefined
                        }
                        className="w-full"
                        label="Nama Ibu"
                        onChange={(e) =>
                          actions.handleChangeParticipant(
                            e.target.value,
                            "parents_female",
                            index
                          )
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <InputSelect
                        value={state.formData.participants[index].gender}
                        options={GenderOptions}
                        onChange={(e) =>
                          actions.handleChangeParticipant(
                            e.target.value,
                            "gender",
                            index
                          )
                        }
                        label="Jenis Kelamin"
                      />

                      <InputSelect
                        value={state.formData.participants[index].role}
                        options={roleOptions}
                        onChange={(e) =>
                          actions.handleChangeParticipant(
                            e.target.value,
                            "role",
                            index
                          )
                        }
                        label="Role"
                      />
                      <InputSelect
                        value={
                          state.formData.participants[index].child ?? undefined
                        }
                        options={ChildOrderOptions}
                        onChange={(e) =>
                          actions.handleChangeParticipant(
                            e.target.value,
                            "child",
                            index
                          )
                        }
                        label="Anak Ke"
                      />
                    </div>

                    <InputTextarea
                      rows={6}
                      value={state.formData.participants[index].address}
                      label="Alamat"
                      onChange={(e) =>
                        actions.handleChangeParticipant(
                          e.target.value,
                          "address",
                          index
                        )
                      }
                    />

                    {state.selectedPackage?.contact_social_media && (
                      <>
                        <h1 className="text-base font-bold mt-6">
                          Media Sosial
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            optional
                            value={
                              state.formData.participants[index]
                                .facebook as string
                            }
                            onChange={(e) =>
                              actions.handleChangeParticipant(
                                e.target.value,
                                "facebook",
                                index
                              )
                            }
                            label="Facebook"
                          />
                          <Input
                            optional
                            value={
                              state.formData.participants[index]
                                .twitter as string
                            }
                            onChange={(e) =>
                              actions.handleChangeParticipant(
                                e.target.value,
                                "twitter",
                                index
                              )
                            }
                            label="Twitter/X"
                          />
                          <Input
                            optional
                            value={
                              state.formData.participants[index]
                                .instagram as string
                            }
                            onChange={(e) =>
                              actions.handleChangeParticipant(
                                e.target.value,
                                "instagram",
                                index
                              )
                            }
                            label="Instagram"
                          />
                          <Input
                            optional
                            value={
                              state.formData.participants[index]
                                .tiktok as string
                            }
                            onChange={(e) =>
                              actions.handleChangeParticipant(
                                e.target.value,
                                "tiktok",
                                index
                              )
                            }
                            label="TikTok"
                          />
                        </div>
                      </>
                    )}
                  </div>
                }
              />
            ))}
            <div className="">
              <ButtonSecondary
                onClick={actions.handleAddAnotherParticipant}
                type="button"
                title="Tambah Partisipan Lainnya"
                size="small"
                icon={<BiSolidPlusCircle />}
              />
            </div>
          </div>
          {state.selectedPackage?.digital_envelope && (
            <>
              <h1 className="text-2xl font-bold mb-4 mt-8">Hadiah Digital</h1>
              <div className="grid md:grid-cols-3 gap-4">
                <Input
                  value={state.formData.gift_bank_name}
                  onChange={(e) =>
                    actions.handleChangeClient(e.target.value, "gift_bank_name")
                  }
                  label="Nama Bank / Platform"
                />
                <Input
                  value={state.formData.gift_account_name}
                  onChange={(e) =>
                    actions.handleChangeClient(
                      e.target.value,
                      "gift_account_name"
                    )
                  }
                  label="Nama Akun"
                />
                <Input
                  value={state.formData.gift_account_number}
                  onChange={(e) =>
                    actions.handleChangeClient(
                      e.target.value,
                      "gift_account_number"
                    )
                  }
                  label="Nomor Akun"
                />
              </div>
            </>
          )}
          <div className="flex justify-end mt-6 bg-gray-50 border p-4 rounded-lg">
            <ButtonPrimary
              isloading={state.loading}
              type="submit"
              title="Tambah Klien"
              icon={<BiUserPlus />}
            />
          </div>
        </form>
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

export default CreateClient;
