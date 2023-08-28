// Import required modules
const mongoose = require("mongoose");
const config = require("../config/config");
const logger = require("../utils/logger.utils");

/**
 * Connects to the MongoDB database using the provided URI.
 * @async
 * @throws {Error} If there is an error connecting to the database.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info("MongoDB connected...");
  } catch (err) {
    logger.error(`MongoDB connection error: ${err.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
