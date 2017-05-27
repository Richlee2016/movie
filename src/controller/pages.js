/* GET home page. */



/* index */
exports.index = function(req, res, next) {
    res.render('index', { title: 'Express' });
};


//movie
exports.movie = function(req, res, next) {
    var _user = req.session.user;

    res.render('movie/movie', { title: 'Express' });
};