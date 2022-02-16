import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import markupCountryTemplate from './js/components/markupCountry'
import markupCountries from './js/components/markupCountries'


const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function clearDisplay() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
}

function searchCountry() {
    const country = refs.input.value.trim();
    if (country === '') {
        clearDisplay();
    return;
    }

    fetchCountries(country)
        .then(result => { 
            if (result.status === 404) {
                Notify.failure('Oops, there is no country with that name');
            }else if (result.length > 10) {                    
                clearDisplay()
                Notify.info("Too many matches found. Please enter a more specific name.");
            } else if (result.length >= 2 && result.length <= 10) {               
                clearDisplay()
                const countries = markupCountries(result);             
                refs.countryList.innerHTML = countries;

            } else if (result.length === 1) {
                clearDisplay()               
                const country = markupCountryTemplate(result[0]);
                refs.countryInfo.innerHTML = country;            
            }
    });       
}
