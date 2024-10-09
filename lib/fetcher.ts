export const fetcher = async (url: string) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-request-identifier": apiKey,
      },
    });
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch data");
    }

    return result;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
};
