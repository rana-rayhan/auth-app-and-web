const createError = require("http-errors");
const { successResponse } = require("./responseController");
const User = require("../models/userModel");
const VerifyModel = require("../models/verifyModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../configs/email");
const { isValidObjectId } = require("mongoose");
const TokenModel = require("../models/tokenSchema");
const { sentOtpToUser } = require("../helpers/activationOtpByEmail.js");
//
//
// POST: /api/users -----> create user
const hanldeCreateUser = async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;

    const isExist = await User.findOne({ email });
    if (isExist) throw createError(403, "User is already exist");

    // step 1: creating token
    const newUser = await User.create({ name, email, password, avatar });
    if (!newUser) throw createError(403, "User not created");

    // creating otp and token
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const token = await sentOtpToUser(VerifyModel, newUser._id, otp);

    // prepair email for user activation
    const emailData = {
      email,
      subject: "Account Activation Email",
      message: `<h2> Hello ${newUser.name} ! Your OTP ${otp} !</h2>`,
    };
    // send email with node mailer
    sendEmail(emailData);

    // returning response
    return successResponse(res, {
      statusCode: 201,
      message: "Registered successfully, Please active your account",
      payload: { newUser, token },
    });
  } catch (error) {
    next(error);
  }
};
//
//
//GET: /api/users -----> get users
const handleGetUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    return successResponse(res, {
      statusCode: 202,
      message: "All users are returend",
      payload: users,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// POST: /api/users/login -----> login user
const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isExist = await User.findOne({ email });
    if (!isExist) throw createError(404, "User is not exist");

    const isMatch = await bcrypt.compare(password, isExist.password);
    if (!isMatch) throw createError(403, "Password not match");

    const token = jwt.sign({ isExist }, "abcd", { expiresIn: "1h" });

    // // prepair email for user activation
    // const emailData = {
    //   email,
    //   subject: "Account Activation Email",
    //   message: `
    //         <h2> Hello ${isExist.name} ! </h2>
    //         <p> Please click here to <a href="http://localhost:3000/api/users/activate/${token}" target="_blank" > active your account </a> </p>
    //     `,
    // };

    // // send email with node mailer
    // sendEmail(emailData, res);

    return successResponse(res, {
      statusCode: 200,
      message: "You are logged in",
      payload: isExist,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// POST: /api/users/active-email
const handleActiveEmail = async (req, res, next) => {
  try {
    const { userId, otp } = req.body;
    if (!userId || !otp)
      throw createError(403, "Invalid request, missing parameters");

    if (!isValidObjectId(userId)) throw createError(403, "Invalid user Id");

    const user = await User.findById(userId);
    if (!user) throw createError(403, "Sorry, User not found !");
    if (user.isVerify) throw createError(403, "User is already verified !");

    const verifiedToken = await VerifyModel.findOne({ owner: user._id });
    if (!verifiedToken) throw createError(404, "Sorry user token not found");

    const isMatch = await bcrypt.compare(otp, verifiedToken.token);
    if (!isMatch) throw createError(404, "Sorry user token not match");

    await VerifyModel.findByIdAndDelete(verifiedToken._id);

    // verified user in database
    user.isVerify = true;
    // save user
    const activeUser = await user.save();

    // prepair email for user activation
    const emailData = {
      email: user.email,
      subject: "Your account is verified",
      message: `<h2>Your account is verified !</h2>`,
    };
    // send email with node mailer
    sendEmail(emailData);

    return successResponse(res, {
      statusCode: 200,
      message: "your email activeted successfully",
      payload: activeUser,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// Forget user password || Post request
const handleForgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw createError(404, "User not found, please register first");

    // creating token for user verification
    const token = jwt.sign({ user }, "abcd", { expiresIn: "1h" });

    const createToken = await TokenModel.create({
      owner: user._id,
      token: token,
    });
    if (!createToken) throw createError(403, "User not created");

    // prepair email for user activation
    const emailData = {
      email,
      subject: "Forget Password",
      message: `
          <h2> Hello ${user.name} ! Your token will vaild for 10 minits </h2>
          <p> Please click here to <a href="http://localhost:3000/api/users/reset-password/${token}" target="_blank" > Reset your password </a> </p>
      `,
    };

    // send email with node mailer
    sendEmail(emailData);

    // return users into response controller--**
    return successResponse(res, {
      statusCode: 200,
      message: `Please check your email for reset password !`,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};
//
//
// Reset user password || PUT request
const handleResetPassword = async (req, res, next) => {
  try {
    const user = req.user;
    const { password } = req.body;

    // created option
    const userEmail = { email: user.email };

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) throw createError(403, "You are using same password");
    // updated data
    const updatedData = { password: password };
    const updateOptions = { new: true };

    // find and update a user
    const updatedUser = await User.findOneAndUpdate(
      userEmail,
      updatedData,
      updateOptions
    );
    if (!updatedUser) throw createError(400, "User password reset failed");

    // prepair email for user activation
    const emailData = {
      email: user.email,
      subject: "Successfully Reset Password",
      message: `<h2> Hello ${user.name}, your password is reseted successfully ! </h2>`,
    };
    // send email with node mailer
    sendEmail(emailData);

    await TokenModel.findOneAndDelete(user._id);
    // return users into response controller--**
    return successResponse(res, {
      statusCode: 200,
      message: "User password was Reset seccessfully",
    });
  } catch (error) {
    next(error);
  }
};

const handleReSendOtp = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    // creating otp and token
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const token = await sentOtpToUser(VerifyModel, user._id, otp);

    // prepair email for user activation
    const emailData = {
      email: user.email,
      subject: "Account Activation Email",
      message: `<h2> Hello ${user.name} ! Your OTP ${otp} !</h2>`,
    };
    // send email with node mailer
    sendEmail(emailData);
    return successResponse(res, {
      statusCode: 201,
      message: "New OTP has send to your email",
      payload: token,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// exporting all module
module.exports = {
  hanldeCreateUser,
  handleGetUsers,
  handleLogin,
  handleActiveEmail,
  handleForgetPassword,
  handleResetPassword,
  handleReSendOtp,
};
