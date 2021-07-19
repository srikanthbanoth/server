var express = require('express');
var router = express.Router();
const Post = require('../models/post');
const mongoose = require("mongoose");

/* GET home page. */
router.get('/insert', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Insert into DataBase

router.post("/",(req,res)=>{
  const post = new Post({
    title: req.body.title,
    image: req.body.image,
    author: req.body.author,
    tags:req.body.tags,
    description: req.body.description,
    details: req.body.mytextarea
  })
  console.log(post);
  post.save()
    .then((result) => {
      res.redirect("/insert");
    })
    .catch((err) => {
      console.log(err)
    })
})  

// Get all Posts

router.get('/posts', function (req, res, next) {
  Post.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
      res.render('error', { error: err });
    })

});

// Get SinglePost

router.get("/posts/:id",(req,res)=>{
  
  Post.findById(req.params.id)
  .then((result)=>{
    res.json(result);
  })
  .catch((err)=>{
    res.json(err);
  })

})

// get similar Posts

router.get("/related/:id",(req,res)=>{
  let tag = req.params.id;
  Post.find({tags:tag})
  .then((result)=>{
    res.json(result)
  })
  .catch((err)=>console.log(err))
})

module.exports = router;
