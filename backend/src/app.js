const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const userRouter = require("./routers/userRouter");
const { errorResponse } = require("./controllers/responseController");

const app = express("");
//
//
// Using middlaware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//
//
// Using all routers
app.use("/api/users", userRouter);
//
//
// Handling client errors
app.use((req, res, next) => {
  next(createError(404, "route not found"));
});
//
//
// Handling all error
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.statusCode,
    message: err,
  });
});
//
//
// export app
module.exports = app;
