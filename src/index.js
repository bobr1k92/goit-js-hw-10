import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchInput = document.getElementById('search-box');
const countriesList = document.querySelector('.country-list');

searchInput.addEventListener(
  'input',
  debounce(() => {
    const query = searchInput.value.trim();
    countriesList.innerHTML = '';

    if (!query) {
      return;
    }

    fetchCountries(query).then(foundData => {
      if (foundData.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (foundData.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else if (foundData.length >= 2 && foundData.length <= 10) {
        renderOneCountry(foundData);
      } else {
        renderCountriesList(foundData);
      }
    });
  }, DEBOUNCE_DELAY)
);

function renderCountriesList(countries) {
  const countryList = countries
    .map(({ name, capital, population, flags, languages }) => {
      return `<li class="country-item">
      <span class="country-field"><img src="${flags.svg}" alt="Flag of ${
        name.official
      }" width = 30px height = 20px />
        <h2 class="country-title">${name.official}</h2></span>
        
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${Object.values(languages)}</p>
      </li>`;
    })
    .join('');
  countriesList.insertAdjacentHTML('beforeend', countryList);
}

function renderOneCountry(countries) {
  const countryEl = countries
    .map(({ name, flags }) => {
      return `<li class="country-item">
      <img src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 20px>
         <b>${name.official}</p>
                </li>`;
    })
    .join('');
  countriesList.insertAdjacentHTML('beforeend', countryEl);
}