const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Upvote",
      default: [],
    },
  ],
  downvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Downvote",
      default: [],
    },
  ],
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: [],
    },
  ],
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("Comment", CommentSchema);
