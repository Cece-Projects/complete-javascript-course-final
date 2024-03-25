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
  countriesContainer.style.opacity = 1;
};

/**
 * API: REST Countries from https://github.com/public-apis/public-apis
 */

/**
 * There are multiple ways in JS to write AJAX calls.
 */

/**
 * 1. Promises and the Fetch API
 * Benefits:
 * A) we no longer need to rely on event and callbacks
 * B) Insted of nesting callabcks, we can chain promises while escaping callback hell
 * Note: Promises came with ES6 (in 2015)
 * Promise lifecyle
 * Pending, Settled: fulfilled or rejected
 * -- we can handle the different states
 * -- a promise can be only settled once
 * Consume a promise - when we already have a promise e.g. returned from Fetch API
 * The fetch builds the promise
 *
 * On all promises we can call the .then() method
 * it takes a callback and takes the response of the promise as its argument
 * To read the data of the body of the Promise, we need to call the json on the response
 * .json() is a method we can call on all response objects of the fetch method
 * .json() is also an async funtion, aka it will also return a Promise
 * therefore, it needs to be returned
 * (Promises need to be returned. The Fetch API does it for us, it returns a Promise.)
 */

/** With the console.logs */
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

/** With Arrow Functions */
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then((response) => response.json())
    .then((data) => renderCountry(data[0]));
};

getCountryData("portugal");
