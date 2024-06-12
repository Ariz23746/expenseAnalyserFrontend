function capitalizeFirstLetter(text: String) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
function currencyCommaSeperator(currency: string) {
  return currency.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function formatCurrency(currency: number) {
  const formattedCurrency = currency?.toFixed(2);

  const [rawWholeNumberPart, decimalPart] = formattedCurrency.split('.');
  const wholeNumberPart = currencyCommaSeperator(rawWholeNumberPart);
  return {wholeNumberPart, decimalPart};
}

export {capitalizeFirstLetter, formatCurrency, currencyCommaSeperator};
