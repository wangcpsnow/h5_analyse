/**
 * title: 公共组建分析图
 * ctime: 2016-12-26
 */

import React from 'react'

class CmFile extends React.Component{
	componentWillMount() {
		this._load_data();
	}
	_load_data() {
		let self = this;
		new Promise((resolve,reject)=> {
			$.ajax({
				url: "/api/all",type: "GET",
				success: function(data) {
					resolve(data);
				},
				error: function() {
					reject();
				}
			});
		})
		.then(($data)=> {
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
		})
		.then((data)=> {
			self._show_chart(data);
		})
		.catch(()=> {

		});
	}
	_show_chart(results) {
		var keys = Object.keys(results),
            data = [];
        for (var res in results) {
            data.push({
                value: results[res],
                name: res
            });
        }

        var reqChart = echarts.init(document.getElementById('cmfile'));
        var option = {
            title: {
                text: 'H5站 引用文件分析图',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: keys
            },
            series: [{
                name: '引用文件',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        reqChart.setOption(option);
	}
	render() {
		let styles = {
			height: "1500px"
		};
		return (
			<div id="cmfile" style={styles}></div>
		);
	}
}

module.exports = CmFile;
