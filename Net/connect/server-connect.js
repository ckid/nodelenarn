var connect = require('connect');

/*
* ����������
*/

var server = connect.createServer();

// ����̬�ļ�

server.use(connect.static(__dirname + '/website'));


server.listen(3000);