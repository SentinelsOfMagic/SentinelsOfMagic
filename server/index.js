var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database/index.js');
var request = require('request');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/inventory', function(req, res) {
  // query houses_items table JOIN items table on item_id JOIN users table on user_id

  // structure data in response
  // list of items
  /*
  [
    {
      id: ,
      name: ,
      notes: ,
      needToRestock: ,
      username:
    },
    {
      id: ,
      name: ,
      notes: ,
      needToRestock: ,
      username:
    }
  ]
  */
  // send back data
  res.send('Getting inventory...');
});

app.post('/restock', function(req, res) {
  res.send('Need to restock item...');
});

app.post('/claim', function(req, res) {
  res.send('Item has been claimed...');
});

app.post('/delete', function(req, res) {
  res.send('Deleting item...');
});

app.listen(process.env.PORT || 1337, function() {
  console.log('Listening on 1337...');
});
