const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "Upvote" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "Downvote" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  shares: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Post", PostSchema);
