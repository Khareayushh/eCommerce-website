const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", UserSchema);
