import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchanger from './js/currency-exchanger';

// Business Logic

function getCurrency(baseCurrency, newCurrency, amount) {
  CurrencyExchanger.getCurrency(baseCurrency, newCurrency, amount)
    .then(function(response) {
      if (response.conversion_result) {
        printElements(response, baseCurrency,newCurrency, amount);
      } else {
        printError(response, baseCurrency, newCurrency, amount);
      }
    });
}

// UI Logic

function printElements(response, baseCurrency, newCurrency, amount) {
  document.querySelector("p#output").innerText = `${amount} ${baseCurrency} equals \n ${response.conversion_result} ${newCurrency}`;
}

function printError(error, baseCurrency, newCurrency) {
  if (error.toString().includes("404")) {
    document.querySelector("p#output").innerText = `${baseCurrency} or ${newCurrency} don't exist: ${error}`;
  } else {
    document.querySelector("p#output").innerText = `There was an error accessing the currency data for ${baseCurrency} or ${newCurrency}: ${error}`;
  }
}

function handleFormSubmission(event) {
  event.preventDefault();
  const baseCurrency = document.querySelector("input#base-currency-input").value;
  const newCurrency = document.querySelector("input#new-currency-input").value;
  const amount = document.querySelector("input#amount-input").value;
  getCurrency(baseCurrency, newCurrency, amount);
}

window.addEventListener("load", function() {
  document.querySelector("form#submit-form").addEventListener("submit", handleFormSubmission);
});
