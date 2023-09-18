const BaseRouter = require(".");
const postController = require("../controllers/post.controller");
const { validate } = require("express-validation");
const { verifyToken, verifyPermission } = require("../middlewares/auth");
const { createPostSchema, searchPostsSchema, userPostsSchema, updatePostSchema } = require("../validations/post.validation");

class PostRouter extends BaseRouter {
  initRoutes() {
    this.router.get("/me", verifyToken, postController.getUserPosts); // Get all posts by user with filters and pagination
    this.router.post("/share", postController.sharePost);
    this.router.post("/:id/upvote", verifyToken, postController.upvotePost); // Upvote post by id
    this.router.post("/:id/downvote", verifyToken, postController.downvotePost); // Downvote post by id
    this.router.delete("/:id/upvote", verifyToken, postController.removeUpvotePost); // Remove upvote from post by id
    this.router.delete("/:id/downvote", verifyToken, postController.removeDownvotePost); // Remove downvote from post by id
    this.router.get("/:postId", postController.getPostById); // Get post by id
    this.router.put("/:id", verifyToken, verifyPermission("Post"), validate(updatePostSchema), postController.updatePost); // Update post by id
    this.router.delete("/:id", verifyToken, verifyPermission("Post"), postController.deletePost); // Delete post by id
    this.router.get("/", validate(searchPostsSchema), postController.getAllPosts); // Get all posts with filters and pagination
    this.router.post("/", verifyToken, validate(createPostSchema), postController.createPost); // Create post by user
  }
}

module.exports = new PostRouter().router;
