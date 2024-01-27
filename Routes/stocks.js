const express = require("express");
const router = express.Router();

//Required Controller modules
const stockController = require("../ControllersAPI/stockController");
//
router.get("/Top10", stockController.getTop10);
router.get("/stockname/:name", stockController.getStockByName);
router.get("/stockhistory/:name", stockController.getStockPriceHistory);
module.exports = router;
