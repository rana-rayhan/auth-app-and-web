const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const verifySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
    set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

const VerifyModel = mongoose.model("Verified", verifySchema);

module.exports = VerifyModel;
