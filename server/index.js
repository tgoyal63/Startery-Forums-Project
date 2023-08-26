// Import required modules
const express = require("express");
const config = require("./config/config");
const logger = require("./utils/logger");
const commonMiddlewares = require("./middlewares/common");
const errorHandler = require("./middlewares/error");
const connectDB = require("./utils/db.utils");

// Create an instance of the Express application
const app = express();

// Apply common middlewares to the application
commonMiddlewares(app, logger);

// Define a route handler for the root path
app.get("/", (req, res) => {
  res.send("Welcome to Startery Forums Project - Backend!");
});

// Use the error handler middleware
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  // Log the unhandled rejection error
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${err.message}`);
  // Close the server and exit the process
  server.close(() => process.exit(1));
});

// Start the server and listen for incoming requests
connectDB()
  .then(() => {
    const server = app.listen(config.port, () => {
      console.log(
        `Server is running at http://localhost:${config.port} in ${config.env} mode`
      );
    });
  })
  .catch((err) => console.log(err));
