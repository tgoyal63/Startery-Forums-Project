const { Joi } = require("express-validation");

class PostValidation {
  static get createCategorySchema() {
    return {
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
      }),
    };
  }

  static get updateCategorySchema() {
    return {
      body: Joi.object({
        description: Joi.string().required(),
      }),
    };
  }
}

module.exports = PostValidation;
