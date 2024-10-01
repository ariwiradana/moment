export function getInitial(name: string) {
  if (!name) return "";
  const firstWord = name.split(" ")[0]; // Split the name by spaces and get the first part
  return firstWord.charAt(0).toUpperCase(); // Return the first character in uppercase
}
