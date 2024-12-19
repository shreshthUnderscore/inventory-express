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
    const categoryDatabase = await db.getCategoryDatabase(category);
    res.render("category", { title: `${category}`, data: categoryDatabase });
  } else {
    res.render("error", { title: "Error" });
  }
};

exports.searchItem = async (req, res) => {
  console.log("search came here");
  const { itemName } = req.params;
  const itemData = await db.searchItem(itemName);
  if (itemData.length() !== 0) {
    res.render("searchItems", { title: itemName, data: itemData.rows });
  } else {
    res.render("error", { title: "error" });
  }
};
