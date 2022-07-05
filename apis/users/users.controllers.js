const bcrypt = require("bcrypt");
const User = require("../../db/models/Users");
const jwt = require("jsonwebtoken");
const { jwtExp, jwtSecret } = require("../../key");

exports.signup = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 5);
    req.body.password = hashPassword;
    const newUser = await User.create(req.body);
    const payload = {
      _id: newUser._id,
      username: newUser.username,
      exp: Date.now() + jwtExp,
    };
    const token = jwt.sign(payload, jwtSecret);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const payload = {
      _id: req.user._id,
      username: req.user.username,
      exp: Date.now() + jwtExp,
    };
    const token = jwt.sign(payload, jwtSecret);
    res.status(201).json(token);
  } catch (err) {
    next(err);
  }
};
