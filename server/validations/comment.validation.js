const { Joi } = require("express-validation");

class CommentValidation {
  static get createCommentSchema() {
    return {
      body: Joi.alternatives(
        Joi.object({
          content: Joi.string().required(),
          post: Joi.string().required(),
        }),
        Joi.object({
          content: Joi.string().required(),
          parentComment: Joi.string().required(),
        })
      ),
    };
  }

  static get searchCommentsSchema() {
    return {
      query: Joi.object({
        commentId: Joi.string(),
        author: Joi.string(),
        post: Joi.string(),
        page: Joi.number(),
        limit: Joi.number(),
        parentComment: Joi.string()
      }),
    };
  }

  static get userCommentsSchema() {
    return {
      query: Joi.object({
        commentId: Joi.string(),
        post: Joi.string(),
        page: Joi.number(),
        limit: Joi.number(),
      }),
    };
  }

  static get updateCommentSchema() {
    return {
      body: Joi.object({
        content: Joi.string().required(),
      }),
    };
  }
}

module.exports = CommentValidation;
