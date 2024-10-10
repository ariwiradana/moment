export function formatNumber(num: number): string {
  // If the number is less than 10, return the number itself
  if (num < 10) {
    return num.toString();
  }

  // Calculate the nearest lower multiple of 10
  const lowerBound = Math.floor(num / 10) * 10;

  // Determine the base for formatting
  const base = Math.floor(num / 10) * 10;

  // If the number falls within the range for "++"
  if (num >= base && num < base + 10) {
    return `${base}++`;
  }

  // For numbers that are exactly multiples of 10, return lowerBound with "0+"
  if (num % 10 === 0) {
    return `${lowerBound - 10}0+`;
  }

  // For other numbers, return lowerBound with "+"
  return `${lowerBound}+`;
}
