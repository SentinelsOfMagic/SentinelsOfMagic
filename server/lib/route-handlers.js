let getShoppingListForUser = require('../../database/models/shoppingList');

let getShoppingList = (req, res) => {
  getShoppingListForUser(1, 1).then((data) => {
    console.log('data', data);
    res.send(data);
  })
  .catch((err) => {
    console.log(err);
    // TODO: FIX BEFORE I'M PUBLIC
    res.send(err);
  });
};

let modifyShoppingList = (req, res) => {
  res.send('TODO: post from list');
};

module.exports.getShoppingList = getShoppingList;
module.exports.modifyShoppingList = modifyShoppingList;
