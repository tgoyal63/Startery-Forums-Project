// Importing required modules
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../services/user.service.js");
const { jwtSecret } = require("../config/config");
const { CustomError } = require("./error.utils.js");
const { CLIENT_ERROR } = require("../config/httpStatusCodes.js");

/**
 * Function to check if entity exists in database
 * @param {String} entity - Entity to check
 * @param {String} entityValue - Value of the entity
 * @returns {Object} data - Data from database
 */
const checkExist = async (entity, entityValue) => {
  const data = await userService.searchByEntity(entity, entityValue, 1);
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

const checkUser = async (data) => {
  let user;
  if (data.hasOwnProperty("username"))
    user = await checkExist("username", data.username.toLowerCase());
  else if (data.hasOwnProperty("email"))
    user = await checkExist("email", data.email.toLowerCase());
  if (!user)
    throw new CustomError(
      "Client Error",
      CLIENT_ERROR.NOT_FOUND,
      "User not found!"
    );
  return user;
}

/**
 * Function to validate user data
 * @param {Object} data - User data
 * @returns {Object} user - User data from database
 * @throws {CustomError} If user not found or password is invalid
 */
const validateUser = async (data) => {
  const user = await checkUser(data);
  // Checking if password is valid or not
  const isPasswordValid = checkPassword(data.password, user.password);
  if (!isPasswordValid)
    throw new CustomError(
      "Client Error",
      CLIENT_ERROR.UNAUTHORIZED,
      "Invalid Password!"
    );
  return user;
};

const generateRandomPassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?';
  let password = '';
  for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Exporting functions
module.exports = {
  validateUser,
  checkExist,
  signToken,
  hashPassword,
  checkPassword,
  checkUser,
  generateRandomPassword
};
