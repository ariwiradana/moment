import React, { useState } from "react";
import { BiLoaderAlt, BiShareAlt, BiTrash } from "react-icons/bi";
import { getClient } from "@/lib/client";
import toast from "react-hot-toast";
import { redhat } from "@/lib/fonts";
import { Client } from "@/lib/types";

interface AddGuestItemProps {
  value: string;
  mode: "empty" | "exist";
  slug: string;
  client: Client | null;
  token: string | null;
  mutate: () => void;
}

export const htmlToPlainText = (html: string) => {
  if (!html) return "";

  let text = html;

  // Ganti <br> atau <br/> dengan newline
  text = text.replace(/<br\s*\/?>/gi, "\n");

  // Hapus tag <p> di awal, ganti </p> dengan newline
  text = text.replace(/<p[^>]*>/gi, "");
  text = text.replace(/<\/p>/gi, "\n");

  // Trim tiap baris
  const lines = text.split("\n").map((line) => line.trim());

  // Filter double empty line → biar cuma 1 baris kosong
  const result: string[] = [];
  lines.forEach((line) => {
    if (line === "" && result[result.length - 1] === "") return;
    result.push(line);
  });

  return result.join("\n");
};

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

  const handleShare = async () => {
    if (navigator.share && client) {
      const encodedValue = encodeURIComponent(value).replace(/%20/g, "+");

      const text = `${htmlToPlainText(
        client.social_description || ""
      )}${baseURL}/${slug}?untuk=${encodedValue}`;

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
        "/api/admin/client/delete-guest",
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
          className: `${redhat.className} text-sm border border-white/20`,
          style: {
            boxShadow: "none",
            bottom: 0,
            backgroundColor: "#101010",
            color: "white",
            borderRadius: 100,
          },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full p-4">
      <div className={`${redhat.className} text-sm w-full`}>
        <div className="w-full">
          <p className="block text-dashboard-dark/50 text-sm font-normal">
            Nama Tamu
          </p>
          <p className="text-dashboard-dark font-medium text-base leading-6">
            {value}
          </p>
        </div>
      </div>

      {mode === "exist" && (
        <div className={`flex gap-4 ${redhat.className}`}>
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
