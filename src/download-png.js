/**
 * PNG download functionality for SVG equations
 */

document.addEventListener('DOMContentLoaded', function () {
  const downloadBtn = document.getElementById('download-img');
  downloadBtn.addEventListener('click', downloadPNG);

  /**
   * Initiate download of blob
   * @param {string} filename - Name of the file to download
   * @param {Blob} blob - Blob data to download
   */
  function download(filename, blob) {
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, filename);
    } else {
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;
      elem.click();
      // Clean up the URL object
      window.URL.revokeObjectURL(elem.href);
    }
  }

  /**
   * Download the rendered equation as PNG
   */
  function downloadPNG() {
    const svg = document.querySelector('svg');
    if (!svg) {
      console.error('No SVG found to download');
      return;
    }

    const number = document.getElementById('input').value;

    // Increase SVG dimensions for better quality
    const w = parseInt(svg.getAttribute('width')) * 3;
    const h = parseInt(svg.getAttribute('height')) * 3;

    // Clone the SVG to avoid modifying the displayed version
    const clonedSvg = svg.cloneNode(true);
    clonedSvg.setAttribute('width', `${w}ex`);
    clonedSvg.setAttribute('height', `${h}ex`);

    // Convert SVG to string data
    const data = new XMLSerializer().serializeToString(clonedSvg);

    const canvas = document.createElement('canvas');

    // Render SVG to canvas and convert to PNG
    canvg(canvas, data, {
      renderCallback: function () {
        canvas.toBlob(function (blob) {
          download(`complicated-equation-that-equals-${number}.png`, blob);
        });
      },
    });
  }
});

