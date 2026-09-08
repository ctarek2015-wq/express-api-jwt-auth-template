const User = require("../models/User");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    //verify if the user name exists
    //if the uer exists , send err msg
    const userExists = await User.findOne({ username: req.body.username });
    if (userExists) {
      return res.status(409).json("username or password is incorrect");
    }

    //encrypt the pw

    const hashed = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
    req.body.password = hashed;

    // if yes, create new user, redirect home page
    const createUser = await User.create(req.body);

    const token = jwt.sign(
      { username: createUser.username, _id: createUser._id },
      process.env.JWT_SECRET,
    );
    res.status(201).json({
      user: createUser,
      token,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message || "errooooooorrrrrrrrr");
  }
};

module.exports = { signup };
