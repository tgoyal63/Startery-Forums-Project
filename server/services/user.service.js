// Importing File Dependencies
const { CLIENT_ERROR } = require("../config/httpStatusCodes");
const user = require("../models/user.model");
const upvote = require("../models/upvote.model");
const downvote = require("../models/downvote.model");
const { BaseError } = require("../utils/error.utils");
const { serviceBoilerPlate } = require("../utils/service.utils");
const { ObjectId } = require("mongoose").Types;

class UserService {
  // Creating a user in database
  create = serviceBoilerPlate(async (data) => {
    const response = await user.create(data);
    return response;
  });

  // Searching for user in database
  searchByEntity = serviceBoilerPlate(async (entity, entityValue, sensitive = 0) => {
    const query = {};
    if (entity === "_id") {
      query._id = new ObjectId(entityValue);
    } else if (entity === "username") {
      query.username = entityValue;
    } else if (entity === "email") {
      query.email = entityValue;
    } else {
      throw new BaseError(
        "Client Error",
        CLIENT_ERROR.FORBIDDEN,
        "Invalid Search",
        true
      );
    }
    let projectFields = {
      name: 1,
      username: 1,
      email: 1,
      profilePicture: 1,
      bio: 1,
      settings: 1,
      postsCount: { $size: "$posts" },
      commentsCount: { $size: "$comments" },
      upvotesCount: { $size: "$upvotes" },
      downvotesCount: { $size: "$downvotes" },
      subscriptionsCount: { $size: "$subscriptions" },
      _id: 0,
    };

    if (sensitive)  {
      projectFields.token = 1;
      projectFields.password = 1;
      projectFields._id = 1;
    }
    
    const data = await user
      .aggregate([
        { $match: query },
        {
          $project: projectFields,
        },
      ])
      .exec();
    return data[0];
  });

  // Updating a user by its id in database
  updateById = serviceBoilerPlate(async (_id, body) => {
    const data = await user
      .findOneAndUpdate({ _id }, body, { new: true })
      .exec();
    return data;
  });

  // Deleting a user by its id from database
  // deleteById = serviceBoilerPlate(async  (_id) => {
  //   await user.findOneAndDelete({ _id }).exec();
  // });
}

module.exports = new UserService();
