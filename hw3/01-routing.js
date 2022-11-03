const http = require('http');

const port = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  const routes = [
    'welcome',
    'redirect',
    'redirected',
    'cache',
    'cookie',
    'check-cookies',
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

  if (req.url === '/') {
    const routeResults = getRoutes();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Exercise 01</h1>');
    res.write(`<ul> ${routeResults} </ul>`);
    res.end();
  } else if (req.url === '/welcome') {
    // http://localhost:5000/welcome should return a status code 200 with a welcome message of your choice in html format
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Welcome</h1>');
    res.end();
  } else if (req.url === '/redirect') {
    // http://localhost:5000/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice
    res.writeHead(302, { Location: '/redirected' });
    res.write('<h1>Welcome</h1>');
    res.end();
  } else if (req.url === '/redirected') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Redirected you from /redirect</h1>');
    res.end();
  } else if (req.url === '/cache') {
    // http://localhost:5000/cache should return 'this resource was cached' in html format and set the cache max age to a day
    res.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'max-age=86400' });
    res.write('<h1>this resource was cached</h1>');
    res.end();
  } else if (req.url === '/cookie') {
    // http://localhost:5000/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie
    res.writeHead(200, { 'Set-Cookie': 'hello=world;', 'Content-Type': 'text/plain' });
    res.write('cookies... yumm');
    res.end();
  } else if (req.url === '/check-cookies') {
    // http://localhost:5000/check-cookies should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    let response = 'no';
    let cookies = req.headers?.cookie;
    if (cookies) {
      cookies = cookies.split(';');
      for (let i = 0; i < cookies.length; i += 1) {
        const cookie = cookies[i];
        const kv = cookie.split('=');
        if (kv[0].trim() === 'hello' && kv[1].trim() === 'world') {
          response = 'yes';
        }
      }
    }
    if (!cookies) response = 'no';
    res.write(`${response}`);
    res.end();
  } else {
    // For other routes, such as http://localhost:5000/other, this exercise should return a status code 404 with '404 - page not found' in html format
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>404 - page not found</h1>');
    res.end();
  }
});

server.listen(port, () => { });
