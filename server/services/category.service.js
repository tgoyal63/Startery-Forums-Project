// Importing File Dependencies
const category = require("../models/category.model");
const { serviceBoilerPlate } = require("../utils/service.utils");
const { ObjectId } = require("mongoose").Types;

const projectFields = {
  name: 1,
  description: 1,
  subscribersCount: { $size: "$subscribers" },
  createdAt: 1,
  updatedAt: 1,
  _id: 0,
};

class CategoryService {
  // Creating a category in database
  create = serviceBoilerPlate(
    async ({ name, description = "" }) =>
      await category.create({ name, description })
  );

  // Searching for category by name in database
  search = serviceBoilerPlate(
    async (query, sensitive = 0) =>
      await category
        .find(query)
        .select({ ...projectFields, _id: sensitive })
        .exec()
  );

  // Updating a category by its id in database
  update = serviceBoilerPlate(
    async (query, data) =>
      await category
        .findOneAndUpdate(query, data, { new: true })
        .select(projectFields)
        .exec()
  );

  // Deleting a category by its name from database
  delete = serviceBoilerPlate(
    async (query) => await category.findOneAndDelete(query).exec()
  );

  // Appending subscriber in category
  appendSubscriberById = serviceBoilerPlate(
    async (_id, userId) =>
      await this.update(
        { _id: new ObjectId(_id) },
        { $push: { subscribers: new ObjectId(userId) } }
      )
  );

  // Removing subscriber from category
  removeSubscriberById = serviceBoilerPlate(
    async (_id, userId) =>
      await this.update(
        { _id: new ObjectId(_id) },
        { $pull: { subscribers: new ObjectId(userId) } }
      )
  );

  // Removing subscriber from all categories
  removeSubscriberFromAll = serviceBoilerPlate(async (userId) => {
    await category
      .updateMany(
        { subscribers: new ObjectId(userId) },
        { $pull: { subscribers: new ObjectId(userId) } }
      )
      .exec();
  });
}

module.exports = new CategoryService();
