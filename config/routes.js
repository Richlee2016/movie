var express = require('express');
var router = express.Router();
var pages = require('../src/controller/pages');
var apiUser = require('../src/controller/api/users');
var apiMovie = require('../src/controller/api/movie');
/* home apge. */
router.get('/', pages.index); //首页
router.get('/favorite', pages.favorite); //最爱

/* admin page. */
router.get('/admin/users/list', pages.adminUserList); //admin user list page


/* api. */
//user
router.get('/api/users/list', apiUser.list); //列表
router.post('/api/users/signin', apiUser.signIn); //登录
router.post('/api/users/signup', apiUser.signUp); //注册
// router.get('/api/users/movie', require('./spiders.js').movie); //注册
//movies
// router.post('/api/movies/search', apiMovie.movieSearch);
router.get('/api/movies/list', apiMovie.movieList);
router.post('/api/movies/remove', apiMovie.movieRemove);
router.get('/api/movies/search', apiMovie.movieSearch);
//test
// router.get('/book', pages.book);
// router.get('/chapter/:id', apiMovie.bookSearch, apiMovie.chapter);
// router.get('/read/:id', apiMovie.read);
module.exports = router;