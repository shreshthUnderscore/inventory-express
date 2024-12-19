const db = require("../database/query");

exports.searchItem = async (req, res) => {
  const { itemName } = req.params;
  const itemData = await db.searchItem(itemName);
  itemDataArray = itemData.rows;
  if (itemDataArray.length !== 0) {
    res.render("searchedItems", { title: itemName, data: itemDataArray });
  } else {
    res.render("error", { title: "searchItem" });
  }
};
