const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CommentSchema = new Schema({
   comment: {
      type: String,
      required: true,
   },
   author: {
      type: String,
      required: true
   },
   postId: { type: Schema.Types.ObjectId, ref: 'Post' },
   userId: { type: Schema.Types.ObjectId, ref: 'User' },
   postAuthor: { type: String, required: true }
}, {
   timestamps: true
});

module.exports = model("Comment", CommentSchema)