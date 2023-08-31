const BaseRouter = require(".");
const categoryController = require("../controllers/category.controller");
const { validate } = require("express-validation");
const { verifyToken, verifyPermission } = require("../middlewares/auth");
const { createCategorySchema, updateCategorySchema } = require("../validations/category.validation");

class CategoryRouter extends BaseRouter {
  initRoutes() {
    this.router.post("/", verifyToken, validate(createCategorySchema), categoryController.createCategory); // Create category by user
    this.router.get("/:name", categoryController.getCategoryByName); // Get category by name
    this.router.get("/", categoryController.getAllCategories); // Get all categories
    this.router.put("/:name", verifyToken, validate(updateCategorySchema), categoryController.updateCategoryByName); // Update category by name
    this.router.delete("/:name", verifyToken, categoryController.deleteCategoryByName); // Delete category by name
  }
}

module.exports = new CategoryRouter().router;
