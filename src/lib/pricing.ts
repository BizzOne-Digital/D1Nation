export function formatPublicPrice(
  price: number | null | undefined,
  showPublicPrice: boolean,
  currency = "USD",
): string {
  if (!showPublicPrice || price == null || Number.isNaN(price)) {
    return "Contact for pricing";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}
