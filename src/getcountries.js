
export function getCountries(value) {
    
    return fetch(`https://restcountries.com/v3.1/name/${value}?fields=name,capital,population,flags,languages`)
        
}