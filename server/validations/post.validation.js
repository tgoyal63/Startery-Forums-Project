const { Joi } = require("express-validation");

class PostValidation {
  static get createPostSchema() {
    return {
      body: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        category: Joi.string().required(),
      }),
    };
  }

  static get searchPostsSchema() {
    return {
      query: Joi.object({
        postId: Joi.string(),
        title: Joi.string(),
        category: Joi.string(),
        page: Joi.number(),
        limit: Joi.number(),
        author: Joi.string(),
      }),
    };
  }

  static get userPostsSchema() {
    return {
      query: Joi.object({
        postId: Joi.string(),
        title: Joi.string(),
        category: Joi.string(),
        page: Joi.number(),
        limit: Joi.number(),
      }),
    };
  }

  static get updatePostSchema() {
    return {
      body: Joi.object({
        title: Joi.string(),
        content: Joi.string(),
        category: Joi.string(),
      }),
    };
  }
}

module.exports = PostValidation;
