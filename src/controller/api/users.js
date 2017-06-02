const Users = require('../../models/user');

//user  middle
exports.isLoadin = (req, res, next) => {
    let _user = req.session.user;
    console.log(_user);
    if (_user) {
        res.json(_user.username);
    } else {
        res.json(false);
    };
};

//列表
exports.list = (req, res, next) => {
    Users.find({}).exec().then(users => {
        res.json({ msg: "OK", results: users });
    });
};

//登录
exports.signIn = (req, res, next) => {
    let ctx = req.body;
    try {
        Users.findOne({ username: ctx.username }).exec().then(user => {
            if (user) {
                return Promise.resolve(user);
            } else {
                res.json({ msg: 'not exist' });
            };
        }).then(user => {
            user.comparePassword(ctx.password).then(exist => {
                if (exist) {
                    req.session.user = user;
                    res.json({ msg: 'OK' })
                } else {
                    res.json({ msg: 'sorry your password is worng' });
                };
            });
        });
    } catch (error) {
        console.log(error);
    }
};

//注册
exports.signUp = (req, res, next) => {
    let ctx = req.body;
    let _user = new Users({
        username: ctx.username,
        password: ctx.password
    });
    try {
        Users.findOne({ username: ctx.username }).exec().then(user => {
            if (user) {
                res.json({ msg: "sorry username is exist" })
            } else {
                _user.save().then(data => {
                    res.json({ msg: "OK" });
                });
            }
        })
    } catch (error) {
        console.log(error);
    }
};

/**退出 */
exports.logout = (req, res, next) => {
    delete req.session.user;
    res.json({ msg: "OK" });
}