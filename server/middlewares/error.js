// Importing required modules
const { isDevEnvironment } = require("../config/config");
const { CLIENT_ERROR, SERVER_ERROR } = require("../config/httpStatusCodes");
const { BaseError, APIError } = require("../utils/error.utils");
const logger = require("../utils/logger.utils");

class ErrorHandler {
  async handleError(err, req, res, next) {
    let {
      statusCode = SERVER_ERROR.INTERNAL_SERVER_ERROR,
      message = "An unexpected error occured!",
      stack,
    } = err;

    if (err.code === 11000) {
      statusCode = CLIENT_ERROR.CONFLICT;
      message = `${Object.values(err.keyValue)} already exists!` + err.keyValue;
    }

    // Set the response status code and send the error message as JSON
    res.status(statusCode).send({
      statusCode,
      message,
      ...(isDevEnvironment && { stack }), // Include the error stack trace in the response in development mode
    });

    // Log the error details
    await logger.error(
      `Status: ${statusCode}, Message: ${message}, Stack: ${err.stack}`
    );

    await this.sendMailToAdminIfCritical();
    await this.sendEventsToSentry();
  }

  async sendMailToAdminIfCritical() {
    // Implement the logic to send mail to admin if the error is critical
  }

  async sendEventsToSentry() {
    // Implement the logic to send error events to Sentry
  }

  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

module.exports = new ErrorHandler();
