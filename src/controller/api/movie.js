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
    let ctx = req.body;
    request({
            method: 'GET',
            uri: config.search + encodeURI(ctx.key),
            json: true
        })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
        })
};

//电影收藏
//小说free
const prefix = 'http://www.23us.cc';
var movieSrc = {
    search: 'http://zhannei.baidu.com/cse/search?s=1682272515249779940&entry=1&q=',
    book: {},
    chapter: [],
    text: ""
}

//test
exports.bookSearch = function(req, res, next) {
    console.log(req.params);
    request({
            method: 'GET',
            uri: movieSrc.search + encodeURI(req.params.id),
            json: true
        })
        .then(data => {
            var $ = cheerio.load(data);
            var bookDom = $('.result-item').eq(0).find('.result-game-item-detail a');
            var result = {
                href: bookDom.attr('href'),
                title: bookDom.attr('title')
            }

            if (req.params.id === result.title) {
                req.book = result;
                movieSrc.book = result;
                // return Promise.resolve(result);
            } else {
                console.log('do not have this book');
            };
            next();
        })
        .catch(err => {
            console.log(err);
        })
}


exports.chapter = function(req, res, next) {
    var href = req.book.href;
    request({
            method: 'GET',
            uri: href,
            json: true
        })
        .then(data => {
            var $ = cheerio.load(data);
            var chapterDom = $('.chapterlist dd a').get();
            var chapter = chapterDom.map(function(o) {
                return {
                    href: $(o).attr('href'),
                    text: $(o).text()
                }
            });
            res.json({ data: chapter });
        })
        .catch(err => {
            console.log(err);
        })
};
exports.read = function(req, res, next) {
    var chapter = req.params.id;
    request({
            method: 'GET',
            uri: movieSrc.book.href + chapter,
            json: true
        })
        .then(data => {
            var $ = cheerio.load(data);
            var text = $("#content").text();
            var reg = /\S+/g;
            var result = text.match(reg);
            res.json({ data: result });
        })
        .catch(err => {
            console.log(err);
        })
};

//list
exports.movieList = function(req, res, next){
    Movies.find({},function(err,list){
        if(err) console.log(err);
        res.json({list:list});
    })
}
