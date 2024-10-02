import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useClient } from "@/lib/client";

interface FormData {
  name: string;
  thumbnail: File | null;
}

const initalFormData: FormData = {
  name: "",
  thumbnail: null,
};

export const useAdminCreateTheme = () => {
  const [formData, setFormData] = useState<FormData>(initalFormData);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((state) => ({
      ...state,
      [name]: name === "thumbnail" ? null : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const createTheme = useClient("/api/themes", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    toast.promise(createTheme, {
      loading: "Creating new theme...",
      success: () => {
        router.push("/admin/themes");
        return "Successfully created new theme";
      },
      error: (error: any) => {
        return error.message || "Failed to create new theme";
      },
    });
  };

  return {
    state: {
      formData,
    },
    actions: {
      handleChange,
      handleSubmit,
    },
  };
};
