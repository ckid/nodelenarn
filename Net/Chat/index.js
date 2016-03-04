var net = require("net");

var count = 0;
var users= {};
var server = net.createServer(function(conn){ 
    conn.setEncoding('utf8');
    console.log('\033[90m new connection! \033[39m');
    conn.write('\n > welcome to \033[92mnode-chart \033[39m!'
  + '\n > ' + count + 'other people are connected at this time'
  + '\n > please write you name and press enter >');

    count++;

    var nicknane;
    conn.on('data', function(data){
    console.log(data);
    data = data.replace('\r\n', '');
    if(!nickname){
    	if(user[data]) {
            conn.write("nickname already in user try again：");
	    return;
	} else {
	    nickname = data;
	    users[nickname] = conn;
	    for (var i in users) {
	        users[i].write(nickname + 'join the room');
	    }
	}
    } else {
    	for (var i in users) {
	    users[i].write(nickname + ':' + data +'\n');
	}
    }
    
    }
    conn.on('close', function(){
        count --;
	delete users[nickname];
    }
    
    );

    conn.on('close', function(){
    count--;
    });


    console.log(count);
});

server.listen(3000, function(){
    console.log('\033[96m server listenning on 3000 \033[39m');
});

