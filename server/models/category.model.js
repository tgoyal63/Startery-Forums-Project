const { Schema, model } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    subscribers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = model("Category", CategorySchema);
