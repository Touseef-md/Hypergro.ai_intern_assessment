const db = require("../Database/db");

exports.postAddStockFavourite = async (req, res) => {
  try {
    id = req.body.id;
    stockName = req.body.name;
    console.log(id);
    console.log(stockName);
    const [result, metadata] = await db.query(
      `INSERT INTO favourite (ID,SC_NAME)  VALUES ('${id}','${stockName}');`
    );
    res.status(200).send("Successfully added to Favourites...");
    console.log(result);
  } catch (err) {
    res.status(500).send("Could not add Stock to Favourite...");
  }
};

exports.getFavouriteStocks = async (req, res) => {
  try {
    id = req.params.id;
    const [result, metadata] = await db.query(
      `SELECT SC_NAME FROM favourite WHERE ID='${id}';`
    );
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Could not get the Favourites...");
  }
};

exports.deleteFavouriteStock = async (req, res) => {
  try {
    id = req.body.id;
    stockName = req.body.name;
    const [result, metadata] = await db.query(
      `DELETE FROM favourite WHERE ID='${id}' AND SC_NAME='${stockName}';`
    );
    console.log(result);
    res.status(200).send("Successfully deleted the Stock from Favourites...");
  } catch (err) {
    res.status(500).send("Could not delete the Stock from Favourite...");
  }
};
