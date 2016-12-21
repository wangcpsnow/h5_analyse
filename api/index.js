/** 
 * H5站分析引用的文件
 * time: 2016-12-19
 */

var fs = require('fs'),
	config = require("../config"),
	DIR = config.DIR,
	exs = config.exs,
	reg = /require\(['"](.*?)['"]\)/gi;

function main(dir = DIR + "/conf") {
	var files = fs.readdirSync(dir);
	var result = {};
	files.forEach(function(file) {
		var file_path = dir + "/" + file,
			stats = fs.statSync(file_path);
		if (stats.isDirectory()) {
			result[file] = main(file_path);
		} else {
			var file_data = fs.readFileSync(file_path, "utf-8"),
				res = [];
			while (r = reg.exec(file_data)) {
				res.push(r[1]);
			}
			result[file] = {};
			result[file]["requires"] = res;
			result[file]["filesize"] = Math.ceil(stats.size / 1024) + "K";
		}
	});
	return result;
}

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
		// console.log("123")
		var file_path = dir + "/" + file,
			stats = fs.statSync(file_path),
			path = relys ? relys + "/" + file : file;
		if (stats.isDirectory()) {
			results = results.concat(utils(file_path, path));
		} else {
			relys && results.push(path);
		}
	});
	return results;
}

// module.exports = function() {
// 	return main();
// }

module.exports = {
	core: main,
	utils: utils
}