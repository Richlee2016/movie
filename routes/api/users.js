const express = require('express');
const router = express.Router();
const Users = require('../../mongoose/models/user');

/* GET home page. */
router.get('/list', function(req, res, next) {
    res.render('index/index', { title: 'Express' });
});

router.post('/signin', function(req, res, next) {
    let ctx = req.body;
    Users.findOne({ username: ctx.username }).exec()
    .then( user => {
        if(user){
            isUser.comparePassword(ctx.password)
            .then(exist => {
                    if (exist) {
                        res.json({msg:"welcome rich's home"});
                    } else {
                        res.json({msg:'sorry your password is worng'});
                    };
                })
                .catch(err => {
                    console.log(err);
                });
            
        }else{
            res.json({msg:'not exist'});
        };
    })
    .catch(err => {
        console.log(err);
    })
});

router.post('/signup', function(req, res, next) {
     let ctx = req.body;
     let _user = new Users({
        username: ctx.username,
        password: ctx.password
     });
     try {
        Users.findOne({username:ctx.username}).exec()
        .then(user => {
            if(user){
                res.json({msg:"sorry username is exist"})
            }else{
                _user.save()
                .then(data => {
                    res.json({msg:"OK"});
                });
            }
        })
     } catch (error) {
         console.log(error);
     }
   
});



module.exports = router;