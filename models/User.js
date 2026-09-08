const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.set("toJSON", {
  transform: (doc, useOBJ) => {
    delete useOBJ.password;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
