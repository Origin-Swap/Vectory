// src/utils/formatToken.js

/**
 * Convert a token amount to base unit (smallest denomination).
 * Example: toBaseUnit("1.5", 9) => "1500000000"
 *
 * @param {string|number} value - The amount in normal unit (e.g. 1.5)
 * @param {number} decimals - The token decimals (default: 9 for Supra)
 * @returns {string} - The amount in base unit (as string)
 */
export function toBaseUnit(value, decimals = 9) {
  if (value === null || value === undefined) return "0";
  const [whole, fraction = ""] = value.toString().split(".");
  const fractionPadded = fraction.padEnd(decimals, "0").slice(0, decimals);
  return BigInt(whole + fractionPadded).toString();
}
