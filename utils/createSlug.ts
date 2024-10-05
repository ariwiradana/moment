export function createSlug(input: string): string {
  return input
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z\s]/g, "") // Remove non-alphabet characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .trim(); // Remove any leading/trailing spaces
}
