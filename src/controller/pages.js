/* GET home page. */
/* index */
exports.index = function(req, res, next) {
    res.render('index/index', { title: 'Express' });
};

//favorite
exports.favorite = function(req, res, next) {
    res.render('index/movie/movie', { title: 'Express' });
};



/* home */



/* admin */
//users
exports.adminUserList = function(req, res, next) {
    res.render('admin/users/list', { title: 'Express' });
};