const BASE_URL = 'https://restcountries.com/v3.1/name/';
export const fetchCountries = function (name) {
    return fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(SyntaxError);
        });
}

