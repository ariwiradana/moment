export const fetcher = async (url: string) => {
  try {
    const res = await fetch(url);
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch data");
    }

    return result; // Return the result if the response is ok
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};
