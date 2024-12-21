const pool = require("./pool");

async function getAllCategoryNames() {
  const result = await pool.query("SELECT category_name FROM categories");
  return result.rows;
}

async function getCategoryNameAndId() {
  const result = await pool.query("select id, category_name from categories");
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

async function getCategoryDatabase(category) {
  const categoryIndex = await pool.query(
    `select id from categories where category_name = '${category}'`
  );
  //categoryIndex contains an array with a object with property id
  //[{id: X}]
  //to select X we have to access the object from the array then use the id property
  const result = await pool.query(
    `select * from items where category_id = ${categoryIndex.rows[0].id}`
  );
  return result.rows;
}

async function searchItem(item_name) {
  const item = await pool.query(
    `SELECT * FROM items WHERE to_tsvector(item_name) @@ plainto_tsquery('${item_name}');`
  );
  //result will be in the form of an array [{bla bla: bla bla}, {bla:  bla}];
  //display all to the screen
  return item;
}

async function updateItem(
  itemId,
  itemName,
  amount,
  price,
  imageUrl,
  categoryId
) {
  await pool.query(
    "UPDATE items SET item_name = $1, amount = $2, price = $3, image_url = $4, category_id = $5 WHERE id = $6",
    [itemName, amount, price, imageUrl, categoryId, itemId]
  );
}

async function deleteItem(itemId) {
  await pool.query("delete from items where id = $1", [itemId]);
  console.log(`delete from items where id = ${itemId}`);
}

// async function insertUsername(username) {
//   await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
// }

module.exports = {
  getAllCategoryNames,
  getAllImageUrl,
  getAllRows,
  getCategoryDatabase,
  searchItem,
  getCategoryNameAndId,
  updateItem,
  deleteItem,
};
