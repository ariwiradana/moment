import Input from "@/components/admin/elements/input";
import useOrderStore from "@/store/useOrderStore";
import React from "react";

const OrderMedia = () => {
  const store = useOrderStore();

  const handleChangeMedia = (name: string, value: string) => {
    let currentMedia = { ...store.form.media };
    currentMedia = {
      ...store.form.media,
      [name]: value,
    };
    store.setForm("media", currentMedia);
  };

  return (
    <>
      <Input
        value={store.form.media?.image_link}
        onChange={(e) => handleChangeMedia("image_link", e.target.value)}
        inputSize="medium"
        placeholder="Link Google Drive / Media Fire / OneDrive / dll."
        className="w-full"
        label="Link Foto"
      />
      {store.pkg?.name !== "Basic" && (
        <>
          <Input
            optional
            placeholder="Link Youtube / Google Drive / Media Fire / OneDrive / dll."
            className="w-full"
            label="Link Video"
            inputSize="medium"
            value={store.form.media?.video_link}
            onChange={(e) => handleChangeMedia("video_link", e.target.value)}
          />
          <Input
            optional
            inputSize="medium"
            onChange={(e) => handleChangeMedia("music_title", e.target.value)}
            placeholder="Judul Lagu"
            className="w-full"
            label="Musik Latar"
            value={store.form.media?.music_title as string}
          />
        </>
      )}
    </>
  );
};

export default OrderMedia;
