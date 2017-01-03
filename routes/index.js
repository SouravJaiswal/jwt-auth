var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config/index');
var passport = require('passport');

var user = {
  email : "sourav@hotmail.com",
  password : "1234"
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',function(req, res, next){
  if(req.body.email == user.email && req.body.password == user.password){
    var token = jwt.sign(user, config.jwtSecret, {
      expiresIn : 10080
    });
    res.json({status : '200', token : 'JWT ' + token});
  }else{
    res.json({status : '999', token : false});
  }
});

router.get('/getUser', passport.authenticate('jwt', {session:false}), function(req, res, next){
  res.json(req.user);
});

module.exports = router;
