const { Router } = require("express");
const searchController = require("../controllers/searchController.js");
const searchRouter = Router();

searchRouter.get("/", searchController.searchItem);
module.exports = searchRouter;
