/**
 * Mathematical utility functions
 */

/**
 * Check if a number is odd
 * @param {number} n - The number to check
 * @returns {boolean} True if odd, false otherwise
 */
export function isOdd(n) {
  return n % 2 !== 0;
}

/**
 * Check if a number is a perfect square
 * @param {number} n - The number to check
 * @returns {boolean} True if perfect square, false otherwise
 */
export function isSquare(n) {
  return Number.isInteger(Math.sqrt(n));
}

/**
 * Check if a number is prime
 * @param {number} n - The number to check
 * @returns {boolean} True if prime, false otherwise
 */
export function isPrime(n) {
  if (n <= 1) return false;
  if (n % 2 === 0 && n > 2) return false;
  const s = Math.sqrt(n);
  for (let i = 3; i <= s; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

/**
 * Get all factors of a number
 * @param {number} n - The number to factorize
 * @returns {number[]} Array of factors
 */
export function getFactors(n) {
  return [...Array(n + 1).keys()].filter((i) => n % i === 0);
}

/**
 * Check if a number can be formed using factorial
 * @param {number} n - The number to check
 * @returns {number|false} The factorial base or false
 */
export function isFactorial(n) {
  const factorialMap = {
    2: 2,
    6: 3,
    24: 4,
    120: 5,
    720: 6,
  };
  return factorialMap[n] || false;
}

/**
 * Generate a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Select a random item from an array
 * @param {Array} arr - The array to select from
 * @returns {*} Random item from array
 */
export function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
