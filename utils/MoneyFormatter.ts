export default function FormatMoney(price: number): string{
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2
  });

  return formatter.format(Number(price.toFixed(2)));
}