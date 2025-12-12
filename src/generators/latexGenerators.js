/**
 * LaTeX expression generators for various mathematical concepts
 */

import { isFactorial, randomInt } from '../utils/mathHelpers.js';
import { SIGNS } from '../utils/constants.js';

/**
 * Generate factorial notation using Gamma function or Pi product
 * @param {number} n - The factorial base
 * @param {boolean} useGammaFunction - Whether to use Gamma function
 * @returns {string} LaTeX string
 */
export function factorial(n, useGammaFunction) {
  if (Math.random() < 0.5 && useGammaFunction) {
    return `{\\Gamma (${n + 1})}`;
  }
  return `{\\prod_{k=1}^{${n}} k}`;
}

/**
 * Generate limit using difference of two squares
 * @param {number} n - Target number
 * @param {boolean} useGammaFunction - Whether gamma function is enabled
 * @returns {string} LaTeX string
 */
export function limDiffTwoSquares(n, useGammaFunction) {
  const fac = isFactorial(n);
  if (fac && Math.random() < 0.5) {
    return factorial(fac, useGammaFunction);
  }
  
  const r = randomInt(1, 10);
  if (Math.random() < 0.5) {
    return `{\\lim_{x \\to ${n - r}} {{x^2 - ${r ** 2}} \\over {x - ${r}}}}`;
  }
  return `{\\lim_{x \\to ${n + r}} {{x^2 - ${r ** 2}} \\over {x + ${r}}}}`;
}

/**
 * Generate natural logarithm limit
 * @param {number} n - Target number
 * @returns {string} LaTeX string
 */
export function limitNaturalLog(n) {
  if (n === 0) {
    return `{\\lim_{x \\to \\infty}{ \\ln(x) \\over {x} }}`;
  }
  if (n === 1) {
    return `{\\lim_{x \\to 1}  { {\\ln(x)} \\over {x - 1} }}`;
  }
  return `{\\lim_{x \\to 0}{ {-\\ln(1 + ${n}(e^{-x} - 1))} \\over {x} }}`;
}

/**
 * Generate exponential limit
 * @param {number} n - Target number
 * @returns {string} LaTeX string
 */
export function limitExponential(n) {
  if (n === 0) {
    return `{\\lim_{x \\to \\infty}{xe^{-x}}}`;
  }
  if (n === 1) {
    return `{\\lim_{x \\to 0}{ {e^x - 1} \\over {x} }}`;
  }
  return `{\\lim_{x \\to 0}{ {e^{${n}x} - 1} \\over {x} }}`;
}

/**
 * Generate polynomial limit
 * @param {number} n - Target number
 * @param {boolean} useGammaFunction - Whether gamma function is enabled
 * @returns {string} LaTeX string
 */
export function limitPolynomial(n, useGammaFunction) {
  const fac = isFactorial(n);
  if (fac && Math.random() < 0.5) {
    return factorial(fac, useGammaFunction);
  }

  if (n === 0) {
    const r = randomInt(0, 19);
    return `{\\lim_{x \\to \\infty}{${r}x^{-1}}}`;
  }

  if (n === 1) {
    return `{\\lim_{x \\to \\infty}{x^{1/x}}}`;
  }

  const m = randomInt(1, 5);
  const highestPower = randomInt(2, 4);
  const numeratorLength = randomInt(1, highestPower - 1);
  const denominatorLength = randomInt(1, highestPower - 1);
  
  let numerator = `${m * n}x^{${highestPower}} `;
  let denominator = `${m}x^{${highestPower}} `;

  for (let i = numeratorLength; i > 0; i--) {
    const coef = randomInt(2, 11);
    const power = i < 2 ? '' : `^{${i}}`;
    numerator += `${SIGNS[Math.floor(Math.random() * 2)]} ${coef}x${power} `;
  }

  for (let i = denominatorLength; i > 0; i--) {
    const coef = randomInt(2, 11);
    const power = i < 2 ? '' : `^{${i}}`;
    denominator += `${SIGNS[Math.floor(Math.random() * 2)]} ${coef}x${power} `;
  }

  return `{\\lim_{x \\to \\infty}{{ ${numerator} } \\over {{ ${denominator} }}}}`;
}

/**
 * Generate Euler's identity expression
 * @param {number} n - Target number
 * @param {boolean} useGammaFunction - Whether gamma function is enabled
 * @returns {string} LaTeX string
 */
export function eulersIdentity(n, useGammaFunction) {
  const fac = isFactorial(n);
  if (fac && Math.random() < 0.5) {
    return factorial(fac, useGammaFunction);
  }
  
  if (n !== 0) {
    return `{-${n}e^{\\pi i}}`;
  }
  return `{(e^{\\pi i} + 1)}`;
}

/**
 * Generate infinite geometric series
 * @param {number} n - Target number
 * @param {boolean} useGammaFunction - Whether gamma function is enabled
 * @returns {string} LaTeX string
 */
export function infiniteGeometricSeries(n, useGammaFunction) {
  const fac = isFactorial(n);
  if (fac && Math.random() < 0.5) {
    return factorial(fac, useGammaFunction);
  }

  if (n === 0) {
    const r = randomInt(3, 12);
    return `{\\sum\\limits_{k=0}^{${r - 1}} {\\sin \\left({ {2 \\pi k} \\over {${r}} } \\right)}}`;
  }

  if (n === 1) {
    return `{\\lim_{\\epsilon \\to 0}{ \\epsilon \\zeta(1 + \\epsilon) }}`;
  }
  
  return `{\\sum\\limits_{k=0}^\\infty {\\left({${n - 1} \\over {${n}}}\\right)^{k}}}`;
}

/**
 * Generate trigonometric identity expression
 * @param {number} n - Target number
 * @param {Function} randOption - Random generator function
 * @returns {string} LaTeX string
 */
export function trigIdentity(n, randOption) {
  if (n > 0) {
    const randomValue = Math.random();
    if (randomValue < 0.25) {
      return `\\left({${randOption(n)} \\over {(\\cos^2x + \\sin^2x)}}\\right)`;
    }
    if (randomValue < 0.5) {
      return `\\left({${randOption(n)} \\times (\\cos^2x + \\sin^2x)}\\right)`;
    }
    return `\\left({${randOption(n + 1)} - (\\cos^2x + \\sin^2x)}\\right)`;
  }
  return `\\left({${randOption(n + 1)} - (\\cos^2x + \\sin^2x)}\\right)`;
}
