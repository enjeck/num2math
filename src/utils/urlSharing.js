/**
 * URL Sharing utilities - encode/decode application state for sharing
 */

/**
 * Encodes the current state (number and config) into a URL-safe string
 * @param {number} number - The input number
 * @param {Object} config - The checkbox configuration
 * @returns {string} Base64-encoded state
 */
export function encodeState(number, config) {
  const state = {
    n: number, // Use short keys to minimize URL length
    g: config.gammaFunction,
    e: config.eulersIdentity,
    le: config.limitExponential,
    lp: config.limitPolynomial,
    t: config.trig,
    gs: config.geometricSeries,
  };
  
  const json = JSON.stringify(state);
  // Convert to base64 and make URL-safe
  return btoa(json)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, ''); // Remove padding
}

/**
 * Decodes a URL-safe string back into state
 * @param {string} encoded - The encoded state string
 * @returns {Object|null} The decoded state or null if invalid
 */
export function decodeState(encoded) {
  try {
    // Restore base64 format
    let base64 = encoded
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }
    
    const json = atob(base64);
    const state = JSON.parse(json);
    
    // Expand to full config object
    return {
      number: state.n,
      config: {
        gammaFunction: state.g ?? true,
        eulersIdentity: state.e ?? true,
        limitExponential: state.le ?? true,
        limitPolynomial: state.lp ?? true,
        trig: state.t ?? true,
        geometricSeries: state.gs ?? true,
      }
    };
  } catch (error) {
    console.error('Failed to decode state:', error);
    return null;
  }
}

/**
 * Gets the current state from URL parameters
 * @returns {Object|null} The decoded state or null if no valid state in URL
 */
export function getStateFromURL() {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('s');
  
  if (!encoded) {
    return null;
  }
  
  return decodeState(encoded);
}

/**
 * Generates a shareable URL with the current state
 * @param {number} number - The input number
 * @param {Object} config - The checkbox configuration
 * @returns {string} The full shareable URL
 */
export function generateShareableURL(number, config) {
  const encoded = encodeState(number, config);
  const url = new URL(window.location.href);
  url.search = `?s=${encoded}`;
  return url.toString();
}

/**
 * Updates the current URL with the state (without page reload)
 * @param {number} number - The input number
 * @param {Object} config - The checkbox configuration
 */
export function updateURL(number, config) {
  const encoded = encodeState(number, config);
  const url = new URL(window.location.href);
  url.search = `?s=${encoded}`;
  window.history.replaceState({}, '', url);
}
