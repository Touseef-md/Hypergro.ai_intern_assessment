// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const cors = require("cors");
const db = require("./Database/db");
// const getqueries = require("./API/get");
// Create Express app
const app = express();
app.use(cors());
app.use(express.json());
const port = 5005;

// // Dummy data for demonstration purposes
// const stocks = [
//   { id: 1, name: "AAPL", price: 150.25, history: [140.5, 145.2, 148.7] },
//   { id: 2, name: "GOOGL", price: 2700.75, history: [2680.5, 2695.2, 2698.7] },
//   // ... add more stock data
// ];

// const favoriteStocks = [];

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// // Route to get the top 10 stocks
// app.get("/api/stocks/top10", (req, res) => {
//   db.gettop10();
//   // Dummy implementation, replace with actual logic
//   // const top10Stocks = stocks.slice(0, 10);
//   res.json(top10Stocks);
// });

// // Route to find stocks by name
// app.get("/api/stocks/:name", (req, res) => {
//   const stockName = req.params.name.toUpperCase();
//   // Dummy implementation, replace with actual logic
//   const foundStock = stocks.find((stock) => stock.name === stockName);
//   if (foundStock) {
//     res.json(foundStock);
//   } else {
//     res.status(404).json({ error: "Stock not found" });
//   }
// });

// // Route to get stock price history list for UI graph
// app.get("/api/stocks/:id/history", (req, res) => {
//   const stockId = parseInt(req.params.id);
//   // Dummy implementation, replace with actual logic
//   const stock = stocks.find((stock) => stock.id === stockId);
//   if (stock) {
//     res.json(stock.history);
//   } else {
//     res.status(404).json({ error: "Stock not found" });
//   }
// });

// // Route to add a stock to favourites
// app.post("/api/favorites", [check("stockId").isInt()], (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const stockId = parseInt(req.body.stockId);
//   // Dummy implementation, replace with actual logic
//   const stock = stocks.find((stock) => stock.id === stockId);
//   if (stock) {
//     favoriteStocks.push(stock);
//     res.json({ message: "Stock added to favorites successfully" });
//   } else {
//     res.status(404).json({ error: "Stock not found" });
//   }
// });

// // Route to see favourite stocks
// app.get("/api/favorites", (req, res) => {
//   res.json(favoriteStocks);
// });

// // Route to remove a stock from favourites
// app.delete("/api/favorites/:id", (req, res) => {
//   const stockId = parseInt(req.params.id);
//   // Dummy implementation, replace with actual logic
//   const index = favoriteStocks.findIndex((stock) => stock.id === stockId);
//   if (index !== -1) {
//     favoriteStocks.splice(index, 1);
//     res.json({ message: "Stock removed from favorites successfully" });
//   } else {
//     res.status(404).json({ error: "Stock not found in favorites" });
//   }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal Server Error" });
// });

var stockRouter = require("./Routes/stocks");
var favouriteRouter = require("./Routes/favourite");
app.use("/stocks", stockRouter);
app.use("/favourite", favouriteRouter);
// Start the server
app.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);
  await db.dbconnect();
  await db.query(`
  CREATE TABLE IF NOT EXISTS favourite 
  (ID VARCHAR(100), 
  SC_NAME VARCHAR(255)
  );`);
  console.log("Done...");
});
