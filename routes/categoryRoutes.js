const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:category", categoryController.getCategory);
categoryRouter.get("/search?query=:itemName", categoryController.searchItem);

module.exports = categoryRouter;
