/**
 * Main application script - handles UI interactions and MathJax rendering
 */

import { generateEquation, validateInput } from './services/equationService.js';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  const displayCheckbox = document.getElementById('display');
  const closeButton = document.querySelector('.close');
  const inputField = document.getElementById('input');
  const outputDiv = document.getElementById('output');
  const renderButton = document.getElementById('render');
  const downloadBtn = document.getElementById('download-img');

  // Event listeners
  form.addEventListener('submit', handleFormSubmit);
  displayCheckbox.addEventListener('change', convert);
  closeButton.addEventListener('click', () => {
    document.getElementById('mobile-notice').style.display = 'none';
  });

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

