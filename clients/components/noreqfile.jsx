/**
 * title: 一次也没被引用的文件
 * author: wangchunpeng
 */
import React from "react";

class NoReqFile extends React.Component{
	componentWillMount() {
		let self = this;
		new Promise((resolve,reject)=> {
			let data_all,
				data_utils;
			$.ajax({
				url: "/api/all",
				type: "GET",
				success: function(data) {
					data_all = data;
					callback();
				},
				error: function() {
					reject();
				}
			});
			$.ajax({
				url: "/api/utils",type: "GET",
				success: (data)=> {
					data_utils = data;
					callback();
				},
				error: ()=> {
					reject();
				}
			});
			function callback() {
				if(data_all && data_utils){
					resolve({data_all,data_utils});
				}
			}
		})
		.then((obj)=> {
			let results = Object.keys(self._co_alldata(obj.data_all)),
				arr = [];
			obj.data_utils.forEach(function(util) {
	            util = util.replace(".js", "");
	            results.includes(util) || arr.push(util);
	        });
	        var $ul = $("#utils ul");
	        arr.forEach(function(item) {
	            $ul.append("<li>" + item + "</li>")
	        })
		})
		.catch(()=> {

		});
	}
	_co_alldata($data) {
        var results = {};
        for (var $classify in $data) {
            for (var $item in $data[$classify]) {
                var requires = $data[$classify][$item].requires || [];
                requires.forEach(function(re) {
                    re = re.replace(".js", "");
                    results[re] = results[re] ? (results[re] + 1) : 1;
                });
            }
        }
        return results;
	}
	render() {
		return (
			<div id="utils">
				<h2 className="center"></h2>
				<ul></ul>
			</div>
		);
	}
};

module.exports = NoReqFile;