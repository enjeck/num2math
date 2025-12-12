/**
 * Main equation generation service
 * Coordinates generator functions to create complex mathematical expressions
 */

import {
  factorial,
  limDiffTwoSquares,
  limitNaturalLog,
  limitExponential,
  limitPolynomial,
  eulersIdentity,
  infiniteGeometricSeries,
  trigIdentity,
} from '../generators/latexGenerators.js';
import { decompose } from './decompositionService.js';
import { randomChoice } from '../utils/mathHelpers.js';

/**
 * Configuration for equation generation
 * @typedef {Object} EquationConfig
 * @property {boolean} gammaFunction - Use Gamma function for factorials
 * @property {boolean} eulersIdentity - Use Euler's identity
 * @property {boolean} limitExponential - Use exponential limits
 * @property {boolean} limitPolynomial - Use polynomial limits
 * @property {boolean} trig - Use trigonometric identities
 * @property {boolean} geometricSeries - Use geometric series
 */

/**
 * Generate a complex mathematical expression that equals the target number
 * @param {number} number - Target number (0-1000)
 * @param {EquationConfig} config - Configuration options
 * @returns {string} LaTeX expression
 */
export function generateEquation(number, config) {
  // Build list of available generator functions based on config
  const possibleOptions = [];

  if (config.eulersIdentity) {
    possibleOptions.push((n) => eulersIdentity(n, config.gammaFunction));
  }

  if (config.limitExponential) {
    possibleOptions.push(limitNaturalLog);
    possibleOptions.push(limitExponential);
  }

  if (config.limitPolynomial) {
    possibleOptions.push((n) => limDiffTwoSquares(n, config.gammaFunction));
    possibleOptions.push((n) => limitPolynomial(n, config.gammaFunction));
  }

  if (config.geometricSeries) {
    possibleOptions.push((n) => infiniteGeometricSeries(n, config.gammaFunction));
  }

  // Special handling for trig identity - needs to wrap other generators
  if (config.trig) {
    const originalOptions = [...possibleOptions];
    
    // Create trig-wrapped generator
    const trigGenerator = (n) => {
      // Filter out some options for trig wrapping
      const optionsForTrig = originalOptions.filter(
        (opt) => opt !== limitNaturalLog && opt !== trigGenerator
      );

      let randOption;
      if (optionsForTrig.length > 0) {
        randOption = (num) => randomChoice(optionsForTrig)(num);
      } else {
        randOption = sameNumber;
      }

      return trigIdentity(n, randOption);
    };
    
    possibleOptions.push(trigGenerator);
  }

  // Fallback function if all options are disabled
  const sameNumber = (n) => n;

  // Generate the expression
  return decompose(number, possibleOptions, sameNumber);
}

/**
 * Validate input number
 * @param {*} value - Input value to validate
 * @returns {{valid: boolean, error?: string}} Validation result
 */
export function validateInput(value) {
  const number = Number(value);
  
  if (isNaN(number)) {
    return { valid: false, error: 'Please enter a valid number' };
  }
  
  if (value === '' || value === null || value === undefined) {
    return { valid: false, error: 'Please enter a number' };
  }
  
  if (number < 0 || number > 1000) {
    return { valid: false, error: 'Number must be between 0 and 1000' };
  }
  
  if (!Number.isInteger(number)) {
    return { valid: false, error: 'Please enter an integer' };
  }
  
  return { valid: true };
}
