var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database/index.js');
var request = require('request');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/inventory', function(req, res) {

});


app.post('/createUser', function(req, res) {
  console.log('listening');
});

app.listen(1337, function() {

  console.log('Listening on 1337...');
});
