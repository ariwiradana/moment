import { getClient } from "@/lib/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface FormData {
  username: string;
  password: string;
}

const initialFormData: FormData = {
  username: "",
  password: "",
};
export const useAdminLogin = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const res = await getClient("/api/_a/_li", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!result.success) {
        toast.error(result.message);
      }
      router.push("/admin/clients");
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  return {
    state: {
      formData,
      isLoading,
    },
    actions: {
      handleSubmit,
      handleChange,
    },
  };
};
