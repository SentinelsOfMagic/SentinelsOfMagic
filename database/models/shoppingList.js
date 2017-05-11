let pg = require('pg-promise');
let db = require('../index.js');
let Promise = require('bluebird');

let getShoppingListForUser = (userId, houseId) => {
  return db.any(`SELECT items.itemname, uhi.houses_items_id, false as private
    FROM (
      (SELECT * FROM users_house_items WHERE user_id = $1) uhi
      INNER JOIN (SELECT * FROM houses_items WHERE house_id = $2) hi
      ON hi.id = uhi.houses_items_id
      INNER JOIN items ON items.id = hi.item_id)`, [userId, houseId])
    .then((userPublicList) => {
      return Promise.all([userPublicList, (db.any(`SELECT items.itemname, upi.private_item_id, true as private FROM (
        (SELECT * FROM users_private_items WHERE user_id = $1) upi
        INNER JOIN (SELECT * FROM private_items WHERE user_id = $1) pi
        ON pi.id = upi.private_item_id
        INNER JOIN items ON items.id = pi.item_id)`, [userId]))]);
    })
    .then(([userPublicList, userPrivateList]) => {
      return userPublicList.concat(userPrivateList);
    });
};

let updateWithPurchases = () => {

};

let removeItemsFromShoppingList = () => {

};

module.exports = getShoppingListForUser;

