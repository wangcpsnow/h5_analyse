/**
 * [exports description]
 * @param  {[type]} Router [description]
 * @return {[type]}        [description]
 */
var api = require("../api");

module.exports = function(Router) {
	Router.get("/api/all", function(req, res, next) {
		res.json(api());
	});
	return Router;
}