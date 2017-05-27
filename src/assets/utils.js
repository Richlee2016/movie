const iconv = require('iconv-lite');

const markReg = (str) => /\"(.*)\"/g.exec(str)[1];
const encodeGbk = (str) => {
    var buffer = new Buffer(str);
    return iconv.decode(buffer, 'GBK');
}

let chinese2Gb2312 = function(data) {
    let pad = function(number, length, pos) {
        var str = "%" + number;
        while (str.length < length) {
            //向右边补0
            if ("r" == pos) {
                str = str + "0";
            } else {
                str = "0" + str;
            }
        }
        return str;
    }
    let toHex = function(chr, padLen) {
        if (null == padLen) {
            padLen = 2;
        }
        return pad(chr.toString(16), padLen);
    }

    var gb2312 = iconv.encode(data.toString('UCS2'), 'GB2312');
    var gb2312Hex = "";
    for (var i = 0; i < gb2312.length; ++i) {
        gb2312Hex += toHex(gb2312[i]);
    }
    return gb2312Hex.toUpperCase();
}


let encode = function(str) {
    var buf = [];

    for (var i = str.length - 1; i >= 0; i--) {
        buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
    }

    return buf.join('');
};

let decode = function(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
    });
}

let doCookie = {
    setCookie(name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

        if (arr = document.cookie.match(reg))

            return unescape(arr[2]);
        else
            return null;
    },
    delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    time: {
        setCookie(name, value, time) {
            var strsec = getsec(time);
            var exp = new Date();
            exp.setTime(exp.getTime() + strsec * 1);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        },
        getsec(str) {
            var str1 = str.substring(1, str.length) * 1;
            var str2 = str.substring(0, 1);
            if (str2 == "s") {
                return str1 * 1000;
            } else if (str2 == "h") {
                return str1 * 60 * 60 * 1000;
            } else if (str2 == "d") {
                return str1 * 24 * 60 * 60 * 1000;
            }
        }
    }
}


module.exports = {
    chinese2Gb2312: chinese2Gb2312,
    encode: encode,
    decode: decode,
    setCookie: doCookie.doCookie,
    getCookie: doCookie.getCookie,
    delCookie: doCookie.delCookie,
    setCookieTime: doCookie.time.setCookie,
    getCookieTime: doCookie.time.getCookie

}