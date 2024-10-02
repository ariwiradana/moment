import { toast } from "react-hot-toast";

export const fetcher = async (url: string) => {
  const myPromise = toast.promise(
    fetch(url).then(async (res) => {
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch data");
      }
      return result;
    }),
    {
      loading: "Retrieving data, please wait...",
      success: "Data successfully retrieved!",
      error: (err) => `Error: ${err.message}`,
    }
  );
  return myPromise;
};
