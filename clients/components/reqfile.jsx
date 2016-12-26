/**
 * title: 一次也没被引用的文件
 * author: wangchunpeng
 */
import React from "react";

class ReqFile extends React.Component{
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		new Promise((resolve,reject)=> {
			$.ajax({
				url: "/api/all",
				type: "GET",
				success: function(data) {
					resolve(data);
				},
				error: function() {
					reject();
				}
			});
		}).then((data)=>{

		}).catch(()=>{

		});
	}
	render() {
		return (
			<div>
				ReqFile
			</div>
		);
	}
};

module.exports = ReqFile;