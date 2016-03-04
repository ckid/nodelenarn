/**
 * Created by ckid on 2016/3/2.
 */
var connect = require('connect');

var users = require('./user');

var server = connect(
    connect.logger('dev'),
    connect.bodyParser(),
    connect.cookieParser(),
    connect.session({secret: 'baili'}),
    //检查用户是否登陆
    function(req, res, next) {
        if ('/' == req.url && req.session.logged_in) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('Welcome back!' + '<b>' + req.session.name + '</b>' + "<a href='/logout'>Logout</a>");

        } else {
            next();
        }
    },

    //登陆表单

    function(req, res, next) {
        if('/' == req.url && 'GET' == req.method) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(
                ['<form action="/login" method="POST">',
                '<fieldset>' ,
                '<legend>Please log in</legend>',
                    '<p>User:<input type="text" name="name"></p>',
                    '<p>Password:<input type="password" name="password"></p>',
                    '<button>Submit</button>',
                    '</fieldset>',
                    '</form>'
                ].join('')
            );
        } else {
            next();
        }
    },

    function(req, res, next) {
        if ('/login' == req.url && 'POST' == req.method) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            if (!users[req.body.user] || req.body.password != users[req.body.password]){
                res.end('Bad username/password');
            } else {
                req.session.logged_in = true;
                req.session.name = users[req.body.user].name;
                req.end('authenticated');
            }
        } else {
            next();
        }

    },
    function(req, res, next) {
        if ('/logout' == req.url) {
            req.session.logged_in = false;
            res.writeHead(200);
            res.end('Logout!')
        } else {
            next();
        }
    }
);


