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
exports.moviego = function(req,res,next){
    getInfo(movieUrl(23057))
    .then( $ => {
        var main = $('#main');
        var info = $('.info ul li');
        // console.log($('.info ul li').eq(0).text());
        // var classify = info.eq(1).find('a').get().map( o => $(o).text());
        // var actor = info.eq(2).find('a').get().map( o => $(o).text());

        //url 解析
        const getUrl = () => {
            let urlArr = [];
            $('.mox').get().forEach( (o,i) => {
                if($(o).find('.down_list').get().length === 1){
                    var res = $(o).find('.down_list li').get().map( (o,j) => {
                        return {
                            num:j,
                            title:$(o).find('.down_part_name a').text(),
                            url:$(o).find('.down_url').val(),
                            size:$(o).find('.file-size').text(),
                            ed2k:0
                        }
                    })
                    urlArr.push(res);
                };
            })
            return urlArr;
        }

        //info 解析
        const getInfo = () => {
            let firstLabel = info.eq(0).find('span').eq(0).text();
            let infoRes;
            //冒号 正则
            let regChina = (str) => {
                let reg = /：([\u4e00-\u9fa5]+)/g;
                return reg.exec(str);
            }

            //连续剧
            if( firstLabel === '更新状态：' ){
                infoRes = {
                    total:regChina(info.eq(0).text())[1],
                    year:info.eq(1).text(),
                    classify:info.eq(2).find('a').get().map( o => $(o).text()),
                    actor:info.eq(3).find('a').get().map( o => $(o).text()),
                    director:info.eq(4).find('a').get().map( o => $(o).text()),
                    othername:info.eq(5).text(),
                    imdb:0,
                    intro:main.find('.endtext').text()
                }
            //电影    
            }else if(firstLabel === '上映年代：'){
                infoRes = {
                    total:1,
                    year:info.eq(0).text(),
                    classify:info.eq(1).find('a').get().map( o => $(o).text()),
                    actor:info.eq(2).find('a').get().map( o => $(o).text()),
                    director:info.eq(3).find('a').get().map( o => $(o).text()),
                    othername:info.eq(4).text(),
                    imdb:info.eq(5).find('span').eq(1).text(),
                    intro:main.find('.endtext').text()
                }
            };
            return infoRes;
        }
        
        var mymovie = {
            id:num,
            name:$('#name').text(),
            catalog:main.find('.location a').get().map( o => $(o).text()),
            score:0,
            classify:getInfo().classify,
            actor:getInfo().actor,
            director:getInfo().director,
            year:getInfo().year,
            url:getUrl(),
            details:{
                area:0,
                intro:getInfo().intro,
                othername:getInfo().othername,
                img:main.find('.pic img').attr('src'),
                total:getInfo().total,
                imdb:getInfo().imdb
            }
        }
        // var movie = new Movie(mymovie);
        // console.log(mymovie);
        return Promise.resolve(mymovie);
    })
    .then( movie => {
        console.log(movie);
        res.send(movie);
    })

};