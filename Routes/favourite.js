const express = require("express");
const router = express.Router();

//Required Controller modules
const favouriteController = require("../ControllersAPI/favouriteController");
//
router.post("/add", favouriteController.postAddStockFavourite);
router.get("/getfavourite/:id", favouriteController.getFavouriteStocks);
router.delete("/delete", favouriteController.deleteFavouriteStock);
module.exports = router;
