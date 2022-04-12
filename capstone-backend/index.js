const express = require("express");
const app = express();
const PORT = 4000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send(`Pavo backend `);
});

app.listen(PORT, () => {
  console.log(`Sever is running on${PORT}`);
});
