require('dotenv').config();
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const Post = require('../models/Post');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path')
const uploadMiddleware = multer({ dest: '../client/uploads'});

// AUTHETICATION & VERIFICATION
const salt_sync = parseInt(process.env.SALT_SYNC, 10)
const salt = bcrypt.genSaltSync(salt_sync);
const secret = process.env.SECRET_KEY;

// MULTER MIDDLEWARE
app.use("/uploads", express.static(path.join(__dirname, '/uploads')));

// GET Post Endpoint
router.get('/getpost', async (req, res) => {
   res.json(
      await Post
         .find() // find all posts
         .populate('author', ['username']) // get only username of author
         .sort({ createdAt: -1 }) // sort latest to oldest post
         .limit(20) // limit to latest 20 posts: avoid overloading
   );
});

// OPEN/VIEW Post Endpoint
router.get('/viewpost/:id', async (req, res) => {
   const { id } = req.params;
   const postDoc = await Post.findById(id).populate('author', ['username']);
   res.json(postDoc);
   // console.log(postDoc)
});

// CREATE Post Endpoint
router.post('/createpost', uploadMiddleware.single('file'), async (req, res) => { // CreatePost.jsx: 'file' -> data.set('file', files)
   const { originalname, path } = req.file;
   const parts = originalname.split('.');
   const extension = parts[parts.length - 1]
   const newPath = path + '.' + extension;
   fs.renameSync(path, newPath);
   const { token } = req.cookies;
   jwt.verify(token, secret, {}, async (error, info) => {
      if (error) throw error; // Throw caught error
      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
         title,
         summary,
         content,
         cover: newPath,
         author: info.id
      });
      res.json(postDoc);
      // console.log(postDoc) 
   });
   // console.log(originalname)
   // console.log(newPath)
});

// UPDATE Post Endpoint
router.put('/updatepost', uploadMiddleware.single('file'), async (req, res) => {
   let newPath = null;
   if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const extension = parts[parts.length - 1]
      newPath = path + '.' + extension;
      fs.renameSync(path, newPath);
   }
   const { token } = req.cookies;
   jwt.verify(token, secret, {}, async (error, info) => {
      if (error) throw error;
      const { id, title, summary, content } = req.body;
      const postDoc = await Post.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
         return res.status(400).json('Invalid Author for Post');
      }
      await postDoc.updateOne({
         title,
         summary,
         content,
         cover: newPath ? newPath : postDoc.cover,
      });
      res.json(postDoc);
   });
});

// DELETE Post Endpoint
router.delete('/deletepost/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const deletePost = await Post.findByIdAndDelete(id);
      res.status(200).json({ message: "Post Deleted" });
      console.log("Post Deleted!");
   } catch (error) {
      console.log("Error: ", error);
   }
});

// SEARCH Post Endpoint 
router.get('/searchPost', async (req, res) => {
   const query = req.query;
   try {
      const searchFilter = {
         title: { $regex: query.search, $options: 'i' } // options -> i=uppercase
      }
      const searchPosts = await Post.find(query.search ? searchFilter : null);
      res.status(200).json(searchPosts);
   } catch (error) {
      console.log("Error: ", error);
   }
});

module.exports = router