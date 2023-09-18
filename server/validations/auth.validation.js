const { Joi } = require("express-validation");

class AuthValidation {
  static get signUpSchema() {
    return {
      body: Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        profilePicture: Joi.string(),
        bio: Joi.string(),
        settings: Joi.object(),
      }),
    };
  }

  static get loginSchema() {
    return {
      body: Joi.alternatives().try(
        Joi.object().keys({
          username: Joi.string().required(),
          password: Joi.string().required(),
        }),
        Joi.object().keys({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        })
      ),
    };
  }

  static get forgotPasswordSchema() {
    return {
      body: Joi.alternatives().try(
        Joi.object().keys({
          username: Joi.string().required(),
        }),
        Joi.object().keys({
          email: Joi.string().email().required(),
        })
      ),
    };
  }
}

module.exports = AuthValidation;
