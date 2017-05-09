const Movie = require('../src/models/movies');
const utils = require('../src/assets/utils');
const install = require('superagent-charset');
const request = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
//注入能够解码的superagent
const movieUrl = (num) => `http://www.idyjy.com/sub/${num}.html`;
const superagent = install(request);
var getInfo = function(url) {
    return new Promise((resolve, reject) => {
        superagent.get(url).charset('gb2312').end(function(err, res) {
            if (err) {
                reject(err);
            }
            var $ = cheerio.load(res.text, { decodeEntities: false });
            resolve($);
        });
    })
};

let num = 0;
exports.movie = function(){
    getInfo(movieUrl(23336))
    .then( $ => {
        var main = $('#main');
        var info = $('.info ul li');
        console.log(movieUrl(23336));
        // console.log($('.info ul li').eq(0).text());
        // var classify = info.eq(1).find('a').get().map( o => $(o).text());
        // var actor = info.eq(2).find('a').get().map( o => $(o).text());
        console.log($('.mox').get().length);
        var urlArr = [];
        $('.mox').get().forEach( (o,i) => {
            if($(o).find('.down_list').get().length === 1){
                console.log($(o).find('.title h3').text());
                // console.log($(o).find('.title h3'));
                var res = $(o).find('.down_list li').get().map( (o,j) => {
                    return {
                        num:j,
                        title:$(o).find('.down_part_name a').text(),
                        url:$(o).find('.down_url').val(),
                        ed2k:0
                    }
                })
                urlArr.push(res);
            };
        })
        console.log(urlArr);
        // var mymovie = {
        //     id:num,
        //     name:$('#name').text(),
        //     score:main.find('filmStarScore').text(),
        //     classify:info.eq(1).find('a').get().map( o => $(o).text()),
        //     catalog:main.find('.location a').get().map( o => $(o).text()),
        //     actor:info.eq(2).find('a').get().map( o => $(o).text()),
        //     director:info.eq(3).find('a').get().map( o => $(o).text()),
        //     year:0,
        //     url:[
        //         [{
        //             num:0,
        //             title:0,
        //             thunder:0,
        //             ed2k:0,
        //         }]
        //     ],
        //     details:{
        //         area:0,
        //         intro:0,
        //         othername:0,
        //         img:main.find('.pic img').attr('src'),
        //         total:Number,
        //         imdb:String
        //     }
        // }
        // var movie = new Movie(mymovie);
        // return Promise.resolve(movie);
    })
};