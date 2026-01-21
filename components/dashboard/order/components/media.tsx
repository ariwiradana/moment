import Input from "@/components/admin/elements/input";
import useOrderStore from "@/store/useOrderStore";
import { fileToBase64 } from "@/utils/fileToBase64";
import { imageFileToBase64 } from "@/utils/imageToBase64";
import Image from "next/image";
import React, { useRef } from "react";
import {
  BiEditAlt,
  BiImageAdd,
  BiMusic,
  BiTrashAlt,
  BiX,
} from "react-icons/bi";
import toast from "react-hot-toast";
import { isValidYouTube } from "@/utils/isValidYoutubeVideo";
import YoutubeEmbed from "@/components/themes/youtube.embed";
import { getYouTubeVideoId } from "@/utils/getYoutubeId";
import ButtonPrimary from "../../elements/button.primary";

const OrderMedia = () => {
  const store = useOrderStore();

  const galleryRef = useRef<HTMLInputElement>(null);
  const musicRef = useRef<HTMLInputElement>(null);

  // const handleChangeMedia = (name: string, value: string) => {
  //   let currentMedia = { ...store.form.media };
  //   currentMedia = {
  //     ...store.form.media,
  //     [name]: value,
  //   };
  //   store.setForm("media", currentMedia);
  // };

  const images = (store.form.gallery as string[]) || [];

  const handleChangeGallery = async (images: FileList) => {
    const base64Images = await Promise.all(
      Array.from(images).map((file) => imageFileToBase64(file)),
    );
    store.setForm("gallery", base64Images);
  };

  const videoURL = store.form.videos?.[0] as string;
  const videoId = getYouTubeVideoId(videoURL);

  console.log(store.form.videos);

  return (
    <>
      <div>
        <label
          htmlFor="input-image"
          className="block text-dashboard-dark/60 mb-1 text-sm"
        >
          Galeri Foto (Max {store.pkg?.max_gallery_photos} foto)
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {images.map((image, index) => (
            <div
              key={`${image}`}
              className="size-20 border border-zinc-200 border-dashed relative"
            >
              <button
                key={`${image}`}
                type="button"
                onClick={() => {
                  const newImages = [...images];
                  newImages.splice(index, 1);
                  store.setForm("gallery", newImages);
                }}
                className="absolute z-10 text-white -top-1.5 -right-1.5 size-5 flex items-center justify-center aspect-square rounded-full bg-admin-danger"
              >
                <BiX />
              </button>
              <Image
                src={image}
                className="object-contain"
                fill
                alt="Preview foto mempelai pria"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => galleryRef.current?.click()}
            className="size-20 bg-zinc-100 flex items-center justify-center border border-zinc-200 border-dashed"
          >
            <BiImageAdd className="size-6 text-dashboard-dark" />
          </button>
          <input
            multiple
            id="input-image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const files = e.target.files;
              if (!files) return;

              const maxFiles = store.pkg?.max_gallery_photos || 10;
              const dt = new DataTransfer();

              Array.from(files)
                .slice(0, maxFiles)
                .forEach((file) => dt.items.add(file));

              if (files.length > maxFiles) {
                toast.error(`Hanya ${maxFiles} foto yang akan dipilih.`);
              }

              handleChangeGallery(dt.files); // ✅ ini tetap FileList
            }}
            ref={galleryRef}
            hidden
          />
        </div>
      </div>

      {store.pkg?.name !== "Basic" && (
        <>
          <div>
            <label
              htmlFor="input-image"
              className="block text-dashboard-dark/60 mb-1 text-sm"
            >
              Musik Latar
              <span className="text-sm text-gray-400"> (opsional)</span>
            </label>
            <div className="flex items-center gap-2">
              {store.form.music && (
                <audio
                  muted={false}
                  src={store.form.music as string}
                  controls
                />
              )}
              {store.form.music ? (
                <>
                  <button
                    type="button"
                    onClick={() => musicRef.current?.click()}
                    className="size-9 rounded-full bg-dashboard-dark flex items-center justify-center"
                  >
                    <BiEditAlt className="size-4 text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      store.setForm("music", "");
                      const musicInput = document.getElementById(
                        "input-music",
                      ) as HTMLInputElement;
                      if (musicInput) musicInput.value = "";
                    }}
                    className="size-9 rounded-full bg-admin-danger flex items-center justify-center"
                  >
                    <BiTrashAlt className="size-4 text-white" />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => musicRef.current?.click()}
                  className="size-20 bg-zinc-100 flex items-center justify-center border border-zinc-200 border-dashed"
                >
                  <BiMusic className="size-6 text-dashboard-dark" />
                </button>
              )}

              <input
                id="input-music"
                type="file"
                accept=".mp3, .wav"
                onChange={async (e) => {
                  if (!e.target.files?.[0]) return;
                  const base64 = await fileToBase64(e.target.files[0]);
                  store.setForm("music", base64);
                }}
                ref={musicRef}
                hidden
              />
            </div>
          </div>
          <Input
            optional
            placeholder="Contoh: https://youtu.be/oHczLrPdwbE"
            className="w-full"
            label="Link Video Youtube"
            inputSize="medium"
            value={(store.form.videos?.[0] as string) || ""}
            action={
              videoId && (
                <ButtonPrimary
                  onClick={() => store.setForm("videos", [])}
                  type="button"
                  icon={<BiTrashAlt />}
                  title="Hapus"
                  size="extrasmall"
                />
              )
            }
            onChange={(e) => {
              store.setForm("videos", [e.target.value]);
            }}
          />
          {videoURL && isValidYouTube(videoURL) && (
            <YoutubeEmbed youtubeId={videoId} title="Preview Video Youtube" />
          )}
        </>
      )}
    </>
  );
};

export default OrderMedia;
