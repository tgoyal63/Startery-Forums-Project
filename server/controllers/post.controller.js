const postService = require("../services/post.service");
const {
  controllerBoilerPlate,
  controllerResponse,
} = require("../utils/controller.utils");
const { SUCCESSFUL, CLIENT_ERROR } = require("../config/httpStatusCodes");
const { CustomError } = require("../utils/error.utils");
const categoryService = require("../services/category.service");
const userService = require("../services/user.service");

class PostController {
  // Create post
  createPost = controllerBoilerPlate(async (req, res) => {
    req.body.author = req.user._id;
    const category = await categoryService.search(
      { name: req.body.category.toLowerCase() },
      1
    );
    if (category?.length === 0)
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.NOT_FOUND,
        "Category Not Found"
      );
    req.body.category = category[0]._id;
    const data = await postService.create(req.body);
    return controllerResponse(SUCCESSFUL.CREATED, "Post Created", data);
  });

  // Get user posts
  getUserPosts = controllerBoilerPlate(async (req, res) => {
    if (req.query.category) {
      const category = await categoryService.search({
        name: req.query.category.toLowerCase(),
      });
      if (!category)
        throw new CustomError(
          "Client Error",
          CLIENT_ERROR.NOT_FOUND,
          "Category Not Found"
        );
      req.query.category = category._id;
    }

    const data = await postService.search({
      author: req.user._id,
      ...req.query,
    });
    if (data?.length === 0)
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.NOT_FOUND,
        "No Posts Found"
      );
    return controllerResponse(SUCCESSFUL.OK, "Posts Found", data);
  });

  // Get post by id
  getPostById = controllerBoilerPlate(async (req, res) => {
    const data = await postService.search(req.params);
    if (data.length === 0) {
      throw new CustomError(
        "Client error",
        CLIENT_ERROR.NOT_FOUND,
        "Post Not Found"
      );
    }
    return controllerResponse(SUCCESSFUL.OK, "Post found ", data[0]);
  });

  // Get posts
  getAllPosts = controllerBoilerPlate(async (req, res) => {
    if (req.query.author) {
      const user = await userService.searchByEntity(
        "username",
        req.query.author,
        1
      );
      if (!user)
        throw new CustomError(
          "Client Error",
          CLIENT_ERROR.NOT_FOUND,
          "User Not Found"
        );
      req.query.author = user._id;
    }
    if (req.query.category) {
      const category = await categoryService.search(
        {
          name: req.query.category.toLowerCase(),
        },
        1
      );
      if (category?.length === 0)
        throw new CustomError(
          "Client Error",
          CLIENT_ERROR.NOT_FOUND,
          "Category Not Found"
        );
      req.query.category = category[0]._id;
    }
    const data = await postService.search(req.query);
    if (data?.length === 0)
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.NOT_FOUND,
        "No Posts Found"
      );
    return controllerResponse(SUCCESSFUL.OK, "Post Found", data);
  });

  // Check author and user and then update
  updatePost = controllerBoilerPlate(async (req, res) => {
    const data = await postService.update(req.params.id, req.body);
    return controllerResponse(SUCCESSFUL.OK, "Post Updated", data);
  });

  deletePost = controllerBoilerPlate(async (req, res) => {
    const data = await postService.deleteById(req.params.id);
    return controllerResponse(SUCCESSFUL.OK, "Post Deleted", data);
  });

  checkPostAndVote = async (req, voteType, actionType) => {
    let post = await postService.search({ postId: req.params.id }, 1);
    if (post?.length === 0)
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.NOT_FOUND,
        "Post Not Found"
      );

    const hasVoted = post[0][voteType]
      .map((vote) => vote.toString())
      .includes(req.user._id.toString());

    if (
      (actionType === "remove" && !hasVoted) ||
      (actionType === "add" && hasVoted)
    ) {
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.FORBIDDEN,
        actionType === "remove"
          ? `Not ${voteType === "upvotes" ? "Upvoted" : "Downvoted"}`
          : `Already ${voteType === "upvotes" ? "Upvoted" : "Downvoted"}`
      );
    }

    return post;
  };

  upvotePost = controllerBoilerPlate(async (req, res) => {
    let post = await this.checkPostAndVote(req, "upvotes", "add");

    if (
      post[0].downvotes
        .map((downvote) => downvote.toString())
        .includes(req.user._id.toString())
    )
      post = await postService.removeDownvoteById(req.params.id, req.user._id);

    const data = await postService.upvoteById(req.params.id, req.user._id);
    return controllerResponse(SUCCESSFUL.OK, "Post Upvoted", data);
  });

  downvotePost = controllerBoilerPlate(async (req, res) => {
    let post = await this.checkPostAndVote(req, "downvotes", "add");

    if (
      post[0].upvotes
        .map((upvote) => upvote.toString())
        .includes(req.user._id.toString())
    )
      post = await postService.removeUpvoteById(req.params.id, req.user._id);

    const data = await postService.downvoteById(req.params.id, req.user._id);
    return controllerResponse(SUCCESSFUL.OK, "Post Downvoted", data);
  });

  removeUpvotePost = controllerBoilerPlate(async (req, res) => {
    await this.checkPostAndVote(req, "upvotes", "remove");

    const data = await postService.removeUpvoteById(
      req.params.id,
      req.user._id
    );
    return controllerResponse(SUCCESSFUL.OK, "Post Upvote Removed", data);
  });

  removeDownvotePost = controllerBoilerPlate(async (req, res) => {
    await this.checkPostAndVote(req, "downvotes", "remove");

    const data = await postService.removeDownvoteById(
      req.params.id,
      req.user._id
    );
    return controllerResponse(SUCCESSFUL.OK, "Post Downvote Removed", data);
  });
}

module.exports = new PostController();
