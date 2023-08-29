const userService = require("../services/user.service");
const {
  controllerBoilerPlate,
  controllerResponse,
} = require("../utils/controller.utils");
const { SUCCESSFUL } = require("../config/httpStatusCodes");

class UserController {
  profile = controllerBoilerPlate(async (req, res) => {
    const data = await userService.searchByEntity("_id", req.user._id);
    return controllerResponse(SUCCESSFUL.OK, "User Profile Data", data);
  });
}

module.exports = new UserController();
