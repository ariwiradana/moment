import React, { useState } from "react";
import { BiLoaderAlt, BiShareAlt, BiTrash, BiUser } from "react-icons/bi";
import { getClient } from "@/lib/client";
import toast from "react-hot-toast";
import { montserrat } from "@/lib/fonts";

interface AddGuestItemProps {
  value: string;
  index?: number;
  mode: "empty" | "exist";
  slug: string;
  mutate: () => void;
}

const AddGuestItem = ({
  value = "",
  index,
  mode,
  slug,
  mutate,
}: AddGuestItemProps) => {
  const baseURL = `${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ""
  }`;
  const text = `Om Swastiastu,\n\nAtas asung kerta wara nugraha Ida Sang Hyang Widhi Wasa, tanpa mengurangi rasa hormat, izinkan kami mengundang Bapak/Ibu/Saudara/i dalam Upacara Manusa Yadnya Pawiwahan (Pernikahan).\n\nUndangan dapat dilihat dengan klik link dibawah ini :\n\n${baseURL}/${slug}?untuk=${value.replaceAll(
    " ",
    "+"
  )}\n\nSuatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i dapat hadir pada acara kami dan memberikan doa restu🙏🏻\n\nTerima kasih.\nOm Shanti, Shanti, Shanti Om`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: text,
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing content", error);
      }
    } else {
      alert("Web Share API is not supported in this browser.");
    }
  };

  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const payload = {
        slug,
        guest: value,
      };
      const response = await getClient("/api/_pb/_c/_g", {
        method: "DELETE",
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.success) {
        mutate();
        toast.success("Tamu berhasil dihapus!", {
          icon: (
            <div className="p-1 rounded bg-dashboard-primary">
              <BiUser />
            </div>
          ),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full">
      <div className={`${montserrat.className} text-sm w-full`}>
        <p className="block text-gray-700 mb-1">{`Tamu ${index}`}</p>
        <div className="w-full rounded-lg border p-4 bg-zinc-50 text-dashboard-dark font-medium">
          {value}
        </div>
      </div>

      {mode === "exist" && (
        <div className="flex justify-end gap-4 md:mt-5">
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-dashboard-dark"
          >
            <BiShareAlt />
            <span className="text-sm">Bagikan</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 text-dashboard-dark"
          >
            {loading ? <BiLoaderAlt className="animate-spin" /> : <BiTrash />}
            <span className="text-sm">Hapus</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AddGuestItem;
