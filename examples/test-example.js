/**
 * Example test file showing how to test the refactored modules
 * These are examples - actual testing framework (Jest, Vitest, etc.) required
 */

import { 
  isOdd, 
  isSquare, 
  isPrime, 
  getFactors, 
  isFactorial 
} from '../src/utils/mathHelpers.js';

// Example tests for mathHelpers
console.log('Testing mathHelpers...');

// Test isOdd
console.assert(isOdd(3) === true, 'isOdd(3) should be true');
console.assert(isOdd(4) === false, 'isOdd(4) should be false');

// Test isSquare
console.assert(isSquare(9) === true, 'isSquare(9) should be true');
console.assert(isSquare(10) === false, 'isSquare(10) should be false');

// Test isPrime
console.assert(isPrime(7) === true, 'isPrime(7) should be true');
console.assert(isPrime(4) === false, 'isPrime(4) should be false');
console.assert(isPrime(2) === true, 'isPrime(2) should be true');
console.assert(isPrime(1) === false, 'isPrime(1) should be false');

// Test getFactors
const factors6 = getFactors(6);
console.assert(
  JSON.stringify(factors6) === JSON.stringify([0, 1, 2, 3, 6]),
  'getFactors(6) should return [0, 1, 2, 3, 6]'
);

// Test isFactorial
console.assert(isFactorial(6) === 3, 'isFactorial(6) should return 3');
console.assert(isFactorial(24) === 4, 'isFactorial(24) should return 4');
console.assert(isFactorial(7) === false, 'isFactorial(7) should return false');

console.log('All tests passed! ✓');

/**
 * To run these tests with a proper testing framework:
 * 
 * 1. Install a test runner:
 *    npm install --save-dev vitest
 * 
 * 2. Update package.json:
 *    "scripts": {
 *      "test": "vitest"
 *    }
 * 
 * 3. Rename this file to mathHelpers.test.js
 * 
 * 4. Rewrite tests using framework syntax:
 * 
 *    import { describe, it, expect } from 'vitest';
 * 
 *    describe('mathHelpers', () => {
 *      it('should identify odd numbers', () => {
 *        expect(isOdd(3)).toBe(true);
 *        expect(isOdd(4)).toBe(false);
 *      });
 *    });
 */
