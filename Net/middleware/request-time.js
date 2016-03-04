/**
 * Created by ckid on 2016/3/2.
 */

module.exports = function(opts) {
    //请求时间  默认100毫秒
    var time = opts || 100;
    return function (req, res, next) {
        var timer = setTimeout(function () {
            console.log('taking too long time', res.method, res.url);
        }, time);
        var end = res.end;
        res.end = function(chuck, encoding) {
            res.end = end;
            res.end(chuck, encoding);
            clearTimeout(timer);
        };
        next();
    };


};