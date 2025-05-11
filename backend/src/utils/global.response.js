const sendSuccess = (res, data, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendError = (res, error, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong",
  });
};

module.exports = {
  sendSuccess,
  sendError,
};
