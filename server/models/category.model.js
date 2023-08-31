const { Schema, model } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    subscribers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = model("Category", CategorySchema);
