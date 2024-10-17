export const fetcher = async (url: string, token?: string | null) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
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
