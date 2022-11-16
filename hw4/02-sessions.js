const express = require('express');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 5000;
const sessSecret = process.env.SESS_SECRET;
app.use(session({ secret: `${sessSecret}` }));
app.get('*', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  if (!req.session.paths) {
    req.session.paths = [];
  }
  if (req.originalUrl !== '/favicon.ico' && !req.session.paths.includes(req.originalUrl)) {
    req.session.paths.push(req.originalUrl);
  }
  res.write(`Currently on route: ${req.originalUrl}`);
  if (req.session.paths.length === 1) {
    res.write(`</br></br>Welcome to http://localhost:${port}`);
  } else {
    res.write('</br></br>Previously visited:</br>');
    for (let i = 0; i < req.session.paths.length; i += 1) {
      const path = req.session.paths[i];
      res.write(`</br>${path}`);
    }
  }
  res.end();
});
app.listen(port, () => { });
