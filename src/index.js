import '././css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from '././fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

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
      ({
        name: { official },
        capital,
        population,
        flags: { svg },
        languages,
      }) => {
        if (arr.length < 2) {
          return `<li>
    <h2>${official}</h2>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>languages: ${Object.values(languages).join(', ')}</p>
    <img src = ${svg} width = 320px/>
    </li>`;
        }
        return `<li>
    <h2>${official}</h2>
    <img src = ${svg} width = 320px/>
    </li>`;
      }
    )
    .join('');

  listEl.innerHTML = markup;
}

listEl.style.listStyle = 'none';
