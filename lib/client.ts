export const getClient = async (
  url: string,
  options: RequestInit = {},
  token?: string | null // Accept an optional token parameter
): Promise<Response> => {
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  return response;
};
