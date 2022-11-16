const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

// Use Pug as the templating engine
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// REST Countries URL
const url = 'https://restcountries.com/v3.1/all';

// Add your code here
const queryCountries = async (queryUrl) => axios.get(queryUrl, { }).then();
const localizedComparator = (a, b) => a.localeCompare(b);
const populationComparator = (a, b) => {
  if (a.population > b.population) {
    return -1;
  }
  if (a.population < b.population) {
    return 1;
  }
  return 0;
};

app.get('/', async (req, res) => {
  // render pug template for the index.html file
  res.render('index', {
    heading: 'Countries of the World',
    main: 'Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world',
  });
});
app.get('/capitals', async (req, res) => {
  // map the output array to create an array with country names and capitals
  // check for empty data in the output array
  const countries = (await queryCountries(url)).data;
  for (let i = 0; i < countries.length; i += 1) {
    const country = countries[i];
    const countryName = country.name.common;
    let capital = '';
    if (country.capital) [capital] = country.capital;
    countries[i] = `${countryName} - ${capital}`;
  }
  countries.sort(localizedComparator);
  res.render('page', {
    heading: 'Countries and Capitals',
    results: countries,
  });
});
app.get('/populous', async (req, res) => {
  // filter the output array for the countries with population of 50 million or more
  // sort the resulting array to show the results in order of population
  // map the resulting array into a new array with the country name and formatted population
  const moreThan = 50000000;
  const countries = (await queryCountries(url)).data;
  countries.sort(populationComparator);
  const populous = [];
  for (let i = 0; i < countries.length; i += 1) {
    const country = countries[i];
    const countryName = country.name.common;
    const { population } = country;
    if (country.population >= moreThan) {
      const populationStr = population.toLocaleString('en-US');
      populous.push(`${countryName} - ${populationStr}`);
    }
  }
  res.render('page', {
    heading: 'Most Populous Countries',
    results: populous,
  });
});
app.get('/regions', async (req, res) => {
  // reduce the output array in a resulting object that will feature the
  // numbers of countries in each region
  // disregard empty data from the output array
  const countries = (await queryCountries(url)).data;
  const regions = [];
  const regionCountries = {};
  for (let i = 0; i < countries.length; i += 1) {
    const country = countries[i];
    const { region } = country;
    if (Object.keys(regionCountries).indexOf(region) === -1) {
      regionCountries[region] = 1;
    }
    regionCountries[region] += 1;
  }
  for (let i = 0; i < Object.keys(regionCountries).length; i += 1) {
    const regionName = Object.keys(regionCountries)[i];
    const numCoutnries = regionCountries[regionName];
    regions.push(`${regionName} - ${numCoutnries}`);
  }
  regions.sort(localizedComparator);
  res.render('page', {
    heading: 'Regions of the World',
    results: regions,
  });
});

app.listen(port, () => { });
