// Importing File Dependencies
const post = require("../models/post.model");
const { serviceBoilerPlate } = require("../utils/service.utils");
const { ObjectId } = require("mongoose").Types;

const projectFields = {
  title: 1,
  content: 1,
  author: 1,
  category: 1,
  commentsCount: { $size: "$comments" },
  upvotesCount: { $size: "$upvotes" },
  downvotesCount: { $size: "$downvotes" },
  shares: 1,
  views: 1,
  _id: 1,
};

class PostService {
  // Creating a post in database
  create = serviceBoilerPlate(async ({ title, content, author, category }) => {
    const response = await post.create({ title, content, author, category });
    return response;
  });

  // Searching for posts in database
  search = serviceBoilerPlate(async (query, sensitive) => {
    let localProjectFields = { ...projectFields };
    if (query.category) query.category = new ObjectId(query.category);
    if (query.author) query.author = new ObjectId(query.author);
    if (query.postId) {
      query._id = new ObjectId(query.postId);
      delete query.postId;
    }
    if (sensitive) {
      localProjectFields.upvotes = 1;
      localProjectFields.downvotes = 1;
      localProjectFields.comments = 1;
    }
    const { page = 1, limit = 10, ...rest } = query;
    const skip = (page - 1) * limit;
    const data = await post
      .aggregate([
        { $match: { ...rest } },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
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
        // select name from categories where _id = category
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: "$category" },
        { $addFields: { category: "$category.name" } },
      ])
      .exec();
    return data;
  });

  // Updating a post by its id in database
  updateById = serviceBoilerPlate(async (_id, data) => {
    const response = await post
      .findByIdAndUpdate(_id, data, {
        new: true,
        projection: projectFields,
      })
      .exec();
    return response;
  });

  // Deleting a post by its id from database
  deleteById = serviceBoilerPlate(async (_id) => {
    const data = await post
      .findByIdAndDelete(_id, {
        projection: projectFields,
      })
      .exec();
    return data;
  });

  // Upvoting a post by its id in database
  upvoteById = (_id, userId) =>
    this.updateById(_id, { $addToSet: { upvotes: userId } });

  // Downvoting a post by its id in database
  downvoteById = (_id, userId) =>
    this.updateById(_id, { $addToSet: { downvotes: userId } });

  // Removing upvote from a post by its id in database
  removeUpvoteById = (_id, userId) =>
    this.updateById(_id, { $pull: { upvotes: userId } });

  // Removing downvote from a post by its id in database
  removeDownvoteById = (_id, userId) =>
    this.updateById(_id, { $pull: { downvotes: userId } });

  // Adding comment to a post by its id in database
  addCommentById = (_id, commentId) =>
    this.updateById(_id, { $addToSet: { comments: commentId } });

  // Removing comment from a post by its id in database
  removeCommentById = (_id, commentId) =>
    this.updateById(_id, { $pull: { comments: commentId } });

  // Adding share to a post by its id in database
  addShareById = (_id, userId) =>
    this.updateById(_id, { $addToSet: { shares: userId } });

  // Adding view to a post by its id in database
  addViewById = (_id) => this.updateById(_id, { $inc: { views: 1 } });
}

module.exports = new PostService();
