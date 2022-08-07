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
    
    const value = searchInput.value.trim()
    const countriesData = getCountries(value)
        .then(response => response.json())
        .then(data => createList(data))
        .catch((eror) => 'server not found')

    
}


function createList (data) {
    const list = data.reduce((acc, item) => acc + createItem(item), "")
    console.log(data)
    countryList.insertAdjacentHTML("beforeend", list)
}

function createItem(item) {
    const { name: { official, }, capital, population, flags: { svg }, languages } = item;
    console.log(official)
    return `<li clas="list-item"><img width = 40, height = 30 class="small-flag" src="${svg}" alt="flag"></img><h3 clas="small-title">${official}</h3></li>`

}

// function createCountry(item) {
//     const { name: { official }, capital, population, flags: { svg }, languages } = item;
//     return `<div class="container">
//             <img class="flag" src="${svg}" alt="flag">
//             <h2 class="title">${official}</h2>
//             </div>
//             <p class="capital">${capital}</p>
//             <p class="population">${population}</p>
//             <p class="languages">${Object.values(languages).join(', ')}</p>`
// }

/* <img class="small-flag" src="${svg}" alt="${common}"></img> */
