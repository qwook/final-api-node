var router = require('express').Router();
var Post = require('./postModel.js');

// setup boilerplate route jsut to satisfy a request
// for building
router.route('/')
  .get(function(req, res){
    Post.find({}, function(err, posts) {
      res.send({success: true, posts: posts});
    })
  })
  .post(function(req, res, next) {
    Post.create({
      username: req.body.username
    }, function(err, user) {
      if (err) return next(err);
      res.send({success: true, user: user});
    });
  });



module.exports = router;
