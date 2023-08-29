const BaseRouter = require(".");
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/auth");

class UserRouter extends BaseRouter {
  initRoutes() {
    this.router.get("/profile", verifyToken, userController.profile);
  }
}

module.exports = new UserRouter().router;
