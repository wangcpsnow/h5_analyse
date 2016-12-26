import React from 'react';

class MaxFile extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			maxsize: 15
		};
	}
	componentWillMount() {
		let maxsize = this.state.maxsize;
		new Promise(function(resolve,reject){
			$.ajax({
				url: "/api/all",
				type: "GET",
				success: function(data){
					resolve(data);
				},
				error: function() {
					reject();
				}
			});
		}).then(function(data) {
			var xData = [],
	            yData = [];
	        for (var $classify in data) {
	            for (var $item in data[$classify]) {
	                var size = parseInt(data[$classify][$item].filesize);
	                if (size > maxsize) {
	                    xData.push($classify + "/" + $item);
	                    yData.push(size);
	                }
	            }
	        }
	        return {xData,yData};
		}).then(function(obj){
			var maxChart = echarts.init(document.getElementById('maxsize'));
	        var option = {
	            title: {
	                text: 'H5站 业务逻辑文件超过' + maxsize + 'K 文件列表',
	                x: "center"
	            },
	            tooltip: {},
	            xAxis: {
	                data: obj.xData
	            },
	            yAxis: {
	                type: 'value'
	            },
	            series: [{
	                name: '文件大小',
	                type: 'bar',
	                data: obj.yData
	            }]
	        };
	        maxChart.setOption(option);
		}).catch(function(err){
			alert(err.message);
		});
	}
	render() {
		let dstyle = {
			height: "400px"
		}
		return(
			<div>
				<input type="text" placeholder="输入文件最大值" id="txtMax" />
			    <input type="button" value="Click me to rerender" id="change" />
			    <div id="maxsize" style={dstyle}></div>
			</div>
		)
	}
}

module.exports = MaxFile;