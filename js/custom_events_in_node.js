//this js is just for playing with eventEmitters...

var events = require('events'),
event_emitter = new events.EventEmitter(),
connect_handler = function(){
	console.log('connection successful');
	event_emitter.emit('data_recieved');
};

event_emitter.on('connection',connect_handler);

event_emitter.on('data_recieved',function(){
	console.log('dat recieved successfully');
});

event_emitter.emit('connection');

console.log('program ended');

