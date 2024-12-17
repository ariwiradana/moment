export function calculateDiscountPercentage(
  price: number,
  discountPrice: number
): number {
  if (discountPrice > 0) {
    const discountPercentage = (discountPrice / price) * 100;
    return Math.ceil(discountPercentage);
  } else {
    return price;
  }
}
