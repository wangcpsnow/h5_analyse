let fs = require("fs"),
    config = require("../config"),
    DIR = config.DIR,
    reg = /\s*(\S*?)\s*=\s*require\(.*?\)/gi;

function check(dir = DIR) {
    let result = {};
    let files = fs.readdirSync(dir);
    files.forEach(function(file) {
        let file_path = dir + "/" + file,
            stats = fs.statSync(file_path);
        if (stats.isDirectory()) {
            result[file] = check(file_path);
        } else {
            let filedata = fs.readFileSync(file_path, "utf-8");
            while (res = reg.exec(filedata)) {
                if (res[1] != "$" && filedata.indexOf(res[1] + ".") < 0) {
                	if(filedata.indexOf(res[1] + "(") > 0){
                		continue;
                	}
                    result[file] = result[file] || [];
                    result[file].push(res[1]);
                }
            }
        }
    });
    return result;
}

module.exports = check;
