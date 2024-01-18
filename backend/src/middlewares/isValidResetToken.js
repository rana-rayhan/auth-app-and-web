const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const TokenModel = require("../models/tokenSchema");

const isValidResetToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) throw createError(400, "Token not found");
    const decoded = jwt.verify(token, "abcd");
    if (!decoded)
      throw createError(400, "Invalid access token, please login again");
    const getToken = await TokenModel.findOne({ owner: decoded.user._id });
    if (!getToken || getToken == "null")
      throw createError(400, "Token is already used !");

    req.user = decoded.user;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  isValidResetToken,
};
