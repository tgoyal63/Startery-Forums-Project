// Import required modules
const winston = require("winston");
const fs = require("fs");
const path = require("path");
const { isDevEnvironment, logDirectory } = require("../config/config");

// Create log directory if it doesn't exist
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Setup winston logger
const logger = winston.createLogger({
  level: isDevEnvironment ? "debug" : "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.join(logDirectory, "/error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, "/combined.log"),
    }),
  ],
});

// If we're not in production, log to the `console` with the format: `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (isDevEnvironment) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// Export the logger instance
module.exports = logger;
