export function formatBankNumber(input: number): string {
  const inputStr = input.toString();

  // Get the last 6 digits and format them in groups of three
  const lastSix = inputStr.slice(-6);
  const formattedLastSix = `${lastSix.slice(0, 3)} ${lastSix.slice(3)}`;

  // Take any remaining digits before the last 6
  const remaining = inputStr.slice(0, -6);

  // If there's a remaining part, return it with "***" prefix, otherwise just the last six part
  return remaining
    ? `***${remaining} ${formattedLastSix}`
    : `*** ${formattedLastSix}`;
}
