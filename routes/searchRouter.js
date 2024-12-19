const { Router } = require("express");
const searchController = require("../controllers/searchController");
const searchRouter = Router();

searchRouter.get("/:itemName", searchController.searchItem);

module.exports = searchRouter;
