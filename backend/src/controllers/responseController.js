const successResponse = (
  res,
  { statusCode = 200, message = "Success", payload = {} }
) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    payload: payload,
  });
};

const errorResponse = (
  res,
  { statusCode = 500, message = "Server error || Somthing is broke " }
) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
