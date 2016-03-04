/**
 *
 * Created by ckid on 2016/3/2.
 */

var connect = require('connect');
var time = require('./request-time');


var server = connect.createServer();

server.use(connect.logger('dev'));

server.use(time({time: 100}));

server.use(function (req, res, next) {
    if ('/a' == req.url) {
        res.writeHead(200);
        res.end('Fast');
    } else {
        next();
    }
});


server.use(function(req, res, next) {
   if ('/b' == req.url) {
       setTimeout(function () {
           res.writeHead(200);
           res.end('Slow');
       }, 1000);
   } else {
       next();
   }
});


server.listen(3000);