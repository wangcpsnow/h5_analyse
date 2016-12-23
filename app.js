var ejs = require('ejs');
var lactate = require('lactate');
var bodyParser = require('body-parser');
var express = require('express');
var config = require('./webpack.config')
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

var app = express();

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

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

app.use(lactate.static(__dirname + '/dist'));

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});