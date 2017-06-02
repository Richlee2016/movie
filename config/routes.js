var express = require('express');
var router = express.Router();
var pages = require('../src/controller/pages');
var apiUser = require('../src/controller/api/users');
var apiMovie = require('../src/controller/api/movie');
var apiTest = require('../src/controller/api/test');
/* home apge. */
router.get('/', pages.index); //首页
router.get('/movie', pages.movie); //最爱

/* api. */
//user
router.get('/api/users/list', apiUser.list); //列表
router.post('/api/users/signin', apiUser.signIn); //登录
router.post('/api/users/signup', apiUser.signUp); //注册
router.get('/api/users/isLoadin', apiUser.isLoadin); //验证登录
router.get('/api/users/logout', apiUser.logout); //注销
// router.get('/api/users/movie', require('./spiders.js').movie); //注册
//movies
// router.post('/api/movies/search', apiMovie.movieSearch);
router.get('/api/movies/list', apiMovie.movieList);
router.post('/api/movies/remove', apiMovie.movieRemove);
router.get('/api/movies/search', apiMovie.movieSearch);

//restful api test
router.get('/api/tests', apiTest.get);
router.post('/api/tests', apiTest.post);
router.put('/api/tests', apiTest.put);
router.patch('/api/tests', apiTest.patch);
router.delete('/api/tests', apiTest.delete);

module.exports = router;