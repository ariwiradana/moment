export const isValidYouTube = (url: string) => {
  try {
    const parsed = new URL(url);
    return (
      (parsed.protocol === "http:" || parsed.protocol === "https:") &&
      ((parsed.hostname === "www.youtube.com" &&
        parsed.searchParams.has("v")) ||
        (parsed.hostname === "youtube.com" && parsed.searchParams.has("v")) ||
        parsed.hostname === "youtu.be")
    );
  } catch {
    return false;
  }
};
