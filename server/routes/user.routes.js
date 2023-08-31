const BaseRouter = require(".");
const userController = require("../controllers/user.controller");
const { verifyToken, verifyPermission } = require("../middlewares/auth");
const {validate} = require("express-validation");
const { updateProfileSchema, updatePasswordSchema, subscribeSchema } = require("../validations/user.validation");

class UserRouter extends BaseRouter {
  initRoutes() {
    this.router.post("/updatePassword", verifyToken, verifyPermission("User"), validate(updatePasswordSchema), userController.updatePassword);
    this.router.put("/", verifyToken, verifyPermission("User"), validate(updateProfileSchema), userController.updateProfile);
    this.router.delete("/", verifyToken, verifyPermission("User"), userController.deleteProfile);
    this.router.post("/subscribe", verifyToken, validate(subscribeSchema),userController.subscribe);
    this.router.post("/unsubscribe", verifyToken, validate(subscribeSchema),userController.unsubscribe);
    this.router.get("/subscriptions", verifyToken, userController.getSubscriptions);
    this.router.get("/:username", userController.getUserByUsername);
    this.router.get("/", verifyToken, userController.profile);
  }
}

module.exports = new UserRouter().router;
