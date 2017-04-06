var express = require('express');
var router = express.Router();

var app = require('../app');

var users = require('./api/users');
/* GET home page. */
app.get('/', function(req, res, next) {
    res.render('index/index', { title: 'Express' });
});

//api 路由

router.use('/api/users', function(req, res, next) {
  return 
  next();
});
// module.exports = router;