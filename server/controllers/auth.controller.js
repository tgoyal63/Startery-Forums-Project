const userService = require("../services/user.service");
const {
  controllerBoilerPlate,
  controllerResponse,
} = require("../utils/controller.utils");
const {
  signToken,
  validateUser,
  hashPassword,
  checkUser,
  generateRandomPassword,
} = require("../utils/auth.utils");
const { SUCCESSFUL } = require("../config/httpStatusCodes");
const { sendMail } = require("../utils/mail.utils");

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

  forgotPassword = controllerBoilerPlate(async (req, res) => {
    const user = await checkUser(req.body);
    const newPassword = generateRandomPassword();
    const password = hashPassword(newPassword);
    const token = signToken(user._id);
    const { email, name } = await userService.updateById(user._id, {
      password,
      token,
    });
    const subject = "Startery Team | Reset Password";
    const content = `Your new password is <b>${newPassword}</b><br>Use this password for logging in.`;
    const mailData = sendMail({ email, name, subject, content });
    return controllerResponse(
      SUCCESSFUL.OK,
      "Mail Sent Successfully!",
      mailData
    );
  });
}

module.exports = new AuthController();
