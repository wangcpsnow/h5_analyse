var max_size = 15;

var internal = {
    results: {},
    init: function() {
        internal.draw();
        internal.bindEvent();
        internal.showUtils();
    },
    draw: function(msize) {
        var maxsize = msize || max_size;
        var xData = [],
            yData = [],
            results = {};
        for (var $classify in $data) {
            for (var $item in $data[$classify]) {
                var size = parseInt($data[$classify][$item].filesize);
                if (size > maxsize) {
                    xData.push($classify + "/" + $item);
                    yData.push(size);
                }

                if (!msize) {
                    var requires = $data[$classify][$item].requires || [];
                    requires.forEach(function(re) {
                        re = re.replace(".js", "");
                        results[re] = results[re] ? (results[re] + 1) : 1;
                    });
                }
            }
        }
        internal.showMaxChart(xData, yData, maxsize);
        if (!msize) {
            internal.results = results;
            internal.showRequireChart(results);
        }
    },
    bindEvent: function() {
        var oTxt = document.getElementById("txtMax"),
            oChange = document.getElementById("change");
        oChange.addEventListener("click", function() {
            var size = parseInt(oTxt.value);
            if (size) {
                internal.draw(size);
            }
        }, false);
    },
    showMaxChart: function(xData, yData, maxsize) {
        var maxChart = echarts.init(document.getElementById('maxsize'));
        var option = {
            title: {
                text: 'H5站 业务逻辑文件超过' + maxsize + 'K 文件列表',
                x: "center"
            },
            tooltip: {},
            xAxis: {
                data: xData
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '文件大小',
                type: 'bar',
                data: yData
            }]
        };
        maxChart.setOption(option);
    },
    showRequireChart: function(results) {
        var keys = Object.keys(results),
            data = [];
        for (var res in results) {
            data.push({
                value: results[res],
                name: res
            });
        }

        var reqChart = echarts.init(document.getElementById('req'));
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
    },
    showUtils: function() {
        var results = Object.keys(internal.results),
            arr = [];
        $utils.forEach(function(util) {
            util = util.replace(".js", "");
            results.includes(util) || arr.push(util);
        });
        var $ul = $("#utils ul");
        arr.forEach(function(item) {
            $ul.append("<li>" + item + "</li>")
        })
    }
}

internal.init();