const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config("../.env");

const getUserId = (headerToken) => {
  try {
    let token = headerToken;
    token = token.split("Bearer ")[1];
    let decoded = jwt.decode(token);
    return decoded.id;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getUserId };
