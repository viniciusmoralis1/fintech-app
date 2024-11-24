export default function FormatCryptoValue(price: number){
  let decimalPlaces = 2;

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8
  });

  while (decimalPlaces < 9) {
    const roundedNumber = Number(price.toFixed(decimalPlaces));
    if (roundedNumber > 0){
      return formatter.format(Number(roundedNumber.toFixed((decimalPlaces + 3))));
    }
    decimalPlaces++
  }
  return price.toFixed(decimalPlaces);
}