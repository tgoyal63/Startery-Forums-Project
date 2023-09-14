const commentService = require("../services/comment.service");
const {
  controllerBoilerPlate,
  controllerResponse,
} = require("../utils/controller.utils");
const { SUCCESSFUL, CLIENT_ERROR } = require("../config/httpStatusCodes");
const { CustomError } = require("../utils/error.utils");
const userService = require("../services/user.service");
const postService = require("../services/post.service");

class CommentController {
  // Create comment
  createComment = controllerBoilerPlate(async (req, res) => {
    // Check if post exists
    if (req.body.post) {
      const post = await postService.search({ postId: req.body.post });
      if (post.length === 0) {
        throw new CustomError(
          "Client error",
          CLIENT_ERROR.NOT_FOUND,
          "Post Not Found"
        );
      }
    }

    // Check if comment exists
    if (req.body.parentComment) {
      const comment = await commentService.search({
        commentId: req.body.parentComment,
      });
      if (comment.length === 0) {
        throw new CustomError(
          "Client error",
          CLIENT_ERROR.NOT_FOUND,
          "Comment Not Found"
        );
      }
    }

    req.body.author = req.user._id;
    const data = await commentService.create(req.body);

    if (req.body.post) {
      const post = await postService.addCommentById(req.body.post, data._id);
    }

    if (req.body.parentComment) {
      const comment = await commentService.addRepyById(
        req.body.parentComment,
        data._id
      );
    }

    return controllerResponse(SUCCESSFUL.CREATED, "Comment Created", data);
  });

  // Get user comments
  getUserComments = controllerBoilerPlate(async (req, res) => {
    const data = await commentService.search({
      author: req.user._id,
      ...req.query,
    });
    if (data?.length === 0)
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.NOT_FOUND,
        "No Comments Found"
      );
    return controllerResponse(SUCCESSFUL.OK, "Comments Found", data);
  });

  // Get Comment By Id
  getCommentById = controllerBoilerPlate(async (req, res) => {
    const data = await commentService.search({ commentId: req.params.id });
    if (data.length === 0) {
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.NOT_FOUND,
        "Comment not found"
      );
    }
    return controllerResponse(SUCCESSFUL.OK, "Comment Founded", data[0]);
  });

  // Get comments
  getAllComments = controllerBoilerPlate(async (req, res) => {
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
    const data = await commentService.search(req.query);
    if (data?.length === 0)
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.NOT_FOUND,
        "No Comments Found"
      );
    return controllerResponse(SUCCESSFUL.OK, "Comment Found", data);
  });

  // Check author and user and then update
  updateComment = controllerBoilerPlate(async (req, res) => {
    const data = await commentService.update(req.params.id, req.body);
    return controllerResponse(SUCCESSFUL.OK, "Comment Updated", data);
  });

  deleteComment = controllerBoilerPlate(async (req, res) => {
    const data = await commentService.deleteById(req.params.id);
    if (!data) {
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.NOT_FOUND,
        "No Comment Found"
      );
    }
    if (data.parentComment) {
      const parent = await commentService.removeReplyById(
        data.parentComment,
        data._id
      );
    }
    if (data.post) {
      const post = await postService.removeCommentById(data.post, data._id);
    }
    return controllerResponse(SUCCESSFUL.OK, "Comment Deleted", data);
  });

  checkCommentAndVote = async (req, voteType, actionType) => {
    let comment = await commentService.search({ commentId: req.params.id }, 1);
    if (comment?.length === 0)
      throw new CustomError(
        "Client Error",
        CLIENT_ERROR.NOT_FOUND,
        "Comment Not Found"
      );

    const hasVoted = comment[0][voteType]
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

    return comment;
  };

  upvoteComment = controllerBoilerPlate(async (req, res) => {
    let comment = await this.checkCommentAndVote(req, "upvotes", "add");

    if (
      comment[0].downvotes
        .map((downvote) => downvote.toString())
        .includes(req.user._id.toString())
    )
      comment = await commentService.removeDownvoteById(
        req.params.id,
        req.user._id
      );

    const data = await commentService.upvoteById(req.params.id, req.user._id);
    return controllerResponse(SUCCESSFUL.OK, "Comment Upvoted", data);
  });

  downvoteComment = controllerBoilerPlate(async (req, res) => {
    let comment = await this.checkCommentAndVote(req, "downvotes", "add");

    if (
      comment[0].upvotes
        .map((upvote) => upvote.toString())
        .includes(req.user._id.toString())
    )
      comment = await commentService.removeUpvoteById(
        req.params.id,
        req.user._id
      );

    const data = await commentService.downvoteById(req.params.id, req.user._id);
    return controllerResponse(SUCCESSFUL.OK, "Comment Downvoted", data);
  });

  removeUpvoteComment = controllerBoilerPlate(async (req, res) => {
    await this.checkCommentAndVote(req, "upvotes", "remove");

    const data = await commentService.removeUpvoteById(
      req.params.id,
      req.user._id
    );
    return controllerResponse(SUCCESSFUL.OK, "Comment Upvote Removed", data);
  });

  removeDownvoteComment = controllerBoilerPlate(async (req, res) => {
    await this.checkCommentAndVote(req, "downvotes", "remove");

    const data = await commentService.removeDownvoteById(
      req.params.id,
      req.user._id
    );
    return controllerResponse(SUCCESSFUL.OK, "Comment Downvote Removed", data);
  });
}

module.exports = new CommentController();
