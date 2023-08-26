const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "Upvote" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "Downvote" }],
  replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  shares: { type: Number, default: 0 },
},
{ timestamps: true }
);


module.exports = model("Comment", CommentSchema);
