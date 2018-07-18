function JzfqECharts(opts) {
    this.myChart = echarts.init(document.getElementById(opts.getDomId));
    this.showLoad = this.myChart.showLoading(opts.showLoad);
    opts.hideLoad === true ? this.myChart.hideLoading({}) : this.showLoad;
}
JzfqECharts.prototype = {
    init: function (opts) {
        var _this = this;
        var option = {
            backgroundColor: opts.backgroundColor,
            title: {
                text: opts.title,
                subtext: opts.subTitle,
                x: opts.titPosX,
                y: opts.titPosY,
                textStyle: opts.titStyle,
                subtextStyle: opts.subTitStyle,
                textAlign: opts.titAlign,
                padding: opts.titPadding,
                itemGap: opts.lineHeight
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: [],
                textStyle: {
                    fontSize: 14,
                    color: '#fff'
                }
            },
            grid: {
                left: opts.wrapPos.left,
                right: opts.wrapPos.right,
                bottom: opts.wrapPos.bottom,
                containLabel: true
            },
            xAxis: {
                data: opts.xAxis,
                axisLabel: {
                    color: opts.txtColorX
                },
                splitLine: { show: false },
                splitArea: { show: false },
                axisLine: opts.XStyle
            },
            yAxis: {
                axisLabel: {
                    formatter: '{value}' + opts.unit,
                    color: opts.txtColorY
                },
                splitLine: { show: true },
                splitArea: { show: false },
                axisLine: opts.YStyle
            },
            series: [{
                name: opts.tips,
                type: opts.type,
                radius: opts.pieRadius,
                center: opts.piePos,
                clockWise: true,
                hoverAnimation: false,
                smooth: true,
                symbolSize: 10,
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: opts.lineWidth,
                            color: opts.lineColor
                        }
                    }
                },
                label: {
                    normal: {
                        formatter: opts.unit,
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize: 15
                        }
                    }
                },
                data: opts.ajaxData
            }, opts.line],
            color: function (params) {
                var colorList = opts.colorArray;
                return colorList[params.dataIndex];
            },
            dataZoom: {
                show: false,
                backgroundColor: "rgba(0,0,0,.1)"
            }
        };
        _this.myChart.setOption(option, true);
    }
}

function Time(opts) {
    this.obj = document.getElementById(opts.id);
}
Time.prototype = {
    bindEvent: function (opts) {
        var _this = this;
        var date = new Date();
        var year = date.getFullYear();
        var month = _this.addzero(date.getMonth() + 1);
        var day = _this.addzero(date.getDate());
        var hour = _this.addzero(date.getHours());
        var minute = _this.addzero(date.getMinutes());
        var second = _this.addzero(date.getSeconds());
        switch (date.getDay()) {
            case 0: week = "星期天"; break;
            case 1: week = "星期一"; break;
            case 2: week = "星期二"; break;
            case 3: week = "星期三"; break;
            case 4: week = "星期四"; break;
            case 5: week = "星期五"; break;
            case 6: week = "星期六"; break;
        }
        this.obj.innerHTML = year + "年" + month + "月" + day + "日 " + hour + ":" + minute + ":" + second + " " + (opts.week == true ? week : '');
    },
    addzero: function (temp) {
        if (temp <= 9) return "0" + temp;
        else return temp;
    }
}
setInterval(function () {
    newTime.bindEvent({
        week: true
    });
}, 1000);

var newTime = new Time({
    id: 'time'
});
newTime.bindEvent({
    week: true
});