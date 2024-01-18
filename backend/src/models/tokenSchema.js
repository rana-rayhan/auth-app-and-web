const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const tokenSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
    // set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

const TokenModel = mongoose.model("UserToken", tokenSchema);

module.exports = TokenModel;
