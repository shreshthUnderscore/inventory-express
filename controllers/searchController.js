const db = require("../database/query");

exports.searchItem = async (req, res) => {
  try {
    const searchQuery = req.query.query;

    if (!searchQuery) {
      return res.render("error", {
        title: "Search Error",
        message: "No search query provided",
      });
    }

    const itemData = await db.searchItem(searchQuery);
    console.log("Search Results:", itemData.rows); // Debug log

    if (itemData.rows && itemData.rows.length > 0) {
      return res.render("searchedItems", {
        title: `Search: ${searchQuery}`,
        data: itemData.rows,
      });
    }

    return res.render("error", {
      title: "No Results",
      message: `No items found for: ${searchQuery}`,
    });
  } catch (error) {
    console.error("Search Error:", error);
    return res.render("error", {
      title: "Search Error",
      message: "An error occurred while searching",
    });
  }
};
