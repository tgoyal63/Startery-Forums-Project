require("dotenv").config();

// Configuration object
module.exports = {
  // Port number for the application
  port: parseInt(process.env.APP_PORT, 10) || 3000,

  // Environment mode (development, production, etc.)
  env: process.env.NODE_ENV || "development",

  // Directory for log files
  logDirectory: process.env.LOG_DIRECTORY || "./log",

  // Window duration for rate limiting in milliseconds (15 minutes)
  rateLimitWindowMs: 15 * 60 * 1000,

  // Maximum number of requests allowed per IP within the rate limit window
  rateLimitMax: 100,

  // MongoDB connection URI
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/startery_forum",
};
