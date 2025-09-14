const express = require('express');
const Users = require('../models/Users');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken')
const router = express.Router();
const Comment = require('../models/Comment');

// POST Comment Endpoint
router.post("/postcomment", async (req, res) => {
   const { comment, author, postId, userId, postAuthor } = req.body;
   try {
      const newComment = new Comment({
         comment, author, postId, userId, postAuthor
      });
      const savedComment = await newComment.save() // comments saved to DB
      res.status(200).json(savedComment)
   }
   catch (err) {
      console.error('Error saving comment:', err);
      res.status(500).json(err)
   }
});

// GET Post Comments Endpoint
router.get("/getcomment/:postId", async (req, res) => {
   const { postId } = req.params;
   try {
      const comments = await Comment.find({ postId })
      res.status(200).json(comments)
   }
   catch (err) {
      res.status(500).json(err)
   }
});

// UPDATE Comment Endpoint
router.put("/updatecomment/:id", async (req, res) => {
   try {
      const updatedComment = await Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      res.status(200).json(updatedComment)
   } catch (err) {
      res.status(500).json(err)
   }
});

// DELETE Comment Endpoint
router.delete("/deletecomment/:id", async (req, res) => {
   const { id } = req.params;
   try {
      const deletedComment = await Comment.findByIdAndDelete(id);
      if (!deletedComment) {
         console.log("Comment Not Found!");
         return res.status(404).json({ error: "Comment not found" });
      }
      console.log(`Comment with ID ${id} has been deleted.`);
      res.status(200).json("Comment has been deleted!");
   } catch (err) {
      console.error("Error deleting comment:", err);
      res.status(500).json({ error: "Internal Server Error" });
   }
});

module.exports = router