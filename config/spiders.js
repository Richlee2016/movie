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

// let num = 23273; //电视剧 完结 人民的名义
// let num = 23419; //电视剧 未完结  
// let num = 23057; //电影 
let num = 1;
exports.movie = function(){
    function start(){
        getInfo(movieUrl(num))
        .then( $ => {
            var main = $('#main');

            if($('#main').get().length === 0){
                return Promise.resolve({
                    id:num,
                    name:'none'
                });
            };
            var info = $('.info ul li');
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
                let regNum = str => str.match(/\d+/)[0];
                let regChin = str => str.match(/([\u4e00-\u9fa5]+)/g);
                let resultArr = dom => dom.find('a').get().map( o => $(o).text())
                let otherName = str => str.slice(3,str.length);
                //连续剧
                if( firstLabel === '更新状态：' || firstLabel === '更新至：'){
                    //完结设置
                    let isFinish = true;
                    if(regChin(info.eq(0).text())[1] !== '全集可下载'){
                        isFinish = false;
                    };

                    infoRes = {
                        isFinish:isFinish,
                        year:regNum(info.eq(1).text()),
                        area:regChin(info.eq(1).text())[2],
                        classify:resultArr(info.eq(2)),
                        director:resultArr(info.eq(3)),
                        actor:resultArr(info.eq(4)),
                        othername:otherName(info.eq(5).text()),
                        imdb:'none',
                        intro:main.find('.endtext').text()
                    }
                //电影    
            }else if(firstLabel === '上映年代：'){

                    infoRes = {
                        isFinish:true,
                        year:regNum(info.eq(0).text()),
                        area:regChin(info.eq(0).text())[2],
                        classify:resultArr(info.eq(1)),
                        director:resultArr(info.eq(2)),
                        actor:resultArr(info.eq(3)),
                        othername:otherName(info.eq(4).text()),
                        imdb:info.eq(5).find('span').eq(1).text(),
                        intro:main.find('.endtext').text()
                    }
                };
                return infoRes;
            }

            //解析
            var myInfo = getInfo();
            var mymovie = {
                id:num,
                name:$('#name').text(),
                catalog:main.find('.location a').get().map( o => $(o).text()),
                score:0,
                classify:myInfo.classify,
                actor:myInfo.actor,
                director:myInfo.director,
                year:myInfo.year,
                url:getUrl(),
                isFinish:myInfo.isFinish,
                details:{
                    area:myInfo.area,
                    intro:myInfo.intro,
                    othername:myInfo.othername,
                    img:main.find('.pic img').attr('src'),
                    imdb:myInfo.imdb
                }
            }
            return Promise.resolve(mymovie);
        })
        .then( movie => {
            var _movie = new Movie(movie);
            _movie.save().then(data => {
                setTimeout(function(){
                    num++;
                    if(num < 50 ){
                        start();
                    };
                },3000);
            });
        })
    }
    start();
};