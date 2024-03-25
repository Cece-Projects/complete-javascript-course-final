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
 * Error Handling Simplified
 * To avoid repeating code,
 * building a helper function to manage
 * the fetch, the error handling and the convertion to json
 */

const getJSON = function (url, errorMsg = "Something went wrong.") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found.")
    .then((data) => {
      console.log(data);
      renderCountry(data[0]);
      // Note: country objects that don't have neighbours are completely missing the borders property
      const neighbour = data[0].borders?.[0];

      if (!neighbour) {
        throw new Error("No neighbour found!");
      }

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        "Country not found."
      );
    })
    .then((data) => renderCountry(data, "neighbour"))
    .catch((error) => {
      console.error(`${error} 💥💥💥`);
      renderError(`Something went wrong.💥💥 ${error.message} Try again.`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener("click", function () {
//   getCountryData("portugal");
// });

getCountryData("australia");
