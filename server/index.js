var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database/index.js');
var request = require('request');
var pgp = require('pg-promise')();
let path = require('path');
var cookieParser = require('cookie-parser');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + '/../client/dist'));

// routes
let routeHandlers = require('./lib/route-handlers');
let authRoutes = require('./lib/auth.js');
app.use('/auth', authRoutes);

app.post('/inventory', (req, res) => {
  db.query('SELECT houses_items.id AS id, houses_items.need_to_restock AS needToRestock, houses_items.notes AS notes, users.username AS username, items.itemname AS name FROM houses_items LEFT JOIN users ON houses_items.user_id = users.id LEFT JOIN items ON houses_items.item_id = items.id WHERE houses_items.house_id = ${houseId#};',
    { houseId: req.body.houseId })
    .then(data => {
      console.log('Successful DB query: ', data);
      res.send(data);
    })
    .catch(err => console.log('Bad DB query: ', err));
});

app.post('/restock', (req, res) => {
  db.query('UPDATE houses_items SET need_to_restock = TRUE WHERE id = ${itemId#}',
    { itemId: req.body.itemId })
    .then(() => {
      console.log('Item successfully updated to need_to_restock = TRUE in houses_items table');
      res.sendStatus(201);
    })
    .catch(err => console.log('Item need_to_restock value unable to be updated in houses_items: ', err));
});

app.post('/claim', (req, res) => {
  db.query('UPDATE houses_items SET user_id = ${userId#} WHERE id = ${itemId#}',
    { itemId: req.body.itemId, userId: req.body.userId })
    .then(() => {
      console.log(`Item successfully updated to user_id = ${req.body.userId} in houses_items table`);
      res.sendStatus(201);
    })
    .catch(err => console.log('Items user_id value unable to be updated in houses_items: ', err));

  db.query('INSERT INTO users_house_items (user_id, houses_items_id) VALUES (${userId#}, ${itemId#})',
    { itemId: req.body.itemId, userId: req.body.userId })
    .then(() => {
      console.log('Item successfully inserted item into users_houses_items table');
    })
    .catch(err => console.log('Item unable to be inserted in users_houses_items: ', err));
});

app.post('/delete', (req, res) => {
  db.query('DELETE FROM houses_items WHERE id = ${itemId#}',
    { itemId: req.body.itemId })
    .then(() => {
      console.log('Item successfully deleted from houses_items table');
      res.sendStatus(201);
    })
    .catch(err => console.log('Item unable to be removed from houses_items: ', err));
});

app.post('/createUser', function(req, res) {
  console.log('houseId', req.body.houseId);
  //need to check if user is already in house
  // db.query('SELECT * FROM users WHERE username=${userName} and house_id=${houseId#}', { userName: req.body.userName, houseId: req.body.houseId })
  //   .then((data)=>{
  //     console.log('user already exists');
  //     res.send(data);
  //   })
  //   .catch (err => console.log('unable '));


  db.query('INSERT INTO users (username, house_id) VALUES (${userName}, ${houseId#})', { userName: req.body.userName, houseId: req.body.houseId } )
    .then(() => {
      console.log('done creating user');
      res.sendStatus(201);
    })
    .catch (err => console.log('unable to create user', err));


});

app.post('/settingCooks', function(req, res) {
  console.log('shooott...', req.body.userId);
  db.query('SELECT * FROM users WHERE id=${userId#}', { userId: req.body.userId})
    .then((data)=>{
      res.clearCookie('userId');
      res.cookie('userId', data[0].id);
      res.send('successful cookie passing');
    })
    .catch(err => console.log('unable to set cookies', err));
});

app.post('/cookUser', function(req, res) {
  db.query('SELECT * FROM users WHERE username=${userName}', { userName: req.body.userName })
  .then( (data)=> {
    res.clearCookie('userId');
    res.cookie('userId', data[0].id);
    res.send(201);
  })
  .catch( err=> console.log('unable to pass cookies', err));
});

app.post('/users', function(req, res) {
  db.query('SELECT * FROM users WHERE house_id=${houseId#}', { houseId: req.body.houseId })
    .then( (data)=> {
      res.send(data);
    })
    .catch(err => console.log('unable to get users', err));
});

app.post('/add', (req, res) => {

  console.log('Adding item to inventory... ', req.body);

  db.query('SELECT id FROM items WHERE itemname = ${name}', { name: req.body.name })
    .then(body => {
      if (body.length > 0) {
        console.log('We got the ID now: ', body[0].id);
        db.query('INSERT INTO houses_items (house_id, item_id, need_to_restock, notes) VALUES (${houseId#}, ${itemId#}, ${needToRestock^}, ${notes})',
          { houseId: req.body.houseId, itemId: body[0].id, needToRestock: false, notes: req.body.notes })
          .then(() => {
            console.log('Successful insert into HOUSES_ITEMS');
            res.sendStatus(201);
          })
          .catch(err => console.log('Unable to add to houses_items table: ', err));
        return;
      }
      db.query('INSERT INTO items (itemname) VALUES (${name})', { name: req.body.name })
        .then(() => {
          console.log('Successful insert into ITEMS');
          db.query('SELECT id FROM items WHERE itemname = ${name}', { name: req.body.name })
          .then(body => {
            console.log('Successful in retrieving the item id: ', body[0].id);
            db.query('INSERT INTO houses_items (house_id, item_id, need_to_restock, notes) VALUES (${houseId#}, ${itemId#}, ${needToRestock^}, ${notes})',
              { houseId: req.body.houseId, itemId: body[0].id, needToRestock: false, notes: req.body.notes })
              .then(() => {
                console.log('Successful insert into HOUSES_ITEMS');
                res.sendStatus(201);
              })
              .catch(err => console.log('Unable to add to houses_items table: ', err));
          })
          .catch(err => console.log('Error getting item id form ITEMS: ', err));
        })
        .catch(err => console.log('Error inserting row into ITEMS: ', err));
      return;
    })
    .catch(err => console.log('Error querying items table for id: ', err));
});

app.get('/api/shop', routeHandlers.getShoppingList);
app.post('/api/shop', routeHandlers.updateWithPurchases);

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
});

app.listen(process.env.PORT || 1337, function() {
  console.log('Listening on 1337...');
});
