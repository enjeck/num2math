/**
 * Number decomposition strategies for generating complex expressions
 */

import {
  isOdd,
  isSquare,
  isPrime,
  getFactors,
  randomInt,
  randomChoice,
} from '../utils/mathHelpers.js';
import {
  LARGE_NUMBER_THRESHOLD,
  SMALL_NUMBER_THRESHOLD,
  MEDIUM_NUMBER_THRESHOLD,
  RANDOM_OFFSET_MAX,
} from '../utils/constants.js';

/**
 * Decompose a number using exponential representation
 * @param {number} n - Target number
 * @param {Function} randomOption1 - First random generator
 * @param {Function} randomOption2 - Second random generator
 * @returns {string} LaTeX string
 */
function decompose2(n, randomOption1, randomOption2) {
  const randNum = randomInt(6, 8);
  const logValue = Math.log(n) / Math.log(randNum);
  const floorLog = Math.floor(logValue);
  const ceilLog = Math.ceil(logValue);
  const exp1 = randNum ** floorLog;
  const exp2 = randNum ** ceilLog;
  const diff1 = Math.abs(n - exp1);
  const diff2 = Math.abs(n - exp2);
  
  if (diff1 < diff2) {
    const power = floorLog < 2 ? '' : `^{${floorLog}}`;
    return `{ \\left({${randomOption1(randNum)}}\\right)${power} + {${randomOption2(diff1)}}}`;
  }
  
  const power = ceilLog < 2 ? '' : `^{${ceilLog}}`;
  return `{ \\left({${randomOption1(randNum)}}\\right) ${power} - {${randomOption2(diff2)}}}`;
}

/**
 * Find minimal exponential representation for large numbers
 * @param {number} n - Target number
 * @param {Function} randomOption3 - Random generator function
 * @returns {string} LaTeX string
 */
function minExp(n, randomOption3, decompose2Fn) {
  let oldDiff, newDiff, exp, exponent;
  const valObj = {};

  // Start with base 3
  let logValue = Math.log(n) / Math.log(3);
  let floorLog = Math.floor(logValue);
  let ceilLog = Math.ceil(logValue);
  let exp1 = 3 ** floorLog;
  let exp2 = 3 ** ceilLog;
  let diff1 = Math.abs(n - exp1);
  let diff2 = Math.abs(n - exp2);

  if (diff1 < diff2) {
    oldDiff = diff1;
    exp = [exp1, `\\left({${randomOption3(3)}}\\right)^{${floorLog}}`];
    valObj[oldDiff] = exp;
  } else {
    oldDiff = diff2;
    exp = [exp2, `\\left({${randomOption3(3)}}\\right)^{${ceilLog}}`];
    valObj[oldDiff] = exp;
  }

  // Try bases 4-8
  for (let i = 4; i < 9; i++) {
    logValue = Math.log(n) / Math.log(i);
    floorLog = Math.floor(logValue);
    ceilLog = Math.ceil(logValue);
    exp1 = i ** floorLog;
    exp2 = i ** ceilLog;
    diff1 = Math.abs(n - exp1);
    diff2 = Math.abs(n - exp2);
    
    if (diff1 < diff2) {
      exp = [exp1, `\\left({${randomOption3(i)}}\\right)^{${floorLog}}`];
      newDiff = diff1;
      valObj[newDiff] = exp;
    } else {
      exp = [exp2, `\\left({${randomOption3(i)}}\\right)^{${ceilLog}}`];
      newDiff = diff2;
      valObj[newDiff] = exp;
    }
    newDiff = Math.min(newDiff, oldDiff);
    oldDiff = newDiff;
    exponent = valObj[newDiff];
  }

  if (exponent[0] < n) {
    return `${exponent[1]} + \\left({${decompose2Fn(newDiff)}}\\right)`;
  }
  return `${exponent[1]} - \\left({${decompose2Fn(newDiff)}}\\right)`;
}

/**
 * Decompose a number into a complex mathematical expression
 * @param {number} n - Target number
 * @param {Function[]} possibleOptions - Array of generator functions
 * @param {Function} sameNumber - Fallback function
 * @returns {string} LaTeX expression
 */
export function decompose(n, possibleOptions, sameNumber) {
  // Select random generator functions
  function moreRandomOptions(num) {
    return randomChoice(possibleOptions)(num);
  }

  let randomOption1 = moreRandomOptions;
  let randomOption2 = moreRandomOptions;
  let randomOption3 = moreRandomOptions;

  if (possibleOptions.length < 1) {
    randomOption1 = sameNumber;
    randomOption2 = sameNumber;
    randomOption3 = sameNumber;
  } else if (possibleOptions.length >= 3) {
    // Select three different options
    const options1 = [...possibleOptions];
    const randIndex1 = randomInt(0, options1.length - 1);
    randomOption1 = options1[randIndex1];
    
    const options2 = [...options1];
    options2.splice(randIndex1, 1);
    const randIndex2 = randomInt(0, options2.length - 1);
    randomOption2 = options2[randIndex2];
    
    const options3 = [...options2];
    options3.splice(randIndex2, 1);
    const randIndex3 = randomInt(0, options3.length - 1);
    randomOption3 = options3[randIndex3];
  }

  // Wrapper for decompose2 with bound functions
  const decompose2Fn = (num) => decompose2(num, randomOption1, randomOption2);

  // Handle large numbers with exponential representation
  if (n > LARGE_NUMBER_THRESHOLD) {
    return minExp(n, randomOption3, decompose2Fn);
  }

  const randomValue = Math.random();

  // Strategy 1: Factor decomposition - ab = (a - c)(b + c) + c(b - a + c)
  if (n < MEDIUM_NUMBER_THRESHOLD && (n === 2 || !isPrime(n)) && randomValue < 0.25) {
    const factors = getFactors(parseInt(n));
    const randomIndex = randomInt(0, factors.length - 1);
    const a = factors[randomIndex];
    const b = n / a;
    const c = randomInt(1, RANDOM_OFFSET_MAX);

    if (Math.random() < 0.2) {
      return `{{\\left({${randomOption1(a)}}\\right)}{\\left({${randomOption2(b)}}\\right)}}`;
    }
    
    return `{ \\left({${randomOption1(a)} - ${randomOption2(c)}}\\right) \\left({${randomOption3(b)} + ${moreRandomOptions(c)}}\\right) + {${moreRandomOptions(c)}}{\\left({${moreRandomOptions(b)} - ${moreRandomOptions(a)} + ${moreRandomOptions(c)}} \\right)} }`;
  }

  // Strategy 2: Consecutive squares - n = (d + 1)^2 - d^2 = 2d + 1
  if (n > 2 && isOdd(n) && randomValue < 0.40) {
    const d = Math.floor(n / 2);
    if (Math.random() < 0.5) {
      return `{${randomOption1(2)} \\left({${randomOption2(d)}}\\right) + ${randomOption3(1)}}`;
    }
    return `{\\left({${randomOption1(d)} + ${randomOption2(1)}}\\right)^2 - \\left({${randomOption3(d)}}\\right)^2}`;
  }

  // Strategy 3: Square root for small numbers
  if (randomValue < 0.55 && n < SMALL_NUMBER_THRESHOLD) {
    const square = n ** 2;
    return `{\\sqrt{${randomOption1(square)}}}`;
  }

  // Strategy 4: Sum of odd numbers = n^2
  if (n > 1 && isSquare(n) && randomValue < 0.6) {
    const squareroot = Math.sqrt(n);
    
    if (Math.random() < 0.2) {
      let sum = `${randomOption1(1)}`;
      let oddVal = 1;
      for (let i = 0; i < squareroot - 1; i++) {
        const randomOption = randomChoice(possibleOptions);
        oddVal += 2;
        sum += `+ ${randomOption(oddVal)}`;
      }
      return `{ ${sum} }`;
    }
    
    // (a + b)^2 expansion
    const a = randomInt(1, squareroot - 1);
    const b = squareroot - a;
    
    if (Math.random() < 0.5) {
      return `{ {\\left(${randomOption1(a)} + ${randomOption2(b)}\\right)}^2}`;
    }
    return `{ {\\left(${randomOption1(a)}\\right)}^2 + {${moreRandomOptions(2)}}{\\left(${randomOption2(a)}\\right)}{\\left(${randomOption3(b)}\\right)} + {\\left(${moreRandomOptions(b)}\\right)}^2}`;
  }

  // Strategy 5: Difference of consecutive squares
  if (isOdd(n) && randomValue < 0.7) {
    const a = Math.floor(n / 2);
    const b = n - a;
    if (n < 22) {
      return `{${randomOption1(b ** 2)} - ${randomOption2(a ** 2)}}`;
    }
    return `{ \\left({${randomOption1(b)}}\\right)^2 -  \\left({${randomOption2(a)}}\\right)^2}`;
  }

  // Strategy 6: Pythagorean triples using Fibonacci's method
  if (randomValue < 0.8 && isOdd(n) && n < SMALL_NUMBER_THRESHOLD) {
    const a = n;
    const aSquare = a ** 2;
    const position = (aSquare + 1) / 2;
    let bSquare = 0;
    let odd = -1;
    for (let i = 1; i < position; i++) {
      odd += 2;
      bSquare += odd;
    }
    const b = Math.sqrt(bSquare);
    const cSquare = odd + 2 + bSquare;
    const c = Math.sqrt(cSquare);
    return `{\\sqrt{\\left({${randomOption1(c)}}\\right)^2 - \\left({${randomOption2(b)}}\\right)^2}}`;
  }

  // Strategy 7: Multiplication and addition
  if (randomValue < 0.90) {
    const randNum = randomInt(1, n + 1);
    const r = n % randNum;
    const a = Math.floor(n / randNum);
    return `${randomOption1(a)} \\times {${randomOption2(randNum)}} + ${randomOption3(r)}`;
  }

  // Strategy 8: Multiply and divide
  const r = randomInt(1, 5);
  return `${randomOption1(n * r)} \\over {${randomOption2(r)}}`;
}
