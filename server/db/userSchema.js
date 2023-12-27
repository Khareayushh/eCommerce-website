const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", UserSchema);
