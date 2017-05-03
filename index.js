// Heroku deploy test file, server entry point
let express = require('express');

let app = express();

app.get('/', function (req, res) {
  res.send('Hello');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Server listen port 3000');
});
