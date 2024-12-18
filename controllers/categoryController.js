const db = require("../database/query");

const categoryExists = async (category) => {
  const validCategories = await db.getAllCategoryNames();
  for (const keyValuePair of validCategories) {
    if (keyValuePair.category_name === category) {
      return true;
    }
  }
  return false;
};

exports.getAllCategories = async (req, res) => {
  const getCategoryAndUrlPair = await db.getAllRows();
  res.render("allCategories", {
    title: "all categories",
    data: getCategoryAndUrlPair,
  });
};

exports.getCategory = async (req, res) => {
  const { category } = req.params;
  if (await categoryExists(category)) {
    res.render("category", { title: `${category}` });
  } else {
    res.render("error", { title: "Error" });
  }
};
