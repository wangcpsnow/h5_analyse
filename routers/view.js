/**
 * 
 */
var api = require("../api");

module.exports = function(Router) {
	Router.get("/", function(req, res, next) {
		res.render("index",{
			data: api()
		});
	});
	return Router;
}