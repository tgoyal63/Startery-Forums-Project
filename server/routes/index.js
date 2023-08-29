const express = require("express");
const { ValidationError } = require("express-validation");
const { SERVER_ERROR } = require("../config/httpStatusCodes");
const { APIError } = require("../utils/error.utils");
const logger = require("../utils/logger.utils");

class BaseRouter {
  constructor() {
    this.router = express.Router();
    this.initRoutes();
    this.handleValidationError();
  }

  // This method should be overridden by subclasses
  initRoutes() {}

  handleValidationError() {
    this.router.use((err, req, res, next) => {
      if (err) {
        const { name, details, statusCode } = err;
        if (err instanceof ValidationError) {
          throw new APIError(
            "Validation Error",
            statusCode,
            true,
            `${name}: ${details.body[0].context.message || details.body[0].message}`
          );
        }
        throw err;
      }
      next();
    });
  }
}

module.exports = BaseRouter;
