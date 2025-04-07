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
            <span className="text-sm font-medium">back</span>
          </div>
        </Link>
        <h1 className="text-2xl font-bold mb-8 mt-2">Add New Client</h1>
        <form
          className="mt-8 max-w-screen-md flex flex-col gap-y-4"
          onSubmit={actions.handleSubmit}
        >
          <Input
            error={state.errors.name}
            value={state.formData.name}
            onChange={(e) => actions.handleChangeClient(e.target.value, "name")}
            label="Client Name"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              error={state.errors.slug}
              value={state.formData.slug}
              onChange={(e) =>
                actions.handleChangeClient(e.target.value, "slug")
              }
              label="Slug"
            />
            <Input
              error={state.errors.password}
              value={state.formData.password}
              onChange={(e) =>
                actions.handleChangeClient(e.target.value, "password")
              }
              label="Password"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <InputSelect
              options={state.themeOptions}
              value={state.formData.theme_id ?? ""}
              onChange={(e) =>
                actions.handleChangeClient(Number(e.target.value), "theme_id")
              }
              label="Theme"
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
              label="Theme Category"
            />
          </div>
          <InputSelect
            options={state.packageOptions}
            value={state.formData.package_id ?? ""}
            onChange={(e) =>
              actions.handleChangeClient(Number(e.target.value), "package_id")
            }
            label="Package"
          />
          <h1 className="text-2xl font-bold mb-4 mt-8">Greeting(s)</h1>
          <Input
            value={state.formData.opening_title}
            onChange={(e) =>
              actions.handleChangeClient(e.target.value, "opening_title")
            }
            label="Opening Title"
          />
          <InputTextarea
            rows={6}
            value={state.formData.opening_description}
            onChange={(e) =>
              actions.handleChangeClient(e.target.value, "opening_description")
            }
            label="Opening Description"
          />
          <Input
            value={state.formData.closing_title}
            onChange={(e) =>
              actions.handleChangeClient(e.target.value, "closing_title")
            }
            label="Closing Title"
          />
          <InputTextarea
            rows={6}
            value={state.formData.closing_description}
            onChange={(e) =>
              actions.handleChangeClient(e.target.value, "closing_description")
            }
            label="Closing Description"
          />
          <h1 className="text-2xl font-bold mb-4 mt-8">Photo/Video(s)</h1>
          <Input
            id="gallery"
            accept="image/*"
            type="file"
            multiple
            onChange={(e) =>
              actions.handleChangeClient(e.target.files as FileList, "gallery")
            }
            className="w-full"
            label="Gallery"
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
                label="Youtube Video URL"
              />
            )}
            {state.selectedTheme?.cover_video ? (
              <Input
                accept="video/*"
                type="file"
                onChange={(e) =>
                  actions.handleChangeClient(
                    e.target.files?.length ? (e.target.files[0] as File) : "",
                    "coverVideo"
                  )
                }
                className="w-full"
                label="Cover Video"
              />
            ) : null}
          </div>

          <h1 className="text-2xl font-bold mb-4 mt-8">Music</h1>

          <Input
            value={state.formData.music_title}
            onChange={(e) =>
              actions.handleChangeClient(e.target.value, "music_title")
            }
            label="Title"
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
            label="File"
          />

          <h1 className="text-2xl font-bold mb-4 mt-8">Event(s)</h1>
          <div className="flex flex-col gap-y-4">
            {state.formData.events.map((event, index) => (
              <Accordion
                key={`event-${index}`}
                title={`Event ${index + 1}`}
                content={
                  <div className="flex flex-col gap-y-4">
                    <Input
                      value={state.formData.events[index].name}
                      onChange={(e) =>
                        actions.handleChangeEvent(e.target.value, "name", index)
                      }
                      className="w-full"
                      label="Name"
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
                      label="Image"
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
                      label="Address"
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
                      label="Address URL"
                    />
                    <Input
                      value={state.formData.events[index].date}
                      onChange={(e) =>
                        actions.handleChangeEvent(e.target.value, "date", index)
                      }
                      className="w-full"
                      type="date"
                      label="Date"
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
                        label="Start Time"
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
                            label="End Time"
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
                            label="End Time"
                          />
                        )}

                        <div className="mb-[10px]">
                          <ButtonPrimary
                            icon={<BiTime />}
                            size="small"
                            title={
                              state.toggleEndTimes[index]
                                ? "Set End Time"
                                : "Set Until Done"
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
                  title="Add Another"
                  size="small"
                  icon={<BiSolidPlusCircle />}
                />
              </div>
            ) : null}
          </div>

          <h1 className="text-2xl font-bold mb-4 mt-8">Participant(s)</h1>
          <div className="flex flex-col gap-y-4">
            {state.formData.participants.map((participant, index) => (
              <Accordion
                key={`participant-${index}`}
                title={`Participant ${index + 1}`}
                content={
                  <div className="flex flex-col gap-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        value={state.formData.participants[index].name}
                        className="w-full"
                        label="Full Name"
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
                        label="Nickname"
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
                      label="Image"
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
                        label="Parent Male Name"
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
                        label="Parent Female Name"
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
                        label="Gender"
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
                        label="Child Order"
                      />
                    </div>

                    <InputTextarea
                      rows={6}
                      value={state.formData.participants[index].address}
                      label="Address Full"
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
                          Social Media
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
                title="Add Another"
                size="small"
                icon={<BiSolidPlusCircle />}
              />
            </div>
          </div>
          {state.selectedPackage?.digital_envelope && (
            <>
              <h1 className="text-2xl font-bold mb-4 mt-8">Digital Gift</h1>
              <div className="grid md:grid-cols-3 gap-4">
                <Input
                  value={state.formData.gift_bank_name}
                  onChange={(e) =>
                    actions.handleChangeClient(e.target.value, "gift_bank_name")
                  }
                  label="Bank / Platform Name"
                />
                <Input
                  value={state.formData.gift_account_name}
                  onChange={(e) =>
                    actions.handleChangeClient(
                      e.target.value,
                      "gift_account_name"
                    )
                  }
                  label="Account Name"
                />
                <Input
                  value={state.formData.gift_account_number}
                  onChange={(e) =>
                    actions.handleChangeClient(
                      e.target.value,
                      "gift_account_number"
                    )
                  }
                  label="Account Number"
                />
              </div>
            </>
          )}
          <div className="flex justify-end mt-6 bg-gray-50 border p-4 rounded-lg">
            <ButtonPrimary
              isloading={state.loading}
              type="submit"
              title="Add Client"
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
