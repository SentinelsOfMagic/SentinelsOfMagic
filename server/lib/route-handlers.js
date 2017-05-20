let shop = require('../../database/models/shoppingList');

let getShoppingList = (req, res) => {
  shop.getShoppingListForUser(req.body.userId, req.body.houseId)
  .then(data => {
    console.log('getshoppingList');
    res.send(data);
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  });
};

let updateWithPurchases = (req, res) => {

  shop.updateWithPurchases(req.body.userId, req.body.houseId, req.body.data).then((data) => {
    console.log('updateWithPurchases');
    res.send(data);
  })
  .catch((err) => {
    res.send(err);
  });
};

module.exports.getShoppingList = getShoppingList;
module.exports.updateWithPurchases = updateWithPurchases;
