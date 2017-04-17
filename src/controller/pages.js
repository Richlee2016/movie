/* GET home page. */

/* index */
exports.index = function(req, res, next) {
    res.render('home/index', { title: 'Express' });
};

//favorite
exports.favorite = function(req, res, next) {
    res.render('home/movie/movie', { title: 'Express' });
};



/* home */



/* admin */
//users
exports.adminUserList = function(req, res, next) {
    res.render('admin/users/list', { title: 'Express' });
};