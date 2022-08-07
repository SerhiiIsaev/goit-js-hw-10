import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.5.min.css";
const debounce = require('lodash.debounce');
import './css/styles.css';
import {getCountries} from './getcountries'

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;
searchInput.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY))

function onInputSearch(e){
    
    let value = searchInput.value.trim()
    if (value === "") {
        countryInfo.innerHTML = ""
        countryList.innerHTML = ""
    } else {
        countryInfo.innerHTML = ""
        countryList.innerHTML = ""
        const countriesData = getCountries(value)
            .then(response => response.json())
            .then(data => createHTML(data))
            .catch((eror) => 'server not found')
    }
}

function createHTML(data) {
    console.log(data)
    if (data.length > 10) {

        Notify.info(`"Too many matches found. Please enter a more specific name."`);
    }
    else if (data.length > 1 && data.length <= 10) {
        createList(data)
    } else if(data.length === 1) {
        createCountryCard(data)
    } else if(data.status === 404) {
        Notify.failure("Oops, there is no country with this name")
    } 
}

function createList (data) {
    const list = data.reduce((acc, item) => acc + createItem(item), "")
    console.log(data)
    countryList.insertAdjacentHTML("beforeend", list)
}

function createCountryCard(data){
    const info = createCountry(data[0])
    countryInfo.insertAdjacentHTML("beforeend", info)
}

function createItem(item) {
    const { name: { official }, flags: { svg, png } } = item;
    console.log(png)
    return `<li class="list-item"><img width = 40, height = 30 class="small-flag" src="${png}" alt="flag"></img><h3 class="small-title">${official}</h3></li>`

}

function createCountry(item) {
    const { name: { official }, capital, population, flags: { svg }, languages } = item;
    return `<div class="container">
            <img class="flag" width = 40, height = 30 src="${svg}" alt="flag">
            <h3 class="title">${official}</h3>
            </div>
            <p class="capital"><span class="text">Capital:</span> ${capital}</p>
            <p class="population"><span class="text">Population:</span> ${population}</p>
            <p class="languages"><span class="text">Languages:</span> ${Object.values(languages).join(', ')}</p>`
}

