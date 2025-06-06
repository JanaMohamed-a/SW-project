const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey = process.env.mytenomk;

module.exports = function authenticationMiddleware(req, res, next) {
  const cookie = req.cookies;
  console.log('inside auth middleware');

  if (!cookie) {
    return res.status(401).json({ message: "No Cookie provided" });
  }
  const token = cookie.token;
  if (!token) {
    return res.status(405).json({ message: "No token provided" });
  }

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      console.log("JWT error:", error);
      return res.status(403).json({ message: "Invalid token" });
    }
    console.log("Decoded token:", decoded);
    req.user = decoded.user;
    next();
  });
}; 