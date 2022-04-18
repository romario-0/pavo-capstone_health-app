const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
require("./db/conn");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", require("./routes/user.route"));

app.get("/", (req, res) => {
  res.send(`Pavo backend `);
});

app.listen(PORT, () => {
  console.log(`Sever is running on Port ${PORT}`);
});
