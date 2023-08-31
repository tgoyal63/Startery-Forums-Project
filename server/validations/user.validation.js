const { Joi } = require("express-validation");

class PostValidation {
  static get updateProfileSchema() {
    return {
      body: Joi.object({
        name: Joi.string(),
        username: Joi.string(),
        email: Joi.string().email(),
        profilePicture: Joi.string(),
        bio: Joi.string(),
        settings: Joi.object(),
      }),
    };
  }

  static get updatePasswordSchema() {
    return {
      body: Joi.object({
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required(),
      }),
    };
  }

  static get subscribeSchema() {
    return {
      body: Joi.object({
        categoryName: Joi.string().required(),
      }),
    };
  }
}

module.exports = PostValidation;
