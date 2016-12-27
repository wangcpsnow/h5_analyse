/**
 * title: 超过15K的业务逻辑的js文件
 * author: wangchunpeng
 */
import React from 'react';

class MaxFile extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			maxsize: 15,
			data: []
		};
	}
	componentWillMount() {
		this._load_data();
	}
	_load_data() {
		let self = this,
			maxsize = this.state.maxsize;
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
		})
		.then(function(data) {
			self.setState({data: data},function(){
				self._co_data();
			});
		})
		.catch(function(err){
			alert(err.message);
		});
	}
	// 处理中间数据
	_co_data() {
		var data = this.state.data,
			maxsize = this.state.maxsize,
			xData = [],
            yData = [];
        console.info(data);
        console.info(maxsize);
        for (var $classify in data) {
            for (var $item in data[$classify]) {
                var size = parseInt(data[$classify][$item].filesize);
                if (size > maxsize) {
                    xData.push($classify + "/" + $item);
                    yData.push(size);
                }
            }
        }
        this.setState({loaded: true});
		this._show_chart({xData,yData});
	}
	_show_chart(obj) {
		let maxsize = this.state.maxsize;
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
	}
	click_rerender() {
		let maxsize = parseFloat($("#txtMax").val().trim()),
			self = this;
		if(maxsize){
			self.setState({maxsize: maxsize},function(){
				self._co_data();
			});
		}
	}
	render() {
		let dstyle = {
			height: "400px"
		}
		return(
			<div>
				<input type="text" placeholder="输入文件最大值" id="txtMax" />
			    <input type="button" value="Click me to rerender" onClick={this.click_rerender.bind(this)} id="change" />
			    <div id="maxsize" style={dstyle}></div>
			</div>
		)
	}
}

module.exports = MaxFile;