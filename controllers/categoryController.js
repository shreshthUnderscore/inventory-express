const db = require("../database/query");

const categoryExists = async (category) => {
  const validCategories = await db.getAllCategoryNames();
  validCategories.forEach((keyValuePair) => {
    if (keyValuePair.category_name === category) {
      console.log(keyValuePair.category_name);
      return true;
    }
  });
  console.log("false case");
  return false;
};

exports.getAllCategories = async (req, res) => {
  const allCategories = await db.getAllCategoryNames();
  res.render("allCategories", {
    title: "all categories",
    image_url: { allCategories },
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
