// Import required modules
const winston = require("winston");
const fs = require("fs");
const path = require("path");
const config = require("../config/config");

// Create log directory if it doesn't exist
fs.existsSync(config.logDirectory) || fs.mkdirSync(config.logDirectory);

// Setup winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: path.join(config.logDirectory, "/error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(config.logDirectory, "/combined.log"),
    }),
  ],
});

// If we're not in production, log to the `console` with the format: `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (config.env !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// Export the logger instance
module.exports = logger;
