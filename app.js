var ejs = require('ejs');
var lactate = require('lactate');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var routers = require("./routers");


app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

//parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({
    extended: false
}));

//parse application/json 
app.use(bodyParser.json());


routers.forEach(function(router) {
    app.use(router);
});

app.use(lactate.static(__dirname + '/static'));

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});