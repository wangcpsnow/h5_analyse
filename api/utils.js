/**
 * title: 查询所有的可依赖模块
 * ctime: 2016-12-23
 */
let fs = require("fs"),
	config = require("../config"),
	DIR = config.DIR,
	exs = config.exs;

/**
 * [utils description]
 * @param  {[type]} dir   [description] 访问的目录
 * @param  {String} relys [description] 依赖的
 * @return {[type]}       [description] 所有公共文件数组
 */
function utils(dir = DIR, relys = "") {
	var files = fs.readdirSync(dir),
		results = [];
	files.forEach(function(file) {
		if (exs.includes(file)) {
			return;
		}
		var file_path = dir + "/" + file,
			stats = fs.statSync(file_path),
			path = relys ? relys + "/" + file : file;
		if (stats.isDirectory()) {
			results = results.concat(utils(file_path, path));
		} else {
			relys && path.indexOf(".js") > 0 && results.push(path);
		}
	});
	return results;
}

module.exports = utils;