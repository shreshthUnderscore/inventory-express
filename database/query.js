const pool = require("./pool");

async function getAllCategoryNames() {
  const { categoryNames } = await pool.query(
    "SELECT category_name FROM categories"
  );
  return categoryNames;
}

async function getAllImageUrl() {
  const { imageUrl } = await pool.query("select image_url from categories");
  return imageUrl;
}

// async function insertUsername(username) {
//   await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
// }

module.exports = {
  getAllCategoriesDB,
  //   insertUsername,
};
