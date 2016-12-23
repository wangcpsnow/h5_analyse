/**
 * 
 */
var API = require("../api");

module.exports = function(Router) {
	Router.get("/", function(req, res, next) {
		res.render("index",{
			data: API.core(),
			utils: API.utils(),
			checks: API.check()
		});
	});
	return Router;
}