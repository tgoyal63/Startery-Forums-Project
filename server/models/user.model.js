const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: String,
    bio: String,
    settings: Object,
    subscriptions: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    token: String,
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
