﻿var drawChartYearComparePrice = function (data) {

    $(function () {
        Highcharts.setOptions({
            colors: ['#CB3D2E', '#F8D06B', '#51AFE7', '#90ed7d', '#6AF9C4', '#FFF263'],
            lang: {
                printChart: "打印图表",
                downloadJPEG: "下载JPEG 图片",
                downloadPDF: "下载PDF文档",
                downloadPNG: "下载PNG 图片",
                downloadSVG: "下载SVG 矢量图",
                exportButtonTitle: "导出图片"
            }
        });
    })
    // '#6AF9C4'薄荷绿；'#FFF263',亮黄；'#FF9655', 橘色；
    //'#ff0000','#50B432', '#ED561B', '#DDDF00','#24CBE5','#64E572', '#FF9655', '#FFF263',

    if (data.series[0].price[0].data.length > 0)
    {
        $('#containerBuickPrice').highcharts({
            chart: {
                zoomType: null
            },
            title: {
                text: data.year + '年产值分析'
            },
            xAxis: [{
                categories: data.x,
                //categories: data.data[0].x,
                crosshair: true
            }],
            yAxis: [
                { // Primary yAxis
                    labels: {
                        formatter: function () {
                            if (this.value > 10000) {
                                return (this.value / 10000) + ' 万元'
                            }
                            else {
                                return this.value + ' 元'
                            }
                        },
                        style: {
                            color: '#434348'
                        }
                    },
                    title: {
                        text: '产值',
                        style: {
                            //color: Highcharts.getOptions().colors[1]
                            color: '#434348'
                        }
                    }
                },
            ],
            credits: {
                enabled: false  // 去掉右下角的highcharts链接
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.0f} 元</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },

            legend: {
                itemStyle: {
                    fontWeight: 'normal',
                    fontSize: 15,
                    fontFamily: '微软雅黑',
                },
                //margin:200,
                symbolWidth:10,
                y:0
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            if (this.y / 10000 >= 1) {
                                return Highcharts.numberFormat(this.y / 10000, 0) + "万";
                            }
                            else (this.y / 10000 < 1)
                            {
                                return this.y;
                            }
                        },
                        //format:'{this.point[0].y} 元'
                    },
                    shared: true,
                    lineWidth: 3
                }
            },
            //series: data.series

            //方法2的js
            series: data.series[0].price
        });
    }

    else
    {
        $('#containerBuickPrice').highcharts({
            title: {
                text: data.year + '年产值分析'
            },
            subtitle: {
                text: '<span style="color:red";>无数据显示！</span>'
            },
            credits: {
                enabled: false  // 去掉右下角的highcharts链接
            },
            series: [{
                type: 'line',
                name: 'no data',
                data: []
            }],
        });
    }
}