// Import required modules
const express = require("express");
const config = require("./config/config");
const logger = require("./utils/logger.utils");
const commonMiddlewares = require("./middlewares/common");
const errorHandler = require("./middlewares/error");
const connectDB = require("./utils/db.utils");
const { CustomError } = require("./utils/error.utils");
const { CLIENT_ERROR } = require("./config/httpStatusCodes");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");
const categoryRouter = require("./routes/category.routes");

// Create an instance of the Express application
const app = express();

// Apply common middlewares to the application
commonMiddlewares(app, logger);

// Define a route handler for the root path
app.get("/", (req, res) => {
  res.send("Welcome to Startery Forums Project - Backend!");
});

// Defining Routers
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/posts", postRouter)
app.use("/category", categoryRouter);

// Define a 404 Error
app.all("*", (req, res, next) => {
  throw new CustomError("Client Error", CLIENT_ERROR.NOT_FOUND, "Not Found");
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  if (!errorHandler.isTrustedError(err)) {
    process.exit(1);
  }
  await errorHandler.handleError(err);
});

// Use the error handler middleware
app.use(async (err, req, res, next) => {
  if (!errorHandler.isTrustedError(err)) {
    next(err);
  }
  await errorHandler.handleError(err, req, res, next);
});

// Start the server and listen for incoming requests
connectDB()
  .then(() => {
    const server = app.listen(config.port, () => {
      logger.info(
        `Server is running at http://localhost:${config.port}, Environment: ${
          config.isDevEnvironment ? "dev" : "prod"
        }`
      );
    });
  })
  .catch((err) => {
    throw err;
  });
