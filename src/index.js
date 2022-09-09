import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchanger from './js/currency-exchanger';

// Business Logic

function getCurrency(currency, amount) {
  CurrencyExchanger.getCurrency(currency, amount)
    .then(function(response) {
      if (response.conversion_result) {
        printElements(response, currency, amount);
      } else {
        printError(response, currency, amount);
      }
    });
}

// UI Logic

function printElements(response, currency, amount) {
  document.querySelector("p#output").innerText = `$${amount} in ${currency} is
  ${response.conversion_result}`;
}

function printError(error, currency) {
  document.querySelector("p#output").innerText = `There was an error accessing the currency data for ${currency}: 
  ${error}.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const currency = document.querySelector("select#currency").value;
  const amount = document.querySelector("input#amount-input").value;
  document.querySelector("select#currency").value = null;
  getCurrency(currency, amount);
  console.log(`amount: ${amount}`);
  console.log(`currency: ${currency}`);
  console.log(process.env.API_KEY);
}

window.addEventListener("load", function() {
  document.querySelector("form#submit-form").addEventListener("submit", handleFormSubmission);
});
