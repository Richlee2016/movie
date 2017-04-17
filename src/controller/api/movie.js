const Users = require('../../models/movies');
const request = require('request-promise');
const cheerio = require('cheerio');
const douban = 'https://api.douban.com';
// const moviehome = 
const config = {
    search: douban + '/v2/movie/search?q='
}
const textUTF8 = function(text) {
        return unescape(text.replace(/&#x/g, '%u').replace(/;/g, '').replace(/%uA0/g, ' '));
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
    chapter: prefix + '/html/143/143021/',
    text: prefix + '/html/143/143021/'
}

//test
exports.book = function(req, res, next) {
    request({
            method: 'GET',
            uri: movieSrc.chapter,
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
            res.render('index', { data: chapter, title: "rich" });
        })
        .catch(err => {
            console.log(err);
        })
};
exports.read = function(req, res, next) {
    var chapter = req.params.id;
    request({
            method: 'GET',
            uri: movieSrc.text + chapter,
            json: true
        })
        .then(data => {
            var $ = cheerio.load(data);
            var text = $("#content").text();
            res.json({ data: text });
        })
        .catch(err => {
            console.log(err);
        })
};