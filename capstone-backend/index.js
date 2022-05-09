const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
require("./db/conn");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "img")));

app.use("/user", require("./routes/user.route"));
app.use("/goal", require("./routes/goal.route"));
app.use("/activity", require("./routes/activity.route"));
app.use("/food", require("./routes/food.route"));
app.use("/meal", require("./routes/meal.route"));
app.use("/dailycalorie", require("./routes/dailyCalorie.route"));

app.get("/", (req, res) => {
  res.send(`Pavo backend `);
});

app.listen(PORT, () => {
  console.log(`Sever is running on Port ${PORT}`);
});
