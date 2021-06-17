export function calcPercentOnDif(currentValue, beforeValue) {
  return ((currentValue - beforeValue) * 100) / beforeValue;
}

export function calcPercentOnTotal(totalValue, currentValue) {
  return ((currentValue * 100) / totalValue).toFixed(2);
}
