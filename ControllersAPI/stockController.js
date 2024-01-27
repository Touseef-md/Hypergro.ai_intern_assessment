const db = require("../Database/db");

exports.getTop10 = async (req, res) => {
  console.log("Request received...");
  try {
    const [result, metadata] = await db.query(
      "SELECT * FROM bhavcopy LIMIT 10;"
    );
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Could not get the Top 10 Stocks...");
  }
};

exports.getStockByName = async (req, res) => {
  try {
    stockName = req.params.name;
    console.log(stockName);
    const [result, metadata] = await db.query(
      `SELECT * FROM bhavcopy WHERE SC_NAME LIKE '%${stockName}%';`
    );
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Could not get the Stock...");
  }
};

exports.getStockPriceHistory = async (req, res) => {
  try {
    stockName = req.params.name;
    const [result, metadata] = await db.query(
      `SELECT OPEN,HIGH,LOW FROM bhavcopy WHERE SC_NAME LIKE '%${stockName}%';`
    );
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Could not get the Stock Price History...");
  }
};
