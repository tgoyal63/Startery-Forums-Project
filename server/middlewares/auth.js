// Importing Node Modules
const jwt = require("jsonwebtoken");
const { CustomError } = require("../utils/error.utils.js");
const { jwtSecret } = require("../config/config");

// Importing File Dependencies
const { checkExist } = require("../utils/auth.utils.js");
const { CLIENT_ERROR } = require("../config/httpStatusCodes.js");

class AuthMiddleware {
  static async verifyToken(req, res, next) {
    try {
      // Checking if authorization header is provided
      if (!(req.headers && req.headers.authorization))
        throw new CustomError(
          "Auth Error",
          CLIENT_ERROR.FORBIDDEN,
          "Access denied! No token provided."
        );
      const token = req.headers.authorization.split(" ")[1];

      // Checking if token is provided
      if (!token)
        throw new CustomError(
          "Auth Error",
          CLIENT_ERROR.FORBIDDEN,
          "Access denied! No token provided."
        );
      const decodedJWT = await jwt.verify(token, jwtSecret);

      // Checking if the user is valid
      if (!decodedJWT)
        throw new CustomError(
          "Auth Error",
          CLIENT_ERROR.UNAUTHORIZED,
          "Unauthorized!"
        );
      const data = await checkExist("_id", decodedJWT.id);
      if (data && token === data.token) {
        req.user = data;
        req.id = data._id;
        next();
      } else {
        throw new CustomError(
          "Auth Error",
          CLIENT_ERROR.UNAUTHORIZED,
          "Access denied! Invalid User token."
        );
      }
    } catch (err) {
      if (err.name === "JsonWebTokenError" || !err.status)
        return res.status(CLIENT_ERROR.UNAUTHORIZED).send({
          statusCode: CLIENT_ERROR.UNAUTHORIZED,
          message: "Access denied! Invalid User Token.",
        });
      return res
        .status(err.status)
        .send({ statusCode: err.status, message: err.message });
    }
  }
}

module.exports = AuthMiddleware;
