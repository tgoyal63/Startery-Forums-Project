const {
  controllerBoilerPlate,
  controllerResponse,
} = require("../utils/controller.utils");
const { SUCCESSFUL, CLIENT_ERROR } = require("../config/httpStatusCodes");
const { CustomError } = require("../utils/error.utils");
const categoryService = require("../services/category.service");
const userService = require("../services/user.service");

class CategoryController {
  // Create category
  createCategory = controllerBoilerPlate(async (req, res) => {
    req.body.name = req.body.name.toLowerCase();
    const {name, description, subscribers, createdAt, updatedAt} = await categoryService.create(req.body);
    return controllerResponse(SUCCESSFUL.CREATED, "Category Created", {name, description, subscribers, createdAt, updatedAt});
  });

  // Get category by name
  getCategoryByName = controllerBoilerPlate(async (req, res) => {
    req.params.name = req.params.name.toLowerCase();
    const data = await categoryService.search({ name: req.params.name });
    if (data?.length === 0)
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.NOT_FOUND,
        "Category Not Found"
      );
    return controllerResponse(SUCCESSFUL.OK, "Category Found", data[0]);
  });

  // Get all categories
  getAllCategories = controllerBoilerPlate(async (req, res) => {
    const data = await categoryService.search({});
    return controllerResponse(SUCCESSFUL.OK, "Categories Found", data);
  });

  // Update category by name
  updateCategoryByName = controllerBoilerPlate(async (req, res) => {
    const data = await categoryService.update(
      { name: req.params.name.toLowerCase() },
      req.body
    );
    if (!data)
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.NOT_FOUND,
        "Category Not Found"
      );
    return controllerResponse(SUCCESSFUL.OK, "Category Updated", data);
  });

  // Delete category by name
  deleteCategoryByName = controllerBoilerPlate(async (req, res) => {
    const data = await categoryService.delete({
      name: req.params.name.toLowerCase(),
    });
    if (!data)
        throw new CustomError(
            "Client Error",
            CLIENT_ERROR.NOT_FOUND,
            "Category Not Found"
        );
    await userService.removeSubscriptionFromAll(data._id);
    return controllerResponse(SUCCESSFUL.OK, "Category Deleted", data);
  });
}

module.exports = new CategoryController();
