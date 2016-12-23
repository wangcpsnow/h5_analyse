/**
 * title: 遍历目录下所有引用的文件以及文件大小
 * ctime: 2016-12-23
 */
let fs = require('fs'),
	config = require("../config"),
	DIR = config.DIR,
	reg = /require\(['"](.*?)['"]\)/gi;


function main(dir = DIR + "/conf") {
	let files = fs.readdirSync(dir);
	let result = {};
	files.forEach(function(file) {
		let file_path = dir + "/" + file,
			stats = fs.statSync(file_path);
		if (stats.isDirectory()) {
			result[file] = main(file_path);
		} else {
			let file_data = fs.readFileSync(file_path, "utf-8"),
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

module.exports = main;