const Users = require('../../models/movies');
const request = require('request-promise');
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


// Cookie:ll="118282"; bid=nD6gp8t_fIE; __utma=30149280.386147781.1490677563.1490865944.1491038960.3; __utmz=30149280.1491038960.3.3.utmcsr=baidu.com|utmccn=(referral)|utmcmd=referral|utmcct=/; _vwo_uuid_v2=3B83A259C44FAF28BE27F9925A2DB138|2fd3f096f5cb61ff88e873b9e48e9f1c


//电影收藏