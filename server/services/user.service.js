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
  searchByEntity = serviceBoilerPlate(async (entity, entityValue) => {
    const query = {};
    if (entity === "_id") {
      query._id = ObjectId(entityValue);
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
    const data = await user
      .aggregate([
        {
          $lookup: {
            from: upvote.collection.name,
            localField: "upvotes",
            foreignField: "_id",
            as: "upvotes",
            let: { upvotes: "$upvotes" },
            pipeline: [{ $project: { status: 1, _id: 0 } }],
          },
        },
        {
          $lookup: {
            from: downvote.collection.name,
            localField: "downvotes",
            foreignField: "_id",
            as: "downvotes",
            let: { votes: "$downvotes" },
            pipeline: [{ $project: { status: 1, _id: 0 } }],
          },
        },
        { $match: query },
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
