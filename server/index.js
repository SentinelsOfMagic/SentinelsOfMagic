var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database/index.js');
var request = require('request');
var pgp = require('pg-promise')();
let path = require('path');
let routeHandlers = require('./lib/route-handlers');


let app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/inventory', function(req, res) {
  db.query('SELECT houses_items.id AS id, houses_items.need_to_restock AS needToRestock, houses_items.notes AS notes, users.username AS username, items.itemname AS name FROM houses_items LEFT JOIN users ON houses_items.user_id = users.id LEFT JOIN items ON houses_items.item_id = items.id WHERE houses_items.house_id = ${houseId#};',
    { houseId: req.body.houseId })
    .then(data => {
      console.log('Successful DB query: ', data);
      res.send(data);
    })
    .catch(err => console.log('Bad DB query: ', err));
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

app.get('/api/shop', routeHandlers.getShoppingList);
app.post('/api/shop', routeHandlers.modifyShoppingList);

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
});

app.listen(process.env.PORT || 1337, function() {
  console.log('Listening on 1337...');
});
