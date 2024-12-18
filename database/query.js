const pool = require("./pool");

async function getAllCategoryNames() {
  const result = await pool.query("SELECT category_name FROM categories");
  return result.rows;
}

async function getAllImageUrl() {
  const result = await pool.query("SELECT image_url FROM categories");
  return result.rows;
}

async function getAllRows() {
  const result = await pool.query("select * from categories");
  return result.rows;
}

// async function insertUsername(username) {
//   await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
// }

module.exports = {
  getAllCategoryNames,
  getAllImageUrl,
  getAllRows,
  //   insertUsername,
};
