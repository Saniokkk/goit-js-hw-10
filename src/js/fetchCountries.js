const BASE_URL = 'https://restcountries.com/v2/name/';
export const fetchCountries = function (name) {
    return fetch(`${BASE_URL}${name}?name.official,capital,languages,population,flags,currencies`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error(Notify.failure('Oops, there is no country with that name'))
        });
}

