const http = require('http');

const port = process.env.PORT || 5002;
/*
In this exercise, you will parse the URL for query parameters and return a
table with the information for each query parameter.
Example: http://localhost:5000/attributes?hello=world&lorem=ipsum
hello : world
lerem : ipsum
Consider other test cases to check the robustness of your solution.
- This implementation should work with a variety of query parameters.
- Further Reading:
- MDN - URL() interface https://developer.mozilla.org/en-US/docs/Web/API/URL
*/
const server = http.createServer((req, res) => {
  const routes = [
    '/attributes?hello=world&lorem=ipsum',
    '/items?first=1&second=2&third=3&fourth=4',
    '/characters?spongebob=squarepants&patrick=star&sandy=cheeks',
    '/somethingelse?page=1&limit=5&productType=type1&productType=type2&productType=type3&brand=brand1&brand=brand2',
    '/somethingelse2?page=&limit=&&',
  ];

  // use the URL interface to work with URLs
  // source: https://developer.mozilla.org/en-US/docs/Web/API/URL
  const url = new URL(req.url, `http://${req.headers.host}`);

  const getRoutes = () => {
    let result = '';
    routes.forEach(
      (elem) => { result += `<li><a href="${elem}">${elem}</a></li>`; },
    );
    return result;
  };
  const getKeyValParams = () => {
    let result = '<table border="1">';
    const entries = Array.from(url.searchParams.entries());
    for (let i = 0; i < entries.length; i += 1) {
      const key = entries[i][0];
      const val = entries[i][1];
      result += `<tr><td>${key}</td><td>${val}</td></tr>`;
    }
    result += '</table>';
    return result;
  };
  if (req.url === '/') {
    const routeResults = getRoutes();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Exercise 02</h1>');
    res.write(`<ul> ${routeResults} </ul>`);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const paramsResults = getKeyValParams();
    res.write(`${paramsResults}`);
  }
  res.end();
});

server.listen(port, () => { });
