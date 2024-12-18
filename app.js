const express = require("express");
const path = require("path");
const app = express();
const db = require("./database/query");

db.getAllCategoryNames();
const categoryRouter = require("./routes/categoryRoutes");

app.set("view engine", "ejs");
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.urlencoded({ extended: true }));
app.use("/", categoryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running port at ${PORT}`);
});
