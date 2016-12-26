/**
 * title: 引用了公共组建，但是没使用
 * ctime: 2016-12-26
 */
 
 import React from "react"

 class UnUse extends React.Component{
 	constructor(props) {
 		super(props);
 	}
 	componentWillMount() {
 		this._load_data();
 	}
 	_load_data() {
 		var self = this;
 		new Promise((resolve,reject)=> {
 			$.ajax({
 				url: "/api/check",type: "GET",
 				success: function(data) {
 					resolve(data);
 				}
 			});
 		})
 		.then((data)=> {
 			$("#checks ul").html(self._show(data,""));
 		})
 		.catch(()=>{

 		});
 	}
 	_show(obj,prefix) {
 		var res = "";
        for (var key in obj) {
            if (Array.isArray(obj[key]) && obj[key].length) {
                res += "<li>" + prefix + key + ":" + obj[key].join(",") + "</li>"
            } else {
                res += this._show(obj[key], prefix + key + "/");
            }
        }
        return res;
 	}
 	render() {
 		return (
 			<div id="checks">
 				<ul></ul>
 			</div>
 		)
 	}
 };

 module.exports = UnUse;