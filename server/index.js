var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database/index.js');
var request = require('request');
var pgp = require('pg-promise')();
let path = require('path');
let routeHandlers = require('./lib/route-handlers');


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
  db.query('UPDATE houses_items SET need_to_restock = TRUE WHERE id = ${itemId#}',
    { itemId: req.body.itemId })
    .then(() => {
      console.log('Item successfully updated to need_to_restock = TRUE in houses_items table');
      res.sendStatus(201);
    })
    .catch(err => console.log('Item need_to_restock value unable to be updated in houses_items: ', err));
});

app.post('/claim', function(req, res) {
  db.query('UPDATE houses_items SET user_id = ${userId#} WHERE id = ${itemId#}',
    { itemId: req.body.itemId, userId: req.body.userId })
    .then(() => {
      console.log(`Item successfully updated to user_id = ${req.body.userId} in houses_items table`);
      res.sendStatus(201);
    })
    .catch(err => console.log('Item user_id value unable to be updated in houses_items: ', err));
});

app.post('/delete', function(req, res) {
  db.query('DELETE FROM houses_items WHERE id = ${itemId#}',
    { itemId: req.body.itemId })
    .then(() => {
      console.log('Item successfully deleted from houses_items table');
      res.sendStatus(201);
    })
    .catch(err => console.log('Item unable to be removed from houses_items: ', err));
});

app.post('/createUser', function(req, res) {
  console.log('expect username and houseId', req.body);
  res.send('Creating User...');
});

app.post('/Users', function(req, res) {
  console.log('are you herreeeeeeee?', req.body);

  res.send([
  {
    id: 1,
    username: 'bob',
    'house_id': 3
  },
  {
    id: 2,
    username: 'tom',
    'house_id': 3
  },
  {
    id: 3,
    username: 'joe',
    'house_id': 2
  },
  {
    id: 4,
    username: 'pam',
    'house_id': 2
  }


]);
});

app.get('/api/shop', routeHandlers.getShoppingList);
app.post('/api/shop', routeHandlers.modifyShoppingList);

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
});

app.listen(process.env.PORT || 1337, function() {
  console.log('Listening on 1337...');
});
