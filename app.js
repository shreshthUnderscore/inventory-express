const express = require("express");
const app = express();
const db = require("./database/query");

db.getAllCategoryNames();
const categoryRouter = require("./routes/categoryRoutes");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", categoryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running port at ${PORT}`);
});
