let shop = require('../../database/models/shoppingList');

let getShoppingList = (req, res) => {
  shop.getShoppingListForUser(1, 1).then((data) => {
    console.log('data', data);
    res.send(data);
  })
  .catch((err) => {
    console.log(err);
    // TODO: FIX BEFORE I'M PUBLIC
    res.send(err);
  });
};

let updateWithPurchases = (req, res) => {
  console.log(req);
  shop.updateWithPurchases(1, 1, []).then((data) => {
    console.log('new shopping list: ', data);
    res.send(data);
  })
  .catch((err) => {
    res.send(err);
  });
};

module.exports.getShoppingList = getShoppingList;
module.exports.updateWithPurchases = updateWithPurchases;
