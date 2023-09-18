const { validate } = require("express-validation");
const { signUpSchema, loginSchema, forgotPasswordSchema } = require("../validations/auth.validation");
const BaseRouter = require(".");
const authController = require("../controllers/auth.controller");

class AuthRouter extends BaseRouter {
  initRoutes() {
    this.router.post("/register", validate(signUpSchema), authController.register);
    this.router.post("/login", validate(loginSchema), authController.login);
    this.router.post("/forgotPassword", validate(forgotPasswordSchema), authController.forgotPassword);
  }
}

module.exports = new AuthRouter().router;
