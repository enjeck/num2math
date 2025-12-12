/**
 * Main application script - handles UI interactions and MathJax rendering
 */

import { generateEquation, validateInput } from './services/equationService.js';
import { getStateFromURL, updateURL, generateShareableURL } from './utils/urlSharing.js';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  const displayCheckbox = document.getElementById('display');
  const closeButton = document.querySelector('.close');
  const inputField = document.getElementById('input');
  const outputDiv = document.getElementById('output');
  const renderButton = document.getElementById('render');
  const downloadBtn = document.getElementById('download-img');
  const shareBtn = document.getElementById('share-btn');

  // Event listeners
  form.addEventListener('submit', handleFormSubmit);
  displayCheckbox.addEventListener('change', convert);
  closeButton.addEventListener('click', () => {
    document.getElementById('mobile-notice').style.display = 'none';
  });
  shareBtn.addEventListener('click', handleShare);

  // Load state from URL if present (wait for MathJax to be ready)
  loadStateFromURL();

  function loadStateFromURL() {
    const state = getStateFromURL();
    if (state) {
      // Set input value
      inputField.value = state.number;
      
      // Set checkboxes
      document.getElementById('gamma-function').checked = state.config.gammaFunction;
      document.getElementById('eulers-identity').checked = state.config.eulersIdentity;
      document.getElementById('limits-exponential').checked = state.config.limitExponential;
      document.getElementById('limits-polynomial').checked = state.config.limitPolynomial;
      document.getElementById('trig').checked = state.config.trig;
      document.getElementById('geometric-series').checked = state.config.geometricSeries;
      
      // Wait for MathJax to be ready before rendering
      if (window.MathJax && window.MathJax.startup) {
        MathJax.startup.promise.then(() => {
          convert();
        });
      } else {
        // MathJax not loaded yet, wait for it
        window.addEventListener('load', () => {
          if (window.MathJax && window.MathJax.startup) {
            MathJax.startup.promise.then(() => {
              convert();
            });
          }
        });
      }
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    convert();
  }

  function convert() {
    const number = inputField.value;

    // Validate input
    const validation = validateInput(number);
    if (!validation.valid) {
      showError(validation.error);
      return;
    }

    // Get configuration from checkboxes
    const config = {
      gammaFunction: document.getElementById('gamma-function').checked,
      eulersIdentity: document.getElementById('eulers-identity').checked,
      limitExponential: document.getElementById('limits-exponential').checked,
      limitPolynomial: document.getElementById('limits-polynomial').checked,
      trig: document.getElementById('trig').checked,
      geometricSeries: document.getElementById('geometric-series').checked,
    };

    // Generate the LaTeX expression
    const input = generateEquation(Number(number), config);

    // Render with MathJax
    renderEquation(input);
    
    // Update URL with current state (for sharing)
    updateURL(Number(number), config);
  }

  function handleShare() {
    const number = inputField.value;
    const validation = validateInput(number);
    
    if (!validation.valid) {
      showError('Please generate an equation first before sharing!');
      return;
    }

    const config = {
      gammaFunction: document.getElementById('gamma-function').checked,
      eulersIdentity: document.getElementById('eulers-identity').checked,
      limitExponential: document.getElementById('limits-exponential').checked,
      limitPolynomial: document.getElementById('limits-polynomial').checked,
      trig: document.getElementById('trig').checked,
      geometricSeries: document.getElementById('geometric-series').checked,
    };

    const shareableURL = generateShareableURL(Number(number), config);
    
    // Try to use native share API if available (mobile devices)
    if (navigator.share) {
      navigator.share({
        title: `num2math - Equation for ${number}`,
        text: `Check out this complicated math equation that equals ${number}!`,
        url: shareableURL,
      }).catch((error) => {
        if (error.name !== 'AbortError') {
          copyToClipboard(shareableURL);
        }
      });
    } else {
      // Fallback to clipboard
      copyToClipboard(shareableURL);
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      // Show feedback
      const originalText = shareBtn.textContent;
      shareBtn.textContent = '✓ Link copied!';
      shareBtn.style.backgroundColor = '#28a745';
      
      setTimeout(() => {
        shareBtn.textContent = originalText;
        shareBtn.style.backgroundColor = '';
      }, 2000);
    }).catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      
      const originalText = shareBtn.textContent;
      shareBtn.textContent = '✓ Link copied!';
      setTimeout(() => {
        shareBtn.textContent = originalText;
      }, 2000);
    });
  }

  function showError(message) {
    outputDiv.innerHTML = `<p style="color: red; padding: 10px;">${message}</p>`;
  }

  function renderEquation(latexExpression) {
    // Disable buttons while rendering
    renderButton.disabled = displayCheckbox.disabled = true;

    // Clear previous output
    outputDiv.innerHTML = '';

    // Configure MathJax rendering
    MathJax.texReset();
    const options = MathJax.getMetricsFor(outputDiv);
    options.display = displayCheckbox.checked;

    // Render the LaTeX expression
    MathJax.tex2svgPromise(latexExpression, options)
      .then((node) => {
        outputDiv.appendChild(node);
        MathJax.startup.document.clear();
        MathJax.startup.document.updateDocument();
        downloadBtn.style.display = 'block';
        shareBtn.style.display = 'inline-block';
      })
      .catch((err) => {
        const pre = document.createElement('pre');
        pre.textContent = err.message;
        outputDiv.appendChild(pre);
      })
      .finally(() => {
        renderButton.disabled = displayCheckbox.disabled = false;
      });
  }
});

