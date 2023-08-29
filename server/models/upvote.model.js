const { Schema, model } = require("mongoose");

const UpvoteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    comment: { type: Schema.Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);

module.exports = model("Upvote", UpvoteSchema);
