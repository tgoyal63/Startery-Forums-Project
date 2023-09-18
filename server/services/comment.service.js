// Importing File Dependencies
const comment = require("../models/comment.model");
const { serviceBoilerPlate } = require("../utils/service.utils");
const { ObjectId } = require("mongoose").Types;

const projectFields = {
  content: 1,
  author: 1,
  post: 1,
  repliesCount: { $size: "$replies" },
  upvotesCount: { $size: "$upvotes" },
  downvotesCount: { $size: "$downvotes" },
  parentComment: 1,
  _id: 1,
};

class CommentService {
  // Creating a comment in database
  create = serviceBoilerPlate(async (data) => {
    if (data.parentComment)
      data.parentComment = new ObjectId(data.parentComment);
    if (data.post) data.post = new ObjectId(data.post);
    const response = await comment.create(data);
    return response;
  });

  // Searching for comments in database
  search = serviceBoilerPlate(async (query, sensitive) => {
    let localProjectFields = { ...projectFields };
    if (query.author) query.author = new ObjectId(query.author);
    if (query.commentId) {
      query._id = new ObjectId(query.commentId);
      delete query.commentId;
    }
    if (sensitive) {
      localProjectFields.upvotes = 1;
      localProjectFields.downvotes = 1;
      localProjectFields.replies = 1;
    }
    const { page = 1, limit = 10, ...rest } = query;
    const skip = (page - 1) * limit;
    const data = await comment
      .aggregate([
        { $match: { ...rest } },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: Number(limit) },
        { $project: localProjectFields },
        // select username from users where _id = author
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        { $unwind: "$author" },
        { $addFields: { author: "$author.username" } },
      ])
      .exec();
    return data;
  });

  // Updating a comment by its id in database
  updateById = serviceBoilerPlate(async (_id, data) => {
    const response = await comment
      .findByIdAndUpdate(_id, data, {
        new: true,
        projection: projectFields,
      })
      .exec();
    return response;
  });

  // Deleting a comment by its id from database
  deleteById = serviceBoilerPlate(async (_id) => {
    const data = await comment
      .findByIdAndDelete(_id, {
        projection: projectFields,
      })
      .exec();
    return data;
  });

  // Upvoting a comment by its id in database
  upvoteById = (_id, userId) =>
    this.updateById(_id, { $addToSet: { upvotes: userId } });

  // Downvoting a comment by its id in database
  downvoteById = (_id, userId) =>
    this.updateById(_id, { $addToSet: { downvotes: userId } });

  // Removing upvote from a comment by its id in database
  removeUpvoteById = (_id, userId) =>
    this.updateById(_id, { $pull: { upvotes: userId } });

  // Removing downvote from a comment by its id in database
  removeDownvoteById = (_id, userId) =>
    this.updateById(_id, { $pull: { downvotes: userId } });

  // Adding reply to a comment by its id in database
  addRepyById = (_id, commentId) =>
    this.updateById(_id, { $addToSet: { replies: commentId } });

  // Removing reply from a comment by its id in database
  removeReplyById = (_id, commentId) =>
    this.updateById(_id, { $pull: { replies: commentId } });
}

module.exports = new CommentService();
