"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

const renderCountry = function (data, className = "") {
  const html = `
  <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
  </article>
`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1;
};

/**
 * API: REST Countries from https://github.com/public-apis/public-apis
 */

/**
 * Error Handling
 * 1. We can add an error callback after each fetch in the first .then()
 * In this case, first argument is a callback handling the fulfilled promise (response),
 * second argument is a callback handling the rejected promise (error)
 * 2. A better way to add the .catch() method at the end of the promise chain.
 * The catch also returns a promise (we usually call this one "error").
 * The catch is taking a callback with an argument "error".
 * It is the error object that has been created by the catch. Error objects have a .message property.
 * 3. Finally
 * Then method - only called when the promise is fulfilled
 * Catch method - only called when the promise is rejected
 * Finally method - it gets always called at the end
 * Not necessarily for error handling.
 * Useful in cases when something always needs to happen regardless of he result
 * e.g. hide the loading spinner
 * 4. Throwing Errors Manually
 * Create a new Error with the constructor function, then we pass in the error message.
 * Then we use the throw keyword which will immediately terminate the current function
 * - similarly to the return keyword
 * This will automatically reject the Promise - this will propagate down to the catch method
 * So the string we added to the new Error will be error.message and will be used by the catch
 * We are technically overwriting the default error message with a more meaningful message for the user
 */

const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error(`Country not found ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
      // const neighbour = data[0].borders?.[0];
      const neighbour = "gsgsrd";

      // Country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Country not found ${response.status}`);
      }
      return response.json();
    })
    .then((data) => renderCountry(data, "neighbour"))
    .catch((error) => {
      console.error(`${error} 💥💥💥`);
      renderError(`Something went wrong.💥💥 ${error.message}. Try again.`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", function () {
  getCountryData("portugal");
});

// getCountryData("vdfsgdgh");
