const { Schema, model } = require("mongoose");

const DownvoteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    comment: { type: Schema.Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);

module.exports = model("Downvote", DownvoteSchema);
