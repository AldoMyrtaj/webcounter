var express = require('express');
var app = express();
var redis = require('redis');
var client = redis.createClient(6379,'139.59.128.161'); //creates a new client

var port = 8080;
var userCount;
client.get('count', function (err, reply) {

    if(reply === null){
        userCount = 0;
    } else {
        userCount = reply;
    }

});
app.get('/',function(req,res) {
    userCount++;
    client.set('count', userCount);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello!\n');
    res.write('We have had ' + userCount + ' visits!\n');
    res.end();

});

app.listen(port);
console.log('server running...')

client.on('connect', function() {
    console.log('connected');
});
