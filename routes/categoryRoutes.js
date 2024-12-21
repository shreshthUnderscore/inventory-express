const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.post("/update-item", categoryController.postUpdatedItems);
categoryRouter.post("/delete-item", categoryController.postDeleteItem);
categoryRouter.get("/:category", categoryController.getCategory);

module.exports = categoryRouter;
