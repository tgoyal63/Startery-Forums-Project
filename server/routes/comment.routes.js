const BaseRouter = require(".");
const commentController = require("../controllers/comment.controller");
const { validate } = require("express-validation");
const { verifyToken, verifyPermission } = require("../middlewares/auth");
const { createCommentSchema, userCommentsSchema, searchCommentsSchema, updateCommentSchema } = require("../validations/comment.validation");

class CommentRouter extends BaseRouter {
  initRoutes() {
    this.router.put("/:id", verifyToken, verifyPermission("Comment"), validate(updateCommentSchema), commentController.updateComment); // Update comment by id
    this.router.delete("/:id", verifyToken, verifyPermission("Comment"), commentController.deleteComment); // Delete comment by id
    this.router.post("/:id/upvote", verifyToken, commentController.upvoteComment); // Upvote comment by id
    this.router.post("/:id/downvote", verifyToken, commentController.downvoteComment); // Downvote comment by id
    this.router.delete("/:id/upvote", verifyToken, commentController.removeUpvoteComment); // Remove upvote from comment by id
    this.router.delete("/:id/downvote", verifyToken, commentController.removeDownvoteComment); // Remove downvote from comment by id
    this.router.get("/me", verifyToken, commentController.getUserComments); // Get all comments by user with filters and pagination
    this.router.get("/:id", commentController.getCommentById); // Get comment by id
    this.router.post("/", verifyToken, validate(createCommentSchema), commentController.createComment); // Create comment/reply by user
    this.router.get("/", validate(searchCommentsSchema), commentController.getAllComments); // Get all comments with filters and pagination
  }
}

module.exports = new CommentRouter().router;
