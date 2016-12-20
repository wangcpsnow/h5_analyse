/** 
 * H5站分析引用的文件
 * time: 2016-12-19
 */

var fs = require('fs'),
	config = require("../config"),
	DIR = config.DIR,
	reg = /require\(['"](.*?)['"]\)/gi;

function main(dir = DIR) {
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

module.exports = function() {
	return main();
}