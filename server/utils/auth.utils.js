// Importing required modules
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../services/user.service.js");
const { jwtSecret } = require("../config/config");
const { APIError } = require("./error.utils.js");
const { CLIENT_ERROR } = require("../config/httpStatusCodes.js");

/**
 * Function to check if entity exists in database
 * @param {String} entity - Entity to check
 * @param {String} entityValue - Value of the entity
 * @returns {Object} data - Data from database
 */
const checkExist = async (entity, entityValue) => {
  const data = await userService.searchByEntity(entity, entityValue);
  return data;
};

/**
 * Function to sign token
 * @param {String} id - User id
 * @returns {String} token - Signed token
 */
const signToken = (id) => {
  const token = jwt.sign({ id }, jwtSecret, {
    expiresIn: "9999 years",
  });
  return token;
};

/**
 * Function to check if password is valid
 * @param {String} password - User password
 * @param {String} hash - Hashed password
 * @returns {Boolean} isPasswordValid - True if password is valid, false otherwise
 */
const checkPassword = (password, hash) => {
  const isPasswordValid = bcryptjs.compareSync(password, hash);
  return isPasswordValid;
};

/**
 * Function to hash password
 * @param {String} password - User password
 * @returns {String} hash - Hashed password
 */
const hashPassword = (password) => {
  const hash = bcryptjs.hashSync(password, 10);
  return hash;
};

/**
 * Function to validate user data
 * @param {Object} data - User data
 * @returns {Object} res - User data from database
 * @throws {APIError} If user not found or password is invalid
 */
const validateUser = async (data) => {
  let res;
  // Checking if user exists in database
  if (data.hasOwnProperty("username"))
    res = await checkExist("username", data.username);
  else if (data.hasOwnProperty("email"))
    res = await checkExist("email", data.email);
  if (!res)
    throw new APIError(
      "Client Error",
      CLIENT_ERROR.NOT_FOUND,
      true,
      "User not found!"
    );

  // Checking if password is valid or not
  const isPasswordValid = checkPassword(data.password, res.password);
  if (!isPasswordValid) throw new APIError(401, "Invalid Password!");
  return res;
};

// Exporting functions
module.exports = {
  validateUser,
  checkExist,
  signToken,
  hashPassword,
  checkPassword,
};
