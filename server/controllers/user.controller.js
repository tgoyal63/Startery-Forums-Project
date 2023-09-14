const userService = require("../services/user.service");
const {
  controllerBoilerPlate,
  controllerResponse,
} = require("../utils/controller.utils");
const { SUCCESSFUL, CLIENT_ERROR } = require("../config/httpStatusCodes");
const { CustomError } = require("../utils/error.utils");
const {
  hashPassword,
  checkPassword,
  signToken,
} = require("../utils/auth.utils");
const categoryService = require("../services/category.service");

class UserController {
  profile = controllerBoilerPlate(async (req, res) => {
    const data = await userService.searchByEntity("_id", req.user._id);
    return controllerResponse(SUCCESSFUL.OK, "User Profile Data", data);
  });

  updateProfile = controllerBoilerPlate(async (req, res) => {
    if (Object.keys(req.body).length === 0)
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.BAD_REQUEST,
        "No data to update"
      );
    if (req.body.password) req.body.password = hashPassword(req.body.password);
    const data = await userService.updateById(req.user._id, req.body);
    return controllerResponse(SUCCESSFUL.OK, "User Profile Updated", data);
  });

  deleteProfile = controllerBoilerPlate(async (req, res) => {
    const data = await userService.deleteById(req.user._id);
    await categoryService.removeSubscriberFromAll(req.user._id);
    return controllerResponse(SUCCESSFUL.OK, "User Profile Deleted", data);
  });

  getUserByUsername = controllerBoilerPlate(async (req, res) => {
    const data = await userService.searchByEntity(
      "username",
      req.params.username
    );
    return controllerResponse(SUCCESSFUL.OK, "User Profile Data", data);
  });

  updatePassword = controllerBoilerPlate(async (req, res) => {
    if (!checkPassword(req.body.oldPassword, req.user.password))
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.FORBIDDEN,
        "Invalid Password"
      );
    if (req.body.oldPassword === req.body.newPassword)
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.BAD_REQUEST,
        "New Password cannot be same as Old Password"
      );
    const password = hashPassword(req.body.newPassword);
    const token = signToken(req.user._id);
    const data = await userService.updateById(req.user._id, {
      password,
      token,
    });
    return controllerResponse(SUCCESSFUL.OK, "Password Updated", data);
  });

  subscribe = controllerBoilerPlate(async (req, res) => {
    const category = await categoryService.search(
      {
        name: req.body.categoryName.toLowerCase(),
      },
      1
    );
    if (category?.length === 0)
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.NOT_FOUND,
        "Category Not Found"
      );
    if (req.user.subscriptions.includes(category[0]._id))
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.BAD_REQUEST,
        "Already Subscribed"
      );
    const data = await userService.addSubscription(
      req.user._id,
      category[0]._id
    );
    const categoryData = await categoryService.appendSubscriberById(
      category[0]._id,
      req.user._id
    );
    return controllerResponse(SUCCESSFUL.OK, "Subscription Added", data);
  });

  unsubscribe = controllerBoilerPlate(async (req, res) => {
    const category = await categoryService.search(
      {
        name: req.body.categoryName.toLowerCase(),
      },
      1
    );
    if (category?.length === 0)
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.NOT_FOUND,
        "Category Not Found"
      );
    if (!req.user.subscriptions.includes(category[0]._id))
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.BAD_REQUEST,
        "Not Subscribed"
      );
    const data = await userService.removeSubscription(
      req.user._id,
      category[0]._id
    );
    const categoryData = await categoryService.removeSubscriberById(
      category[0]._id,
      req.user._id
    );
    return controllerResponse(SUCCESSFUL.OK, "Subscription Removed", data);
  });

  getSubscriptions = controllerBoilerPlate(async (req, res) => {
    const data = await userService.getSubscriptions(req.user._id);
    const subscriptions = data.subscriptions.map(
      (subscription) => subscription.name
    );
    return controllerResponse(SUCCESSFUL.OK, "Subscriptions", {
      subscriptions,
    });
  });
}

module.exports = new UserController();
