export function getInitial(name: string) {
  if (!name) return "";
  const words = name.split(" ").filter(Boolean); // Split by spaces and filter out empty strings
  const initials = words
    .slice(0, 2) // Take only the first two words
    .map((word) => word.charAt(0).toUpperCase()) // Get the first letter of each word and uppercase it
    .join(""); // Join the initials together
  return initials;
}
