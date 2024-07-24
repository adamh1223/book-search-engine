const User = require("../models/User");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = signToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(400).json(err);
  }
};

// Get a single user
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Save a book to a user's profile
const saveBook = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { savedBooks: req.body } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Delete a book from a user's profile
const deleteBook = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { savedBooks: { bookId: req.params.bookId } } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Login a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No user found with this email" });
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = signToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
};
