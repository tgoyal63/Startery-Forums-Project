// Importing Node Modules
const jwt = require("jsonwebtoken");
const { APIError } = require("../utils/error.utils.js");
const { jwtSecret } = require("../config/config");

// Importing File Dependencies
const userService = require("../services/user.service.js");

module.exports = async (req, res, next) => {
  try {
    // Checking if authorization header is provided
    if (!(req.headers && req.headers.authorization))
      throw new APIError(403, "Access denied! No token provided.");
    const token = req.headers.authorization.split(" ")[1];

    // Checking if token is provided
    if (!token) throw new Error(403, "Access denied! No token provided.");
    const decodedJWT = await jwt.verify(token, secret);

    // Checking if the user is valid
    if (!decodedJWT) throw new Error(401, "Unauthorized!");
    const data = await userService.searchByEntity("_id", decodedJWT.id);
    if (data && token === data.token) {
      req.user = data;
      req.id = data._id;
      next();
    } else {
      throw new Error(401, "Invalid User token!");
    }
  } catch (err) {
    if (!err.status)
      return res
        .status(401)
        .send({ status: 401, message: "Invalid User Token" });
    return res
      .status(err.status)
      .send({ status: err.status, message: err.message });
  }
};
