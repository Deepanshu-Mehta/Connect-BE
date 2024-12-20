const jwt = require('jsonwebtoken');
const User = require('../models/users.models');

const AuthVerify = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // console.log(req.cookies);
    if (!token) {
      return res.status(401).send("Please login to access this resource."+ req);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decoded;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).send("User not found. Please login again.");
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).send("Session expired. Please login again.");
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).send("Invalid token. Please login again.");
    }
    res.status(500).send("Internal server error: " + err.message);
  }
};

module.exports = AuthVerify;
