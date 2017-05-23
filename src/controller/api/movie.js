const Movies = require('../../models/movies');
const request = require('request-promise');
const cheerio = require('cheerio');
const douban = 'https://api.douban.com';
// const moviehome = 
const config = {
    search: douban + '/v2/movie/search?q='
}

//电影豆瓣查询(豆瓣信息查询,电影家园进行迅雷地址爬取)
exports.movieSearch = function(req, res, next) {
    // let ctx = req.body;
    request({
            method: 'GET',
            uri: config.search + encodeURI('火鸟出击'),
            json: true
        })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
        })
};


//list
exports.movieList = function(req, res, next){
    let page = Number(req.query.page),
        pageSize = Number(req.query.pageSize)
    let skip = ( page - 1)*pageSize;
    Movies.count({'name':{'$ne':'none'}})
    .then( count => {
        Movies.find({'name':{'$ne':'none'}}).limit(pageSize).skip(skip)
        .then( list => {
            console.log(count);
            res.json({list:list,total:count});
        })
        .catch( err => {
            console.log(err);
        } )
    })
}

exports.movieRemove = function(req,res,next){
    var id = req.body.id;
    Movies.remove({_id:id},function(err,movie){
        if(err) console.log(err);
        if(movie){
            console.log('delete');
            res.json({msg:'OK'})
        }
    });
};

