var router = require('express').Router();
var Post = require('./postModel.js');
var Category = require('../category/categoryModel.js');
var User = require('../user/userModel.js');

// setup boilerplate route jsut to satisfy a request
// for building
router.route('/')
  .get(function(req, res){
    Post
      .find({})
      .populate("categories")
      .exec(function(err, posts) {
        res.send({success: true, posts: posts});
      });
  })
  .post(function(req, res, next) {
    User.findOne({username: req.body.author}, function(err, user) {
      if (err) return next(err);
      if (!user) return next("No such user");

      Category.find({$or: req.body.categories.map(function(name) {
        return {name: name}
      })}, function(err, cats) {
        if (req.body.categories.length == 0) cats = [];
        if (err && req.body.categories.length != 0) return next(err);
        if (cats.length != req.body.categories.length) return next("Couldn't find all categories.");

        Post.create({
          title: req.body.title,
          text: req.body.text,
          author: user,
          categories: cats,
        }, function(err, user) {
          if (err) return next(err);
          res.send({success: true, user: user});
        });
      });
    });
  });



module.exports = router;
