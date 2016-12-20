var express = require('express'),
	router = express.Router();

var api = require("./api.js"),
	view = require("./view.js");

module.exports = [
	api(router),
	view(router)
];