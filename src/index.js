import './css/styles.css';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
// 'https://restcountries.com/v2/all'

// fetch function
function fetchCountries(evt) {
  const BASE_URL = `https://restcountries.com/v3.1/name/${evt}`;
  return fetch(
    `${BASE_URL}?fields=name,capital,population,flags,languages`
  ).then(resp => {
    if (!resp) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}

function createMarkup(arr) {
  let markup = arr
    .map(
      ({ name, capital, population, flags, languages }) => `<li>
    <h2>${name.official}</h2>
    <p>${capital}</p>
    <p>${population}</p>
    <img src = ${flags.svg} alt = "National Flag of ${name} width = 320px>
    <p>${languages.name}</p>
    </li>`
    )
    .join('');

  listEl.innerHTML = markup;
}

function onInput() {
  inputValue = this.value;
  console.log(inputValue);
  if (!this.value) {
    listEl.innerHTML = '';
    return;
  }
  fetchCountries(inputValue.trim()).then(data => {
    if (data.length > 10) {
      alert('qweqweqwe');
    } else {
      createMarkup(data);
    }
  });
}
