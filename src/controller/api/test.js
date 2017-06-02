exports.get = function(req, res, next) {
    res.json({ msg: 'get' });
}

exports.post = function(req, res, next) {
    res.json({ msg: 'post' });
}

exports.put = function(req, res, next) {
    res.json({ msg: 'put' });
}

exports.patch = function(req, res, next) {
    res.json({ msg: 'patch' });
}

exports.delete = function(req, res, next) {
    res.json({ msg: 'delete' });
}