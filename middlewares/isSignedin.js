const jwt = require("jsonwebtoken");

const isSignedin = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) throw new Error("You must be signed in");

    const token = bearerToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

module.exports = isSignedin;
