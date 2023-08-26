const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: String,
    bio: String,
    settings: Object,
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    upvotes: [{ type: Schema.Types.ObjectId, ref: "Upvote" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "Downvote" }],
    subscriptions: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
