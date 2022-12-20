export default function fetchCountries(query) {
    const urlAPI = `https://restcountries.com/v3.1/name/${query}?fields=name,capital,population,flags,languages`;
  
    return fetch(urlAPI)
      .then(res => {
        if (!res.ok) {
          if (res.status === 404) {
            return [];
          }
          throw new Error(res.status);
        }
  
        return res.json();
      })
      .then(countries => {
        return countries;
      })
      .catch(error => {
        console.log(error);
      });
  }