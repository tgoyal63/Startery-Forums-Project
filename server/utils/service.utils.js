const { CLIENT_ERROR } = require("../config/httpStatusCodes");
const { CustomError } = require("./error.utils");
const logger = require("./logger.utils");

class ServiceUtils {
  static serviceBoilerPlate(wrapped) {
    return (...params) =>
      wrapped(...params).catch((err) => {
        if (err.name === "MongoServerError" && err.code === 11000) {
          throw new CustomError(
            "Client Error",
            CLIENT_ERROR.CONFLICT,
            "Duplicate " + Object.keys(err.keyValue)[0],
            true
          );
        } else if (err.name === "CastError") {
          throw new CustomError(
            "Client Error",
            CLIENT_ERROR.FORBIDDEN,
            `Invalid Creation ${err}`,
            true
          );
        } else throw err;
      });
  }
}

module.exports = ServiceUtils;
