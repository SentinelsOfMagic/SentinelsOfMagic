let pg = require('pg-promise');
let db = require('../index.js');

let getShoppingListForUser = (userId, houseId) => {
  return db.any(`SELECT items.itemname, uhi.houses_items_id
    FROM (
      (SELECT * FROM users_house_items WHERE user_id = $1) uhi
      INNER JOIN (SELECT * FROM houses_items WHERE house_id = $2) hi
      ON hi.id = uhi.houses_items_id
      INNER JOIN items ON items.id = hi.item_id)`, [userId, houseId]);
};

module.exports = getShoppingListForUser;

