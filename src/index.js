import './css/styles.css';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function fetchCountries(evt) {
  const BASE_URL = `https://restcountries.com/v3.1/name/${evt}`;
  return fetch(
    `${BASE_URL}?fields=name,capital,population,flags,languages`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(console.log('by'));
    }

    return resp.json();
  });
}

function onInput() {
  inputValue = this.value.trim();

  if (!inputValue) {
    listEl.innerHTML = '';
    return;
  }
  fetchCountries(inputValue)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        createMarkup(data);
      }
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
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
