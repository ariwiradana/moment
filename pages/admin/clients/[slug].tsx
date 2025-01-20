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
  BiLockAlt,
  BiSolidPlusCircle,
  BiSolidShow,
  BiSolidUserCheck,
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
import Loader from "@/components/admin/elements/loader";
import InputChip from "@/components/admin/elements/input.chip";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";
import Cookies from "cookies";
import { isTokenExpired } from "@/lib/auth";
import { isYoutubeVideo } from "@/utils/isYoutubeVideo";
interface UpdateClientProps {
  slug: string;
  token: string | null;
}

const UpdateClient: React.FC<UpdateClientProps> = ({ slug, token }) => {
  const { state, actions } = useAdminUpdateClient(slug, token);

  return (
    <AdminLayout>
      <div className={`${montserrat.className}`}>
        <Link href="/admin/clients">
          <div className="flex items-center gap-x-1 text-gray-400">
            <BiLeftArrowAlt className="text-base" />
            <span className="text-sm font-medium">back</span>
          </div>
        </Link>
        <div className="flex flex-wrap items-center mb-8 mt-2 gap-3">
          <h1 className="text-2xl font-bold">Client</h1>

          {state.formData.status && (
            <div className="flex items-center text-gray-800 font-semibold text-sm">
              <div
                className={`${
                  state.formData.status === "paid"
                    ? "bg-admin-success/10"
                    : state.formData.status === "completed"
                    ? "bg-admin-primary/10"
                    : "bg-admin-hover-dark/10"
                } px-3 py-1 rounded-lg flex items-center gap-x-2 ${
                  montserrat.className
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-lg ${
                    state.formData.status === "paid"
                      ? "bg-admin-success"
                      : state.formData.status === "completed"
                      ? "bg-admin-primary"
                      : "bg-admin-hover-dark/30"
                  }`}
                ></div>
                <span className="capitalize text-admin-hover-dark">
                  {state.formData.status}
                </span>
              </div>
            </div>
          )}

          {state.user && state.formData.slug === state.user ? (
            <div className="text-gray-500 text-xl">
              <BiSolidUserCheck />
            </div>
          ) : null}

          <Link
            target="_bank"
            href={`/${state.formData.slug}`}
            className="text-gray-500 text-lg"
          >
            <BiSolidShow />
          </Link>
        </div>
        {state.isLoading ? (
          <div className="max-w-screen-md">
            <Loader />
          </div>
        ) : (
          <form
            className="mt-8 max-w-screen-md flex flex-col gap-y-4"
            onSubmit={actions.handleSubmit}
          >
            <Input
              value={state.formData.name}
              onChange={(e) =>
                actions.handleChangeClient(e.target.value, "name")
              }
              label="Client Name"
            />
            <div className="flex gap-4">
              <Input
                className="w-full"
                value={state.formData.slug}
                onChange={(e) =>
                  actions.handleChangeClient(e.target.value, "slug")
                }
                label="Slug"
              />
              <div className="flex gap-x-4 items-end w-full">
                {state.showChangePassword && (
                  <Input
                    className="w-full"
                    type="password"
                    value={state.formData.password}
                    onChange={(e) =>
                      actions.handleChangeClient(e.target.value, "password")
                    }
                    label="Password"
                  />
                )}
                <ButtonPrimary
                  icon={<BiLockAlt />}
                  onClick={actions.handleToggleShowPassword}
                  type="button"
                  size="small"
                  title={state.showChangePassword ? "Save" : "Change Password"}
                  className="mb-[10px]"
                />
              </div>
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
                value={state.formData.theme_category_id ?? ""}
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
              label="Theme"
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
                actions.handleChangeClient(
                  e.target.value,
                  "opening_description"
                )
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
                actions.handleChangeClient(
                  e.target.value,
                  "closing_description"
                )
              }
              label="Closing Description"
            />
            <h1 className="text-2xl font-bold mb-4 mt-8">File(s)</h1>
            <Input
              id="gallery"
              accept="image/*"
              type="file"
              multiple
              onChange={(e) =>
                actions.handleChangeClient(e.target.files as FileList, "images")
              }
              className="w-full"
              label="Gallery"
            />

            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-2">
              {Array.isArray(state.formData.gallery) &&
              state.formData.gallery.length > 0
                ? state.formData.gallery.map((img: string, index: number) => (
                    <div
                      className="relative w-full aspect-square group overflow-hidden"
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

                      <div className="absolute top-2 left-2 z-20 flex gap-2">
                        {state.formData.cover === img && (
                          <div className="h-5 px-2 rounded-md font-medium flex justify-center items-center text-center text-xs gap-x-1 backdrop-blur bg-admin-dark/30 text-white">
                            <BiImageAlt className="text-base font-medium" />
                            <span>Cover</span>
                          </div>
                        )}
                        {state.formData.seo === img && (
                          <div className="h-5 px-2 rounded-md font-medium flex justify-center items-center text-center text-xs gap-x-1 backdrop-blur bg-admin-dark/30 text-white">
                            <BiImageAlt className="text-base font-medium" />
                            <span>Seo</span>
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-4 invisible inset-x-0 w-full bg-admin-dark/80 rounded-b-lg overflow-hidden z-10 opacity-0 group-hover:bottom-0 group-hover:visible group-hover:opacity-100 transition-all ease-in-out duration-500 flex flex-col justify-center">
                        {state.formData.cover !== img && (
                          <button
                            onClick={() =>
                              actions.handleSetCover(
                                img,
                                state.formData.id as number
                              )
                            }
                            type="button"
                            disabled={state.loading || state.isLoading}
                            className="px-2 w-full font-medium hover:bg-admin-dark p-4 transition-colors ease-in-out duration-500 text-white flex justify-center items-center text-center text-xs gap-x-1"
                          >
                            <BiImageAdd className="text-base" />
                            <span>Set Cover Image</span>
                          </button>
                        )}
                        {state.formData.seo !== img && (
                          <button
                            onClick={() =>
                              actions.handleSetSeoImage(
                                img,
                                state.formData.id as number
                              )
                            }
                            type="button"
                            disabled={state.loading || state.isLoading}
                            className="px-2 w-full font-medium hover:bg-admin-dark p-4 transition-colors ease-in-out duration-500 text-white flex justify-center items-center text-center text-xs gap-x-1"
                          >
                            <BiImageAdd className="text-base" />
                            <span>Set Seo Image</span>
                          </button>
                        )}
                      </div>

                      <ImageShimmer
                        sizes="400px"
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
            <InputChip
              chips={state.videosForm}
              onChange={(value) => actions.handleChangeClient(value, "videos")}
              label="Video URL"
            />
            <Input
              id="cover-video"
              accept="video/*"
              type="file"
              onChange={(e) =>
                actions.handleChangeClient(
                  e.target.files?.length ? (e.target.files[0] as File) : "",
                  "cover-video"
                )
              }
              className="w-full"
              label="Cover Video"
            />

            {state.formData.videos && (
              <div className="grid gap-2 relative">
                {Array.isArray(state.formData.videos) &&
                state.formData.videos.length > 0
                  ? state.formData.videos.map((video) => {
                      const youtubeId = getYouTubeVideoId(video);
                      const isYouTubeVideo = isYoutubeVideo(video);

                      return (
                        <div className="relative" key={youtubeId}>
                          <div className="absolute top-2 right-2 z-20">
                            <button
                              onClick={() =>
                                actions.handleDeleteVideo(
                                  video,
                                  state.formData.id as number
                                )
                              }
                              type="button"
                              disabled={state.loading || state.isLoading}
                              className="w-5 h-5 rounded-full bg-white flex justify-center items-center"
                            >
                              <BiX />
                            </button>
                          </div>

                          {/* {!isYouTubeVideo && (
                            <div className="h-5 px-2 rounded-md font-medium flex justify-center items-center text-center text-xs gap-x-1 absolute top-3 left-2 z-20 backdrop-blur text-white">
                              <BiImageAlt className="text-base font-medium" />
                              <span>Video Cover</span>
                            </div>
                          )} */}

                          {isYouTubeVideo ? (
                            <div
                              key={youtubeId}
                              className="relative w-full aspect-video overflow-hidden rounded-lg"
                            >
                              <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=1&modestbranding=1&showinfo=0&rel=0&vq=hd1080`}
                                title={youtubeId as string}
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            </div>
                          ) : (
                            <video
                              src={video}
                              controls
                              className="w-full h-auto aspect-video rounded-lg"
                            />
                          )}
                        </div>
                      );
                    })
                  : null}
              </div>
            )}

            <Input
              id="music"
              accept="audio/mpeg"
              type="file"
              multiple
              onChange={(e) =>
                actions.handleChangeClient(
                  e.target.files?.length ? (e.target.files[0] as File) : "",
                  "music"
                )
              }
              className="w-full"
              label="Music"
            />

            {state.formData.music && (
              <div className="relative flex items-center gap-x-4">
                <audio
                  controls
                  className="rounded-lg bg-gray-100 aspect-video object-cover"
                >
                  <source
                    type="audio/mpeg"
                    src={state.formData.music as string}
                  />
                </audio>
                <ButtonPrimary
                  type="button"
                  onClick={() =>
                    actions.handleDeleteMusic(
                      state.formData.music as string,
                      state.formData.id as number
                    )
                  }
                  icon={<BiX />}
                  title="Remove"
                  size="small"
                />
              </div>
            )}

            <h1 className="text-2xl font-bold mb-4 mt-8">Event(s)</h1>
            <div className="flex flex-col gap-y-4">
              {state.formData.events.map((event, index) => (
                <Accordion
                  key={`event-${index}`}
                  title={`Event ${index + 1}`}
                  content={
                    <div className="flex flex-col gap-y-4">
                      <div className="flex flex-col lg:flex-row gap-4">
                        {state.formData.events[index].image &&
                        typeof state.formData.events[index].image ===
                          "string" ? (
                          <div className="relative md:w-36 lg:w-64 w-28 aspect-square">
                            <ImageShimmer
                              priority
                              alt={event.name}
                              src={state.formData.events[index].image as string}
                              fill
                              className="object-cover w-full rounded-lg"
                            />
                            <div className="absolute top-2 right-2 z-10">
                              <button
                                onClick={() =>
                                  actions.handleDeleteImageEvent(
                                    state.formData.events[index]
                                      .image as string,
                                    state.formData.events[index].id as number
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
                        ) : (
                          <></>
                        )}
                        <div className="flex flex-col gap-4 w-full">
                          <Input
                            value={state.formData.events[index].name}
                            onChange={(e) =>
                              actions.handleChangeEvent(
                                e.target.value,
                                "name",
                                index
                              )
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
                        </div>
                      </div>
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
                        value={state.formData.events[index].date}
                        onChange={(e) =>
                          actions.handleChangeEvent(
                            e.target.value,
                            "date",
                            index
                          )
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
                      {event.id && (
                        <div className="flex">
                          <ButtonPrimary
                            type="button"
                            onClick={() =>
                              actions.handleDeleteEvent(event.id as number)
                            }
                            size="small"
                            title="Remove"
                            icon={<BiX />}
                          />
                        </div>
                      )}
                    </div>
                  }
                />
              ))}
              <div className="">
                <ButtonSecondary
                  onClick={actions.handleAddAnotherEvent}
                  type="button"
                  title="Add Another"
                  size="small"
                  icon={<BiSolidPlusCircle />}
                />
              </div>
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
                          <div className="md:w-36 lg:w-64 w-28 aspect-square relative">
                            <ImageShimmer
                              priority
                              alt={participant.name}
                              src={
                                state.formData.participants[index]
                                  .image as string
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
                            state.formData.participants[index].child ??
                            undefined
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

                      <h1 className="text-base font-bold mt-6">Social Media</h1>
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
                            state.formData.participants[index].twitter as string
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
                            state.formData.participants[index].tiktok as string
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
                      {participant.id && (
                        <div className="flex">
                          <ButtonPrimary
                            type="button"
                            onClick={() =>
                              actions.handleDeleteParticipant(
                                participant.id as number,
                                participant.image as string
                              )
                            }
                            size="small"
                            title="Remove"
                            icon={<BiX />}
                          />
                        </div>
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

            <div className="flex justify-end mt-6 bg-gray-50 border p-4 rounded-lg">
              <ButtonPrimary
                isloading={state.loading || state.isLoading}
                type="submit"
                title="Update Client"
                icon={<BiEdit />}
              />
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;

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
      slug,
      token,
    },
  };
};

export default UpdateClient;
