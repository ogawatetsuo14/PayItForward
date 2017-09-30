const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const publicweb = './dist';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(publicweb));
console.log(`serving ${publicweb}`);

// CORSを許可する
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(`index.html`, { root: publicweb });
});

const port = process.env.PORT || '3000';
app.listen(port, () => console.log(`API running on localhost:${port}`));
