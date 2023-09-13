const userService = require("../services/user.service");
const {
  controllerBoilerPlate,
  controllerResponse,
} = require("../utils/controller.utils");
const {
  signToken,
  validateUser,
  hashPassword,
} = require("../utils/auth.utils");
const { SUCCESSFUL } = require("../config/httpStatusCodes");

class AuthController {
  register = controllerBoilerPlate(async (req, res) => {
    // Convert username and email to lowercase
    req.body.username = req.body.username.toLowerCase();
    req.body.email = req.body.email.toLowerCase();
    // Hashing password for securely storing in database
    req.body.password = hashPassword(req.body.password);
    // Creating User
    let data = await userService.create(req.body);
    // Creating JWT Token for user
    const token = signToken(data._id);
    // Updating token in database
    data = await userService.updateById(data._id, { token });
    // Returning response
    return controllerResponse(
      SUCCESSFUL.CREATED,
      "User Registered Successfully!",
      { token }
    );
  });

  login = controllerBoilerPlate(async (req, res) => {
    const { token } = await validateUser(req.body);
    return controllerResponse(SUCCESSFUL.OK, "Logged In Successfully!", {
      token,
    });
  });
}

module.exports = new AuthController();
