// Import required modules
const mongoose = require("mongoose");
const config = require("./config");
const logger = require("../utils/logger");

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
    logger.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
