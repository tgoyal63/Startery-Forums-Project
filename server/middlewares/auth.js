// Importing Required Modules
const jwt = require("jsonwebtoken");
const { CustomError } = require("../utils/error.utils.js");
const { jwtSecret } = require("../config/config");
const { checkExist } = require("../utils/auth.utils.js");
const { CLIENT_ERROR } = require("../config/httpStatusCodes.js");
const post = require("../models/post.model");
const comment = require("../models/comment.model");
const user = require("../models/user.model");

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
          message: err.message,
        });
      return res
        .status(err.status)
        .send({ statusCode: err.status, message: err.message });
    }
  }

  static verifyPermission(docType) {
    return async (req, res, next) => {
      try {
        // Determine the type of resource being accessed.
        let model;
        switch (docType) {
          case "Post":
            model = post;
            break;
          case "Comment":
            model = comment;
            break;
          case "User":
            model = user;
            break;
          default:
            throw new CustomError("Client Error", CLIENT_ERROR.BAD_REQUEST, "Invalid resource type");
        }
        const data = await model.findById(req.params.id || req.id);
        if (!data)
          throw new CustomError(
            "Client Error",
            CLIENT_ERROR.NOT_FOUND,
            `${docType} Not Found`
          );
        if (
          (docType === "user" &&
            data._id.toString() !== req.user._id.toString()) ||
          (data.author && data.author?.toString() !== req.user._id.toString())
        )
          throw new CustomError(
            "Client Error",
            CLIENT_ERROR.FORBIDDEN,
            "Not Authorized"
          );
        next();
      } catch (err) {
        if (!err.status)
          return res.status(CLIENT_ERROR.UNAUTHORIZED).send({
            statusCode: CLIENT_ERROR.UNAUTHORIZED,
            message: err.message,
          });
        return res
          .status(err.status)
          .send({ statusCode: err.status, message: err.message });
      }
    };
  }
}

module.exports = AuthMiddleware;
