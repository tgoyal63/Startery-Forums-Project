// Import required modules
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const compression = require('compression');
const config = require('../config/config');

/**
 * Initializes the Express app with various middleware and configuration settings.
 *
 * @param {Object} app - The Express app object.
 * @param {Object} logger - The logger object.
 */
module.exports = (app, logger) => {
    
    // Middleware to parse incoming JSON payloads
    app.use(express.json());
    
    // Middleware to parse incoming requests with urlencoded payloads
    app.use(express.urlencoded({ extended: true }));
    
    // Use Helmet to secure your Express app by setting various HTTP headers
    app.use(helmet());
    
    // Use CORS to allow cross origin requests
    app.use(cors());
    
    // Use rate limiter to control the number of requests
    const limiter = rateLimit({
        windowMs: config.rateLimitWindowMs,
        max: config.rateLimitMax // limit each IP to rateLimitMax requests per windowMs
    });
    app.use(limiter);

    // Use compression to increase the speed of a web app
    app.use(compression());

    // Use Morgan for logging HTTP requests
    app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
    
    // Log request details
    app.use((req, res, next) => {
        logger.info(`Method: ${req.method}, URL: ${req.url}, Status: ${res.statusCode}, Body: ${JSON.stringify(req.body)}, Headers: ${JSON.stringify(req.headers)}`);
        next();
    });
};