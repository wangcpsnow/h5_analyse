/**
 * [exports description]
 * @param  {[type]} Router [description]
 * @return {[type]}        [description]
 */
var API = require("../api");

module.exports = function(Router) {
	Router.get("/api/all", function(req, res, next) {
		res.json(API.core());
	});
	Router.get("/api/utils", function(req, res, next) {
		res.json(API.utils());
	});
	Router.get("/api/check", function(req, res, next) {
		res.json(API.check());
	});
	return Router;
}