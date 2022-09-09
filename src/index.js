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
  document.querySelector("#output").innerText = `$${amount} in ${currency} is
  ${response.conversion_result}`;
}

function printError(error, currency) {
  document.querySelector("#output").innerText = `There was an error accessing the currency data for ${currency}: 
  ${error}.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const currency = document.querySelector("#currency").value;
  const amount = document.querySelector("#amount-input").value;
  document.querySelector('#currency').value = null;
  getCurrency(currency, amount);
  console.log(`amount: ${amount}`);
  console.log(`currency: ${currency}`);
}

window.addEventListener("load", function() {
  document.querySelector("#submit-form").addEventListener("submit", handleFormSubmission);
});
