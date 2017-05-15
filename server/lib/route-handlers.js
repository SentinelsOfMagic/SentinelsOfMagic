let shop = require('../../database/models/shoppingList');

let getShoppingList = (req, res) => {

  shop.getShoppingListForUser(req.cookies.fridgrSesh.userId, req.cookies.fridgrSesh.houseId).then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log(err);
    res.send(err);
  });
};

let updateWithPurchases = (req, res) => {

  shop.updateWithPurchases(req.cookies.fridgrSesh.userId, req.cookies.fridgrSesh.houseId, req.body.data).then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.send(err);
  });
};

module.exports.getShoppingList = getShoppingList;
module.exports.updateWithPurchases = updateWithPurchases;
