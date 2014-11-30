var http = require('http');
var express = require('express');
var app = express();var Parse = require('parse').Parse;


var jsonObject = JSON.parse(data);
var speedx = jsonObject.x;
var speedy = jsonObject.y;
var speedz = jsonObject.z;

var update = function(speedx, speedy, speedz){
	if (speedz > 0){
		client.front(speedz);
		console.log('front', speedz);
	}
	else{
		client.back(-1*speedz);
		console.log('back', speedz);
	};
	if (speedy > 0){
		client.up(speedy);
	}
	else{
		client.down(-1*speedy);
	}
	if (speedx > 0){
		client.right(speedx);
	}
	else{
		client.left(-1*speedx);
	}
	fs.writeFile(speedx, speedy, speedz, function(err) {
    if(err) {
        console.log(err);
    } 
	else {
        console.log("The file was saved!");
    };
}); 
};


var speedx = 0.0
var speedy = 0.0
var speedz = 0.0

var fs = require('fs');

var handle = function(req, res){
	if(req.url === '/up'){
		console.log('going up');
		if (speedy !== 0.5){
			speedy += 0.1
		};

	}
	else if(req.url === '/down'){
		console.log('going down');
		if (speedy !== -0.5){
			speedy -= 0.1
		};

	}
	else if(req.url === '/left'){
		console.log('going left');
		if (speedx !== -0.5){
			speedx -= 0.1
		};

	}
	else if(req.url === '/right'){
		console.log('going right');
		if (speedx !== 0.5){
			speedx += 0.1
		};

	}
	else if(req.url === '/front'){
		console.log('going forward');
		if (speedz !== 0.5){
			speedz += 0.1
		};
	}
	else if(req.url === '/back'){
		console.log('going backwards');
		if (speedz !== -0.5){
			speedz -= 0.1
		};
	}
	if(req.url === '/start'){
		console.log('starting');
		t();
		client.takeoff();
		client
		  .after(6000, function() {
			t();
		  });
	}
	else if(req.url === '/land'){
		console.log('landing');
		st();
		client
		  .after(0000, function() {
			this.stop();
			this.land();
		  });
	}
	else if(req.url === '/tem'){
		control.ref({fly: true, emergency: false});
	}
	update(speedx, speedy, speedz);
//	res.send({"x": speedx, "y": speedy, "z": speedz})
	res.writeHead(200, {"Content-Type": "text/json"});
	res.write(JSON.stringify({"x": speedx, "y": speedy, "z": speedz}));
	res.end();
};

/*fs.writefile('command.txt',{
			'speedx':speedx,
			'speedy':speedy,
			'speedz':speedz,
	}, function(err){
		if (err) throw err;
		console.log('calm down');
	}
);*/

http.createServer(handle).listen(80);
