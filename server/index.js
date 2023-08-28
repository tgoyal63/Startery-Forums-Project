// Import required modules
const express = require("express");
const config = require("./config/config");
const logger = require("./utils/logger.utils");
const commonMiddlewares = require("./middlewares/common");
const errorHandler = require("./middlewares/error");
const connectDB = require("./utils/db.utils");
const { APIError } = require("./utils/error.utils");
const { CLIENT_ERROR } = require("./config/httpStatusCodes");

// Create an instance of the Express application
const app = express();

// Apply common middlewares to the application
commonMiddlewares(app, logger);

// Define a route handler for the root path
app.get("/", (req, res) => {
  res.send("Welcome to Startery Forums Project - Backend!");
});

// Define a 404 Error
app.all("*", (req, res) => {
  throw new APIError(
    "CLIENT_ERROR",
    CLIENT_ERROR.NOT_FOUND,
    false,
    "Not Found"
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  // Log the unhandled rejection error
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${err.message}`);
  // Close the server and exit the process
  server.close(() => process.exit(1));
});

// Use the error handler middleware
app.use(errorHandler);

// Start the server and listen for incoming requests
connectDB()
  .then(() => {
    const server = app.listen(config.port, () => {
      console.log(
        `Server is running at http://localhost:${config.port}, Environment: ${
          config.isDevEnvironment ? "dev" : "prod"
        }`
      );
    });
  })
  .catch((err) => console.log(err));
