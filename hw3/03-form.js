// example adapted from the Nodejs.org docs
const http = require('http');

const port = process.env.PORT || 5003;
/*
Create the following routes for the form submission behavior:
- http://localhost:5001/form should return a form with input elements for username, email, and submit button
- http://localhost:5001/submit should return all the data the user entered
  */
const postHTML = `
<html>
  <head>
    <title>Form</title>
  </head>
  <body>
    <form method='post' action="/submit">
      <label for="name">Name: </label>
      <input type="text" name="Name" id="name" required><br />
      <label for="email">Email: </label>
      <input type="email" name="Email" id="email" required><br />
      <label for="comments">Comments: </label>
      <input type="textarea" name="Comments" id="comments"><br />
      <label for="comments">Newsletter: </label>
      <input type="checkbox" name="Newsletter" id="newsletter"><br />
      <input type='submit'>
    </form>
  </body>
</html>`;

const server = http.createServer((req, res) => {
  let body = '';
  const routes = [
    '/form',
    '/submit',
  ];
  const getRoutes = () => {
    let result = '';
    routes.forEach(
      (elem) => { result += `<li><a href="${elem}">${elem}</a></li>`; },
    );
    return result;
  };
  const getKeyValParams = (url) => {
    let result = '';
    const entries = Array.from(url.searchParams.entries());
    let wantsNewsletter = false;
    for (let i = 0; i < entries.length; i += 1) {
      const key = entries[i][0];
      let val = entries[i][1];
      if (val === '') {
        val = 'n/a';
      } else if (key === 'Newsletter') {
        val = 'Yes, sign me up for the newsletter.';
        wantsNewsletter = true;
      }
      result += `${key} : ${val}</br>`;
    }
    if (!wantsNewsletter) { // add at end
      const key = 'Newsletter';
      const val = 'No, thank you';
      result += `${key} : ${val}</br>`;
    }
    return result;
  };
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    if (req.url === '/') {
      const routeResults = getRoutes();
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('<h1>Exercise 03</h1>');
      res.write(`<ul> ${routeResults} </ul>`);
    } else if (req.url === '/form') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(postHTML);
    } else if (req.url === '/submit') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      const url = new URL(`/submit?${body}`, `http://${req.headers.host}`);
      const paramsResults = getKeyValParams(url);
      res.write(`${paramsResults}`);
    }
    res.end();
  });
});

server.listen(port, () => { });
