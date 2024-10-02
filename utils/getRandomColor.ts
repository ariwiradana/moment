// randomColor.ts

export function getRandomColors(): string {
  let color: string;

  do {
    // Generate a random color
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    color = `#${randomColor.padStart(6, "0")}`;
  } while (isLightColor(color)); // Keep generating until a dark color is found

  return color;
}

// Function to check if a color is light
function isLightColor(hex: string): boolean {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128; // Return true if the color is considered light
}
