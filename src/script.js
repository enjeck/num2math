import jQuery from "jquery";
const $ = jQuery.noConflict();

$(document).ready(function() {

  var form = document.getElementById("form");
  function handleForm(event) {
    event.preventDefault();
    convert();
  }
  form.addEventListener("submit", handleForm);
  
    //$('#render').on("click", convert);
    $('#display').on("change", convert);
    $('#render').on("click touchstart", convert);
    $('.close ').click(function() {
        $('#mobile-notice').hide();
    })

    function convert() {

      //  Get the TeX input
      var number = document.getElementById("input").value;
    
      // Validating input
      if (isNaN(number) || number === "" || number > 1000 || number < 0) {
        return;
      }

        // helper functions
        function isOdd(n) {
          if (n % 2 !== 0) {
            return true;
          } else {
            return false;
          }
        }
    
        /* Need to add another slash to latex strings to prevent slash escape */
    
        // Checking whether a number can be formed using factorial
        function isFactorial(n) {
          switch (n) {
            case 2:
              return 2;
              break;
            case 6:
              return 3;
              break;
            case 24:
              return 4;
              break;
            case 120:
              return 5;
              break;
            case 720:
              return 6;
              break;
            default:
              return false;
          }
        }
    
        // Representing factorial values using the Gamma function or Pi Product notation
        function factorial(n) {
          let randomNumber = Math.random() * 10;
    
          if (randomNumber < 5) {
            // Using the Gamma function. That is Gamma(n) = (n-1)!
            return `{\\Gamma\\left( ${n + 1} \\right)}`;
          } else {
            // Using the pi product notation of factorial
            return `{\\prod_{i=1}^{${n}} i}`;
          }
        }
    
        // List of functions that generate latex math expressions
        // Functions are chosen randomly
        let possible_options = [
          lim_diff_two_squares,
          eulers_identity,
          infinite_geometric_series,
          limit_polynomial,
          limit_exponential,
          limit_natural_log,
          trig_identity,
        ];
    
        /* Using the difference of two squares in limits */
        function lim_diff_two_squares(n) {
          let fac = isFactorial(n);
          if (fac) {
            return factorial(fac);
          }
          let rand = Math.floor(Math.random() * 10);
          let r = Math.floor(Math.random() * 10) + 1;
          if (rand < 5) {
            var tex = `\\lim_{x \\to ${n - r}} {{(x^2 - ${
              r ** 2
            })} \\over {x - ${r}}}`.trim();
          } else {
            var tex = `\\lim_{x \\to ${n + r}} {{(x^2 - ${
              r ** 2
            })} \\over {x + ${r}}}`.trim();
          }
          return tex;
        }
    
        // Limits of natural log functions: https://en.wikipedia.org/wiki/List_of_limits#Natural_logarithms
        function limit_natural_log(n) {
          if (n === 0) {
            return `\\lim_{x \\to \\infty}{ lnx \\over {x} }`;
          } else if (n === 1) {
            return `\\lim_{x \\to 1}{ {ln(x)} \\over {x - 1} }`;
          } else {
            return `\\lim_{x \\to 0}{ {-ln(1 + ${n}(e^{-x} - 1))} \\over {x} }`;
          }
        }
    
        // Limits of exponential functions: https://en.wikipedia.org/wiki/List_of_limits#Sums,_products_and_composites
        function limit_exponential(n) {
          if (n === 0) {
            return `\\lim_{x \\to \\infty}{xe^{-x}}`;
          } else if (n === 1) {
            return `\\lim_{x \\to 0}\\left({ {e^x - 1} \\over {x} }\\right)`;
          } else {
            return `\\lim_{x \\to 0}\\left({ {e^{${n}x} - 1} \\over {x} }\\right)`;
          }
        }
    
        // Limits of polynomial functions
        function limit_polynomial(n) {
          let fac = isFactorial(n);
          if (fac) {
            return factorial(fac);
          }
    
          // https://en.wikipedia.org/wiki/List_of_limits#Functions_of_the_form_xa
          if (n === 0) {
            let r = Math.floor(Math.random() * 20);
            return `\\lim_{x \\to \\infty}{${r}x^{-1}}`;
          }
    
          // https://en.wikipedia.org/wiki/List_of_limits#Functions_of_the_form_xg(x)
          else if (n === 1) {
            let r = Math.floor(Math.random() * 20);
            return `\\lim_{x \\to \\infty}{x^{1/x}}`;
          } else {
            // Get random multiplier greater than 1
            let m = Math.floor(Math.random() * 5) + 1;
            // Choose a random highest power. This determines the final solution of the limit
            let highest_power = Math.floor(Math.random() * 3) + 2;
            let numerator_length =
              Math.floor(Math.random() * highest_power - 1) + 1;
            let denominator_length =
              Math.floor(Math.random() * highest_power - 1) + 1;
            let signs = ["-", "+"];
            let numerator = `${m * n}x^${highest_power} `;
            let denominator = `${m}x^${highest_power} `;
            // Generate a polynomial numerator with random length and coefficients
            for (let i = numerator_length; i > 0; i--) {
              let coef = Math.floor(Math.random() * 10) + 2;
              let power = `^${i}`;
              if (i < 2) {
                // Do not show powers of value 1
                power = "";
              }
              numerator += `${
                signs[Math.floor(Math.random() * 2)]
              } ${coef}x${power} `;
            }
    
            // Generate a polynomial denominator with random length and coefficients
            for (let i = denominator_length; i > 0; i--) {
              let coef = Math.floor(Math.random() * 10) + 2;
              let power = `^${i}`;
              if (i < 2) {
                // Do not show powers of value 1
                power = "";
              }
              denominator += `${
                signs[Math.floor(Math.random() * 2)]
              } ${coef}x${power} `;
            }
    
            // Surround everything with curly braces so that they're treated as one
            numerator = `{ ${numerator} }`;
            denominator = `{ ${denominator} }`;
            return `\\lim_{x \\to \\infty}{${numerator} \\over {${denominator}}}`;
          }
        }
    
        // Using euler's identity. That is, e^(pi*i) = -1
        function eulers_identity(n) {
          // If number can be expressed as a factorial, prefer this instead of Euler's identity
          let fac = isFactorial(n);
          if (fac) {
            return factorial(fac);
          }
          // e.g −6e^(pi*i)=6
          if (n != 0) {
            return `-${n}e^{\\pi i}`;
          } else {
            return `e^{\\pi i} + 1`;
          }
        }
    
        // Infinite geometric series that evaluates to a finite value
        function infinite_geometric_series(n) {
          // If number can be expressed as a factorial, prefer this instead of the inifinite geometric series expression
          let fac = isFactorial(n);
          if (fac) {
            return factorial(fac);
          }
    
          // https://en.wikipedia.org/wiki/List_of_mathematical_series#Trigonometric_functions
          if (n === 0) {
            let r = Math.floor(Math.random() * 10) + 3;
            return `\\sum\\limits_{k=0}^{${
              r - 1
            }} {sin{ {2 \\pi k} \\over {${r}} }}`;
          }
    
          // Using the Riemann zeta function: https://en.wikipedia.org/wiki/Particular_values_of_the_Riemann_zeta_function#The_Riemann_zeta_function_at_0_and_1
          else if (n === 1) {
            return `\\lim_{\\epsilon \\to 0}{ \\epsilon \\zeta(1 + \\epsilon) }`;
          } else {
            // Using the infinite geometric series rule: When −1<x<1, summation from i = 0 to infinity of r^i = 1/(1-r) or (r-1)/r.
            // Decimal can be represented as fraction too. e.g (0.25)^i = (1/4)^i = 4^-i
            return `\\sum\\limits_{i=0}^\\infty {\\left({${
              n - 1
            } \\over {${n}}}\\right)^i}`;
          }
        }
    
        // Using the trig identity (cos^2)x + (sin^2)x = 1
        function trig_identity(n) {
          let options_for_trig = [
            lim_diff_two_squares,
            eulers_identity,
            infinite_geometric_series,
            limit_polynomial,
            limit_exponential,
          ];
          let randIndex = Math.floor(Math.random() * options_for_trig.length);
          let randOption = options_for_trig[randIndex];
          if (n > 0) {
            let randomValue = Math.random() * 100;
            if (randomValue < 25) {
              return `${randOption(n)} \\over {cos^2x + sin^2x}`;
            } else if (randomValue < 50) {
              return `(${randOption(n)} \\times cos^2x + sin^2x)`;
            } else {
              return `(${randOption(n + 1)} - cos^2x + sin^2x)`;
            }
          } else {
            return `(${randOption(n + 1)} - cos^2x + sin^2x)`;
          }
        }
    
        // Break a number down into smaller numbers separated by operators
        function decompose(n) {
          let randomValue = Math.random() * 100;
    
          // Select three posibble options.
          // Delete option from the list after it's used to avoid using same thing more than once.
          let randIndex1 = Math.floor(Math.random() * possible_options.length);
          let randomOption1 = possible_options[randIndex1];
          let possible_options2 = [...possible_options];
          if (randIndex1 > -1) {
            possible_options2.splice(randIndex1, 1);
          }
          let randIndex2 = Math.floor(Math.random() * possible_options2.length);
          let randomOption2 = possible_options2[randIndex2];
          let possible_options3 = [...possible_options2];
          if (randIndex2 > -1) {
            possible_options3.splice(randIndex2, 1);
          }
          let randIndex3 = Math.floor(Math.random() * possible_options3.length);
          let randomOption3 = possible_options3[randIndex3];
    
          // Another function to break numbers down into smaller numbers, expressed using exponent
          function decompose2(n) {
            //if (n > 50) {
            let randNum = Math.floor(Math.random() * 3) + 6;
            let logValue = Math.log(n) / Math.log(randNum);
            let floorLog = Math.floor(logValue);
            let ceilLog = Math.ceil(logValue);
            let exp1 = randNum ** floorLog;
            let exp2 = randNum ** ceilLog;
            let diff1 = Math.abs(n - exp1);
            let diff2 = Math.abs(n - exp2);
            if (diff1 < diff2) {
              let power = `^${floorLog}`;
              if (floorLog < 2) {
                power = "";
              }
              let difference = diff1;
              return `${randomOption1(randNum)}${power} + {${randomOption2(
                difference
              )}}`;
            } else {
              let power = `^${ceilLog}`;
              if (ceilLog < 2) {
                power = "";
              }
              let difference = diff2;
              return `${randomOption1(randNum)}${power} - {${randomOption2(
                difference
              )}}`;
            }
            // }
          }
    
          // Generate the smallest possible breakdown in exponent
          // Ideal for large numbers > 50
          function minExp(n) {
            let oldDiff, newDiff,exp, exponent;
            let valObj = {};
    
            let logValue = Math.log(n) / Math.log(3);
            let floorLog = Math.floor(logValue);
            let ceilLog = Math.ceil(logValue);
            let exp1 = 3 ** floorLog;
            let exp2 = 3 ** ceilLog;
            let diff1 = Math.abs(n - exp1);
            let diff2 = Math.abs(n - exp2);
    
            if (diff1 < diff2) {
              oldDiff = diff1;
              exp = [exp1, `\\left({${randomOption3(3)}}\\right)^${floorLog}`];
              valObj[oldDiff] = exp;
            } else {
              oldDiff = diff2;
              exp = [exp2, `\\left({${randomOption3(3)}}\\right)^${ceilLog}`];
              valObj[oldDiff] = exp;
            }
    
            for (let i = 4; i < 9; i++) {
              let logValue = Math.log(n) / Math.log(i);
              let floorLog = Math.floor(logValue);
              let ceilLog = Math.ceil(logValue);
              let exp1 = i ** floorLog;
              let exp2 = i ** ceilLog;
              let diff1 = Math.abs(n - exp1);
              let diff2 = Math.abs(n - exp2);
              if (diff1 < diff2) {
                exp = [
                  exp1,
                  `\\left({${randomOption3(i)}}\\right)^${floorLog}`,
                ];
                newDiff = diff1;
                valObj[newDiff] = exp;
              } else {
                exp = [exp2, `\\left({${randomOption3(i)}}\\right)^${ceilLog}`];
                newDiff = diff2;
                valObj[newDiff] = exp;
              }
              newDiff = Math.min(newDiff, oldDiff);
              oldDiff = newDiff;
              exponent = valObj[newDiff];
            }
    
            if (exponent[0] < n) {
              return `${exponent[1]} + \\left({${decompose2(newDiff)}}\\right)`;
            } else {
              return `${exponent[1]} - \\left({${decompose2(newDiff)}}\\right)`;
            }
          }
    
          // Break down larger numbers using exponents
          if (n > 70) {
            return minExp(n);
          }
    
          if (randomValue < 25 && n < 10) {
            // Represent (small) numbers using their square and square root
            let square = n ** 2;
            return `\\sqrt{${randomOption1(square)}}`;
          }
    
          // Using Fibonacci's method to generate a pythagorean triple: https://en.wikipedia.org/wiki/Formulas_for_generating_Pythagorean_triples#Fibonacci's_method
          else if (randomValue < 50 && isOdd(n) && n < 10) {
            let a = n;
            let a_square = a ** 2;
            let position = (a_square + 1) / 2;
            // Find sum of previous position - 1 terms
            let b_square = 0;
            let odd = -1;
            for (let i = 1; i < position; i++) {
              odd += 2;
              b_square += odd;
            }
            let b = Math.sqrt(b_square);
            let c_square = odd + 2 + b_square;
            let c = Math.sqrt(c_square);
            return `\\sqrt{\\left({${randomOption1(
              c
            )}}\\right)^2 - \\left({${randomOption2(b)}}\\right)^2}`;
          }
    
          // Express a number using multiplication and addition. E.g 4 = 1 * 3 + 1
          else if (randomValue < 70) {
            let randNum = Math.floor(Math.random() * n + 1) + 1;
            let r = n % randNum;
            let a = Math.floor(n / randNum);
            return `${randomOption1(a)} \\times {${randomOption2(
              randNum
            )}} + ${randomOption3(r)}`;
    
            // Multiply and divide by a random number. e.g 2 = (2*5)/5
          } else {
            let r = Math.floor(Math.random() * 5) + 1;
            return `${randomOption1(n * r)} \\over {${randomOption2(r)}}`;
          }
        }
    
        let input = decompose(number);
    
        //  Disable the display and render buttons until MathJax is done
        var display = document.getElementById("display");
        var button = document.getElementById("render");
        button.disabled = display.disabled = true;
    
        //  Clear the old output
    
        let output = document.getElementById("output");
        output.innerHTML = "";
    
        //  Reset the tex labels (and automatic equation numbers, though there aren't any here).
        //  Get the conversion options (metrics and display settings)
        //  Convert the input to CommonHTML output and use a promise to wait for it to be ready
        //    (in case an extension needs to be loaded dynamically).
        MathJax.texReset();
        var options = MathJax.getMetricsFor(output);
        options.display = display.checked;
        MathJax.tex2chtmlPromise(input, options)
          .then(function (node) {
            //  The promise returns the typeset node, which we add to the output
            //  Then update the document to include the adjusted CSS for the
            //    content of the new equation.
            output.appendChild(node);
            MathJax.startup.document.clear();
            MathJax.startup.document.updateDocument();
          })
          .catch(function (err) {
            //  If there was an error, put the message into the output instead
            output
              .appendChild(document.createElement("pre"))
              .appendChild(document.createTextNode(err.message));
          })
          .then(function () {
            //  Error or not, re-enable the display and render buttons
            button.disabled = display.disabled = false;
          });
      }
});

