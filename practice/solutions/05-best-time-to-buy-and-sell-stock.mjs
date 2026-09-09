/* Reference solution — Best Time to Buy and Sell Stock.
   Print with: npm run solution -- 05
   Yours does not have to match this. If yours passes, yours is correct. */

export function maxProfit(prices) {
  let lowest = Infinity;
  let best = 0;
  for (const price of prices) {
    if (price < lowest) lowest = price;
    else if (price - lowest > best) best = price - lowest;
  }
  return best;
}
