let pg = require('pg-promise');
let db = require('../index.js');
let Promise = require('bluebird');

let getShoppingListForUser = (userId, houseId) => {
  return db.task(task => {
    return task.any(`
      SELECT items.itemname, false as private,  uhi.houses_items_id, uhi.id FROM (
        (SELECT * FROM users_house_items WHERE user_id = $1) uhi
        INNER JOIN (SELECT * FROM houses_items WHERE house_id = $2) hi
        ON hi.id = uhi.houses_items_id
        INNER JOIN items ON items.id = hi.item_id)`, [userId, houseId])
    .then((userPublicList) => {
      return Promise.all([userPublicList, (task.any(`
        SELECT items.itemname, true as private, upi.private_item_id, upi.id FROM (
          (SELECT * FROM users_private_items WHERE user_id = $1) upi
          INNER JOIN (SELECT * FROM private_items WHERE user_id = $1) pi
          ON pi.id = upi.private_item_id
          INNER JOIN items ON items.id = pi.item_id)`, [userId]))]);
    });
  })
  .then(([userPublicList, userPrivateList]) => {
    return userPublicList.concat(userPrivateList);
  })
  .catch(err => {
    console.log(err);
    return err;
  });
};

let updateWithPurchases = (userId, houseId, updateList) => {

  // could be more efficient but I like filter
  let privateItems = updateList.filter((item) => {
    return item.private;
  });
  let publicItems = updateList.filter((item) => {
    return !item.private;
  });

  return db.tx((transaction) => {

    let updateHouseItems = transaction.none(`
      UPDATE houses_items
      SET need_to_restock = false, user_id = NULL
      WHERE id = ANY($1)`, [publicItems.map((item) => item.houses_items_id)]);

    let updateUserHouseItems = transaction.none(`
      DELETE FROM users_house_items
      WHERE id = ANY($1)`, [publicItems.map((item) => item.id)]);

    let updatePrivateItems = transaction.none(`
      UPDATE private_items
      SET need_to_restock = false
      WHERE id = ANY($1)`, privateItems.map((item) => item.private_item_id));

    let updateUserPrivateItems = transaction.none(`
      DELETE FROM users_private_items
      WHERE id = ANY($1)`, privateItems.map((item) => item.id));

    return transaction.batch([updateHouseItems, updateUserHouseItems, updatePrivateItems, updateUserPrivateItems]);

  })
  .then((data) => {
    return getShoppingListForUser(userId, houseId);
  })
  .catch((err) => {
    console.log(err);
    return err;
  });
};

module.exports.getShoppingListForUser = getShoppingListForUser;
module.exports.updateWithPurchases = updateWithPurchases;

