const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config("../.env");

// for autorization
const authorization = (req, res, next) => {
  let token = req.headers.authorization;
  if (token === undefined) {
    res.json({ message: "Please login again Token is Expired" });
    return;
  } else {
    //in frontend we dont use bearer keyword
    //  token = token.split("Bearer ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, playload) => {
      if (err) {
        return res.status(403).json({ message: "User is not authenticated." });
      } else {
        req.user = playload;
        next();
      }
    });
  }
};

module.exports = { authorization };
