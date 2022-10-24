/** Exercise 04 - API * */
/*
- Use file 04-api.html and 04-api.js.
- Use the REST Countries API to make a GET request for the names of all
  the countries in the world. You can use any version of the API.
  - Loop through the response and output all country names and populations.
  - Make sure to properly format the population.
  - Implement an error case if there’s no response or the response is invalid.
 */

function appendListItem(resultsEl, str) {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(str));
  resultsEl.appendChild(li);
}

function localizedComparator(a, b) {
  return a.localeCompare(b);
}

function getData(resultsEl, dataUrl) {
  fetch(dataUrl).then((res) => res.json()).then((countries) => {
    const strs = [];
    for (let i = 0; i < countries.length; i += 1) {
      const country = countries[i];
      const countryName = country.name.common;
      const { population } = country;
      const str = `${countryName} - ${population}`;
      strs.push(str);
    }
    strs.sort(localizedComparator);
    for (let i = 0; i < strs.length; i += 1) {
      appendListItem(resultsEl, strs[i]);
    }
  });
}

window.addEventListener('load', () => {
  const url = 'https://restcountries.com/v3.1/all';
  const results = document.getElementById('results');
  getData(results, url);
});
