const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const auth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ error: "No token, authorization denied." });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.userId).select("-password");
    next();
  } catch (err) {
    res.status(400).json({ error: "Token is not valid." });
  }
};

module.exports = auth;
