export const getClient = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    "x-request-identifier": apiKey,
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  return response;
};
