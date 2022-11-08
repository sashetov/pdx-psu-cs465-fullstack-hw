const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const routes = [
  'welcome',
  'redirect',
  'redirected',
  'cache',
  'cookie',
  'other',
];

const getRoutes = () => {
  let result = '';

  routes.forEach(
    (elem) => {
      result += `<li><a href="/${elem}">${elem}</a></li>`;
    },
  );

  return result;
};

app.get('/', (req, res) => {
  const routeResults = getRoutes();
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Exercise 04</h1>');
  res.write(`<ul> ${routeResults} </ul>`);
  res.end();
});

// http://localhost:5000/welcome should return a status code 200 with a welcome message of your choice in html format
app.get('/welcome', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Welcome!</h1>');
  res.end();
});

// http://localhost:5000/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice
app.get('/redirect', (req, res) => {
  res.status(301).redirect('/redirected');
});
app.get('/redirected', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>/redirect redirects to /redirected !</h1>');
  res.end();
});

// http://localhost:5000/cache should return 'this resource was cached' in html format and set the cache max age to a day
app.get('/cache', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.set('Cache-control', 'public, max-age=86400');
  res.write('<h1>this resource was cached</h1>');
  res.end();
});

// http://localhost:5000/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie
app.get('/cookie', (req, res) => {
  res.status(200);
  res.setHeader('Set-Cookie', 'hello=world');
  res.setHeader('Content-Type', 'text/html');
  res.send('<h1>cookies... yum</h1>');
  res.end();
});

// For other routes, such as http://localhost:5000/other, this exercise should return a status code 404 with '404 - page not found' in html format
app.get('*', (req, res) => {
  res.status(404);
  res.setHeader('Content-Type', 'text/html');
  res.send('<h1>404 - page not found</h1>');
  res.end();
});

app.listen(port, () => { });
