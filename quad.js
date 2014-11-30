var http = require('http');
var express = require('express');
var app = express();
app.get('/blah', function(req, res){
	res.send('blah');
});


app.net.listen('quadofawesome.herokuapp.com', function(){
	console.log('testing');
});

var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var control = arDrone.createUdpControl();

var speedx = 0.0
var speedy = 0.0
var speedz = 0.0

var update = function(){
	if (speedz > 0){
		client.front(speedz);
		console.log('front', speedz);
	}
	else{
		client.back(-1*speedz);
		console.log('back', speedz);
	};
	if (speedy > 0){
		client.up(speedy)
		console.log('up', speedy);
	}
	else{
		client.down(-1*speedy)
		console.log('down', speedy)
	}
	if (speedx > 0){
		client.right(speedx)
		console.log('right', speedx);
	}
	else{
		client.left(-1*speedx)
		console.log('left', speedx);
	};
};

var t = function(){
	setInterval(update,5000)
	console.log('testing')
	};
var st = function(){
	clearInterval(t);
	console.log('stopping');
};

var handle = function(req, res){
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
	else if(req.url === '/up'){
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
};

http.net.listen('quadofawesome.herokuapp.com');

