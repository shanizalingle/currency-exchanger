export default class CurrencyExchanger {  
  static getCurrency(amount) {
    return fetch(` https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/EUR/${amount}`)
      .then(function(response) {
        if (!response.ok) {
          const errorMessage = `${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        } else {
          return response.json();
        }
      })      
      .catch(function(error) {
        return error;
      });
  }
}