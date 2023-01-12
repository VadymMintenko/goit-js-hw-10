import './css/styles.css';
const debounce = require('lodash.debounce');
console.log(debounce);

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
console.log(inputEl);
const listEl = document.querySelector('.country-list');
console.log(listEl);

// fetch function
function fetchCountries() {
  const BASE_URL = 'https://restcountries.com/v2/all';

  return fetch(
    `${BASE_URL}?fields=name,capital,population,flags,languages`
  ).then(resp => {
    if (!resp) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}
fetchCountries().then(data => createMarkup(data));

function createMarkup(arr) {
  const markup = arr
    .map(
      ({ name, capital, population, flags, languages }) => `<li>
    <h2>${name}</h2>
    <p>${capital}</p>
    <p>${population}</p>
    <img src = ${flags} alt = "National Flag of ${name}>
    <p>${languages}</p>
    </li>`
    )
    .join('');

  listEl.insertAdjacentHTML('beforeend', markup);
}

// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов
