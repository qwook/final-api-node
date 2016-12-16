var router = require('express').Router();
var User = require('./userModel.js');

// setup boilerplate route jsut to satisfy a request
// for building

//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.
router.route('/')
  .get(function(req, res){
    User.find({}, function(err, users) {
      res.send({success: true, users: users});
    })
  })
  .post(function(req, res, next) {
    User.create({
      username: req.body.username
    }, function(err, user) {
      if (err) return next(err);
      res.send({success: true, user: user});
    });
  });

router.route('/:user_id')
  .get(function(req, res){
    
  })

router.get('/err', function(req, res){
  console.log("hey");
  throw "ERROR!!";
});

module.exports = router;
