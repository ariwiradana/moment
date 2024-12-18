export function createSlug(input: string): string {
  if (input) {
    return input
      ?.toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9\s-]/g, "") // Allow numbers, letters, and hyphens, remove other characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim();
  } else {
    return "";
  }
}
