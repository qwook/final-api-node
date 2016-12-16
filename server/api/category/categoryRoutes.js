
var router = require('express').Router();
var Category = require('./categoryModel.js');

router.route('/')
  .get(function(req, res){
    console.log('hey from category');
    res.send({ok: true});
  });

module.exports = router;