require('http').createServer(function(req, res){
    res.writeHead( 200, {'content-Type': 'text/html'});
    res.end('<h1>Hello World! </h1>');
}).listen(3000);
