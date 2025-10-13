export function generateInvoiceId() {
  const timestamp = Date.now(); // contoh: 1734001205123
  return `INV-${timestamp}`;
}
