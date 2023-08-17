require("dotenv").config();

module.exports = {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    env: process.env.NODE_ENV || 'development',
    logDirectory: process.env.LOG_DIRECTORY || './log',
    rateLimitWindowMs: 15 * 60 * 1000, // 15 minutes
    rateLimitMax: 100 // limit each IP to 100 requests per windowMs
};