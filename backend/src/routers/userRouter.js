const {
  hanldeCreateUser,
  handleGetUsers,
  handleLogin,
  handleActiveEmail,
  handleForgetPassword,
  handleResetPassword,
  handleReSendOtp,
} = require("../controllers/userController");
const { isValidResetToken } = require("../middlewares/isValidResetToken");
const { runValidation } = require("../validators");
const { validateUser } = require("../validators/validation");
const userRouter = require("express").Router();
//
//
// POST: /api/users
userRouter.post("/", validateUser, runValidation, hanldeCreateUser);
// GET: /api/users/
userRouter.get("/", handleGetUsers);
// POST: /api/users/login
userRouter.post("/login", handleLogin);
// POST: /api/users/active
userRouter.post("/active", handleActiveEmail);
// POST: /api/users/resend-otp
userRouter.post("/resend-otp", handleReSendOtp);
// POST: /api/users/forget-passowrd
userRouter.post("/forget-password", handleForgetPassword);
// POST: /api/users/reset-passowrd
userRouter.post("/reset-password", isValidResetToken, handleResetPassword);
// POST: /api/users/verify-token
userRouter.post("/verify-token", isValidResetToken, (req, res, next) => {
  res.json({ success: true });
});
//
//
// exporting all module
module.exports = userRouter;
