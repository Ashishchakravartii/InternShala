const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsynErrors } = require("./catchAsynErrors");

exports.isAuthenticated = catchAsynErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login First to access resource", 401));
  }

  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  req.id= id;
  next();
});
