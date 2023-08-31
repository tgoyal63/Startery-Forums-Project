// Importing File Dependencies
const { CLIENT_ERROR } = require("../config/httpStatusCodes");
const user = require("../models/user.model");
const { CustomError } = require("../utils/error.utils");
const { serviceBoilerPlate } = require("../utils/service.utils");
const { ObjectId } = require("mongoose").Types;

let projectFields = {
  name: 1,
  username: 1,
  email: 1,
  profilePicture: 1,
  bio: 1,
  settings: 1,
  subscriptionsCount: { $size: "$subscriptions" },
  _id: 0,
};
class UserService {
  // Creating a user in database
  create = serviceBoilerPlate(async (data) => await user.create(data));

  // Searching for user in database
  searchByEntity = serviceBoilerPlate(
    async (entity, entityValue, sensitive = 0) => {
      const query = {};
      const allowedEntities = ["_id", "username", "email"];
      if (!allowedEntities.includes(entity))
        throw new CustomError(
          "Client Error",
          CLIENT_ERROR.FORBIDDEN,
          "Invalid Search"
        );
      query[entity] =
        entity === "_id" ? new ObjectId(entityValue) : entityValue;
      let localProjectFields = { ...projectFields };
      if (sensitive) {
        localProjectFields.token = 1;
        localProjectFields.password = 1;
        localProjectFields._id = 1;
        localProjectFields.subscriptions = 1;
      }
      const data = await user
        .findOne(query)
        .select(localProjectFields)
        .populate()
        .exec();
      return data;
    }
  );

  // Updating a user by its id in database
  updateById = serviceBoilerPlate(
    async (_id, body) =>
      await user
        .findByIdAndUpdate(_id, body, { new: true })
        .select(projectFields)
        .exec()
  );

  // Deleting a user by its id from database
  deleteById = serviceBoilerPlate(
    async (_id) => await user.findOneAndDelete({ _id }).exec()
  );

  // Adding a post to user
  addPost = serviceBoilerPlate(
    async (_id, postId) =>
      await this.updateById(_id, { $push: { posts: postId } })
  );

  // Removing a post from user
  removePost = serviceBoilerPlate(
    async (_id, postId) =>
      await this.updateById(_id, { $pull: { posts: postId } })
  );

  // Adding a comment to user
  addComment = serviceBoilerPlate(
    async (_id, commentId) =>
      await this.updateById(_id, { $push: { comments: commentId } })
  );

  // Removing a comment from user
  removeComment = serviceBoilerPlate(
    async (_id, commentId) =>
      await this.updateById(_id, { $pull: { comments: commentId } })
  );

  // Adding a subscription to user
  addSubscription = serviceBoilerPlate(
    async (_id, categoryId) =>
      await this.updateById(_id, {
        $push: { subscriptions: new ObjectId(categoryId) },
      })
  );

  // Removing a subscription from user
  removeSubscription = serviceBoilerPlate(
    async (_id, categoryId) =>
      await this.updateById(_id, {
        $pull: { subscriptions: new ObjectId(categoryId) },
      })
  );

  // Remove subscription from all users
  removeSubscriptionFromAll = serviceBoilerPlate(
    async (categoryId) =>
      await user.updateMany(
        { subscriptions: new ObjectId(categoryId) },
        { $pull: { subscriptions: new ObjectId(categoryId) } }
      )
  );

  // Get subscriptions of user
  getSubscriptions = serviceBoilerPlate(
    async (_id) =>
      await user
        .findById(_id)
        .select({ subscriptions: 1, _id: 0 })
        .populate("subscriptions", { name: 1, _id: 0 })
        .exec()
  );
}

module.exports = new UserService();
