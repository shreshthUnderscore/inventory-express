const db = require("../database/query");

const categoryExists = async (category) => {
  const validCategories = await db.getAllCategoriesDB();
  return validCategories.includes(category);
};

exports.getAllCategories = async (req, res) => {
  const allCategories = await db.getAllCategoriesDB();
  res.render("allCategories", {
    title: "all categories",
    image_url: {db.getAllImageUrl()}. 
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
