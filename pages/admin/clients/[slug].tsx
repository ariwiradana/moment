import React from "react";
import { GetServerSideProps } from "next";
import { montserrat } from "@/lib/fonts";
import AdminLayout from "@/components/admin/layouts";
import Input from "@/components/admin/elements/input";
import InputTextarea from "@/components/admin/elements/textarea";
import ButtonPrimary from "@/components/admin/elements/button.primary";
import {
  BiEdit,
  BiImageAdd,
  BiImageAlt,
  BiLeftArrowAlt,
  BiSolidPlusCircle,
  BiTime,
  BiX,
} from "react-icons/bi";
import Link from "next/link";
import Accordion from "@/components/admin/elements/accordion.button";
import ButtonSecondary from "@/components/admin/elements/button.secondary";
import { useAdminUpdateClient } from "@/hooks/admin/useAdminUpdateClient";
import InputSelect from "@/components/admin/elements/select";
import { ChildOrderOptions } from "@/constants/childOrder";
import { GenderOptions } from "@/constants/gender";
import { roleOptions } from "@/constants/roles";
import ImageShimmer from "@/components/image.shimmer";

interface UpdateClientProps {
  slug: string;
}

const UpdateClient: React.FC<UpdateClientProps> = ({ slug }) => {
  const { state, actions } = useAdminUpdateClient(slug);

  return (
    <AdminLayout>
      <div className={`${montserrat.className}`}>
        <Link href="/admin/clients">
          <div className="flex items-center gap-x-1 text-gray-400">
            <BiLeftArrowAlt className="text-base" />
            <span className="text-sm font-medium">back</span>
          </div>
        </Link>
        <h1 className="text-2xl font-bold mb-8 mt-2">Update Client</h1>
        <form
          className="mt-8 max-w-screen-md flex flex-col gap-y-4"
          onSubmit={actions.handleSubmit}
        >
          <Input
            value={state.formData.name}
            onChange={(e) => actions.handleChangeClient(e.target.value, "name")}
            label="Client Name"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <Input
              value={state.formData.address}
              onChange={(e) =>
                actions.handleChangeClient(e.target.value, "address")
              }
              className="w-full"
              label="Address"
            />
            <Input
              value={state.formData.address_url}
              onChange={(e) =>
                actions.handleChangeClient(e.target.value, "address_url")
              }
              className="w-full"
              label="Address URL"
            />
          </div>
          <InputTextarea
            value={state.formData.address_full}
            onChange={(e) =>
              actions.handleChangeClient(e.target.value, "address_full")
            }
            label="Address Full"
          />
          <Input
            value={state.formData.date}
            onChange={(e) => actions.handleChangeClient(e.target.value, "date")}
            className="w-full"
            type="date"
            label="Date"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <Input
              value={state.formData.start_time}
              onChange={(e) =>
                actions.handleChangeClient(e.target.value, "start_time")
              }
              className="w-full"
              type="time"
              label="Start Time"
            />
            <div className="flex justify-between gap-4 items-end">
              {state.toggleEndTime ? (
                <Input
                  disabled
                  value={state.formData.end_time}
                  onChange={(e) =>
                    actions.handleChangeClient(e.target.value, "end_time")
                  }
                  className="w-full"
                  label="End Time"
                />
              ) : (
                <Input
                  type="time"
                  value={state.formData.end_time}
                  onChange={(e) =>
                    actions.handleChangeClient(e.target.value, "end_time")
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
                    state.toggleEndTime ? "Set End Time" : "Set Until Done"
                  }
                  onClick={actions.handletoggleEndTime}
                  type="button"
                  className="text-sm whitespace-nowrap"
                />
              </div>
            </div>
          </div>

          <InputSelect
            options={state.themeOptions}
            value={state.formData.theme_id ?? ""}
            onChange={(e) =>
              actions.handleChangeClient(Number(e.target.value), "theme_id")
            }
            label="Theme"
          />

          <Input
            accept="image/*"
            type="file"
            multiple
            onChange={(e) =>
              actions.handleChangeClient(e.target.files as FileList, "images")
            }
            className="w-full"
            label="Gallery"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Array.isArray(state.formData.gallery) &&
            state.formData.gallery.length > 0
              ? state.formData.gallery.map((img: string, index: number) => (
                  <div
                    className="relative w-full aspect-square group"
                    key={index}
                  >
                    <div className="absolute top-2 right-2 z-10">
                      <button
                        type="button"
                        onClick={() =>
                          actions.handleDeleteImageGallery(
                            img,
                            state.formData.id as number
                          )
                        }
                        disabled={state.loading || state.isLoading}
                        className="w-5 h-5 rounded-full bg-white flex justify-center items-center"
                      >
                        <BiX />
                      </button>
                    </div>
                    {state.formData.cover === img ? (
                      <div className="h-5 px-2 rounded-md font-medium flex justify-center items-center text-center text-xs gap-x-1 absolute bottom-2 left-2 z-20 backdrop-blur text-white">
                        <BiImageAlt className="text-base font-medium" />
                        <span>Cover</span>
                      </div>
                    ) : (
                      <div className="absolute -bottom-2 invisible left-2 z-10 opacity-0 group-hover:bottom-2 group-hover:visible group-hover:opacity-100 transition-all ease-in-out duration-500">
                        <button
                          onClick={() =>
                            actions.handleSetCover(
                              img,
                              state.formData.id as number
                            )
                          }
                          type="button"
                          disabled={state.loading || state.isLoading}
                          className="h-5 px-2 rounded-md font-medium bg-white flex justify-center items-center text-center text-xs gap-x-1"
                        >
                          <BiImageAdd className="text-base" />
                          <span>Set as Cover</span>
                        </button>
                      </div>
                    )}

                    <ImageShimmer
                      sizes="200px"
                      priority
                      alt={`gallery-${index + 1}`}
                      src={img}
                      fill
                      className="object-cover w-full rounded-lg"
                    />
                  </div>
                ))
              : null}
          </div>

          <h1 className="text-2xl font-bold mb-4 mt-8">Participant(s)</h1>
          <div className="flex flex-col gap-y-4">
            {state.formData.participants.map((participant, index) => (
              <Accordion
                key={`participant-${index}`}
                title={`Participant ${index + 1}`}
                content={
                  <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col lg:flex-row gap-x-6 gap-y-4">
                      {state.formData.participants[index].image &&
                      typeof state.formData.participants[index].image ===
                        "string" ? (
                        <div className="lg:w-64 w-28 aspect-square relative">
                          <ImageShimmer
                            priority
                            alt={participant.name}
                            src={
                              state.formData.participants[index].image as string
                            }
                            fill
                            className="object-cover w-full rounded-lg"
                          />
                          <div className="absolute top-2 right-2 z-10">
                            <button
                              onClick={() =>
                                actions.handleDeleteImageParticipant(
                                  state.formData.participants[index]
                                    .image as string,
                                  state.formData.participants[index]
                                    .id as number
                                )
                              }
                              type="button"
                              disabled={state.loading || state.isLoading}
                              className="w-5 h-5 rounded-full bg-white flex justify-center items-center"
                            >
                              <BiX />
                            </button>
                          </div>
                        </div>
                      ) : null}
                      <div className="w-full flex flex-col gap-y-4">
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
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        value={state.formData.participants[index].parents_male}
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
                          state.formData.participants[index].parents_female
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
                    <InputTextarea
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
                        value={state.formData.participants[index].child}
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
                    </div>
                    <Input
                      accept="image/*"
                      type="file"
                      onChange={(e) =>
                        actions.handleChangeParticipant(
                          e.target.files as FileList,
                          "image",
                          index
                        )
                      }
                      className="w-full"
                      label="Image"
                    />
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
          <div className="flex justify-end mt-6 bg-gray-50 border p-4 rounded-lg">
            <ButtonPrimary
              isloading={state.loading || state.isLoading}
              type="submit"
              title="Update Client"
              icon={<BiEdit />}
            />
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;

  return {
    props: {
      slug,
    },
  };
};

export default UpdateClient;
