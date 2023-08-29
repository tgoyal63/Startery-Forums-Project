const { validate } = require("express-validation");
const { signUpSchema, loginSchema } = require("../validations/auth.validation");
const BaseRouter = require(".");
const authController = require("../controllers/auth.controller");

class AuthRouter extends BaseRouter {
  initRoutes() {
    this.router.post("/register", validate(signUpSchema), authController.register);
    this.router.post("/login", validate(loginSchema), authController.login);
  }
}

module.exports = new AuthRouter().router;
