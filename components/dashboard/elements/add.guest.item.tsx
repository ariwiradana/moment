import React, { useState } from "react";
import { BiLoaderAlt, BiShareAlt, BiTrash, BiUser } from "react-icons/bi";
import { getClient } from "@/lib/client";
import toast from "react-hot-toast";
import { montserrat } from "@/lib/fonts";
import { Client } from "@/lib/types";

interface AddGuestItemProps {
  value: string;
  mode: "empty" | "exist";
  slug: string;
  client: Client | null;
  token: string | null;
  mutate: () => void;
}

const AddGuestItem = ({
  value = "",
  mode,
  slug,
  client,
  token,
  mutate,
}: AddGuestItemProps) => {
  const baseURL = `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ""
  }`;
  const text = `${client?.opening_title},\n\n${
    client?.opening_description
  }\n\nUndangan dapat dilihat dengan klik link dibawah ini :\n\n${baseURL}/${slug}?untuk=${value.replaceAll(
    " ",
    "+"
  )}\n\n${client?.closing_description}\n\n${client?.closing_title}`;

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
      const response = await getClient(
        "/api/_c/_g",
        {
          method: "DELETE",
          body: JSON.stringify(payload),
        },
        token
      );
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
        <div className="w-full rounded-lg border p-4 bg-zinc-50">
          <p className="block text-dashboard-dark/50 mb-1 text-xs font-normal">
            Nama Tamu
          </p>
          <p className="text-dashboard-dark font-semibold text-base">{value}</p>
        </div>
      </div>

      {mode === "exist" && (
        <div className="flex justify-end gap-4">
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
