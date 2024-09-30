export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch data");
  }
  return result;
};
