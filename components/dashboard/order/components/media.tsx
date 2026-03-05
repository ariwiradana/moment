import Input from "@/components/admin/elements/input";
import useOrderStore from "@/store/useOrderStore";
import React from "react";
const OrderMedia = () => {
  const store = useOrderStore();

  return (
    <>
      <Input
        placeholder="Contoh: Link Gdrive / Dropbox / Mediafire / Sejenisnya"
        className="w-full"
        label={`Galeri Foto (Max ${store.pkg?.max_gallery_photos} foto)`}
        inputSize="medium"
        value={(store.form.media?.image_link as string) || ""}
        onChange={(e) => {
          store.setForm("media", {
            ...store.form.media,
            image_link: e.target.value,
          });
        }}
      />

      {store.pkg?.name !== "Basic" && (
        <>
          <Input
            optional
            placeholder="Contoh: Gus Teja - Sundara"
            className="w-full"
            label="Judul Lagu"
            inputSize="medium"
            value={(store.form.media?.music_title as string) || ""}
            onChange={(e) => {
              store.setForm("media", {
                ...store.form.media,
                music_title: e.target.value,
              });
            }}
          />
          <Input
            optional
            placeholder="Contoh: Link Gdrive / Dropbox / Mediafire / Sejenisnya"
            className="w-full"
            label="Link Video"
            inputSize="medium"
            value={(store.form.media?.video_link as string) || ""}
            onChange={(e) => {
              store.setForm("media", {
                ...store.form.media,
                video_link: e.target.value,
              });
            }}
          />
        </>
      )}
    </>
  );
};

export default OrderMedia;
