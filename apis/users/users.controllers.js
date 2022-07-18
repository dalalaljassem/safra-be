const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { user } = req;
    const payload = {
      id: user.id,
      username: user.username,
      image: user.image,
      groups: user.groups,
      budget: user.budget,
      departDate: user.departDate,
      returnDate: user.returnDate,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(payload, JWT_SECRET);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    image: user.image,
    groups: user.groups,
    budget: user.budget,
    departDate: user.departDate,
    returnDate: user.returnDate,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("groups", [
      "title",
      "image",
      "_id",
    ]);
    // const users = await User.find();

    res.status(201).json(users);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.fetchUser = async (userId, next) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    next(err);
  }
};

exports.userUpdate = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }
    const { userId } = req.params;
    await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    }); //if it breaks remove new:true..
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
