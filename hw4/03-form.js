const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

// Use middleware static() to serve all static files in the given folder
app.use(express.static('public'));

// Use middleware urlencoded() to parse an incoming request with a urlencoded
// payload and return an objectß
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static('public'));

const getFormResultsHTML = (body) => {
  let result = '';
  let wantsNewsletter = false;
  const keys = Object.keys(body);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    let val = body[key];
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

app.post('/submit', (req, res) => {
  res.status(200);
  res.setHeader('Content-Type', 'text/html');
  const formResults = getFormResultsHTML(req.body);
  res.send(`${formResults}`);
  res.end();
});

app.listen(port, () => { });
