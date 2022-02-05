import { useEffect } from "react";

export function useCurrencyChange(currency, product, callback) {
  if (product) {
    useEffect(() => {
      let newPrice = product.prices.find(
        (p) => p.currency.symbol === currency.symbol
      );
      callback(newPrice);
    }, [currency]);
  }
}
