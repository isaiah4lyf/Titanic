window.onload = function () {


    jQuery(function ($) {


        $(function () {
            $('.Cl').trigger('click');
        });

        $(document).ready(function () {
            $.ajax({
                url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Site_Usage',
                method: 'post',
                datatype: 'json',
                success: function (data) {
                    var even = data.toString();
                    var myObj = JSON.parse(data);
                    console.log(myObj);

                    var arr = [];
                    for (var i in myObj) {
                        arr.push(i, myObj[i]);
                    }
                    console.log(arr);
                    $.ajax({
                        url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Site_Usage',
                        method: 'post',
                        datatype: 'json',
                        success: function (data) {
                            var even = data.toString();
                            var myObj3 = JSON.parse(data);
                            console.log(myObj);

                            var arr = [];
                            for (var i in myObj) {
                                arr.push(i, myObj[i]);
                            }
                            console.log(arr);

                            $.ajax({
                                url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Site_Usage',
                                method: 'post',
                                datatype: 'json',
                                success: function (data) {
                                    var even = data.toString();
                                    var myObj2 = JSON.parse(data);
                                    console.log(myObj);

                                    var arr = [];
                                    for (var i in myObj) {
                                        arr.push(i, myObj[i]);
                                    }
                                    console.log(arr);

                                    var options2 = {
                                        title: {
                                            //text: "Recyclings"
                                        },
                                        theme: "theme3",
                                        zoomEnabled: true,
                                        animationEnabled: true,
                                        axisY: {
                                            title: "Bookings",
                                        },
                                        axisX: {
                                            interval: 3
                                            // labelAngle : 30,
                                            // valueFormatString: "HHmm'hrs'"

                                        },
                                        toolTip: {
                                            shared: true
                                        },
                                        axisX: {
                                            title: "Month",
                                        },
                                        legend: {
                                            verticalAlign: "bottom",
                                            horizontalAlign: "center"
                                        },
                                        data: [
                                            {
                                                showInLegend: true,
                                                legendMarkerType: "square",
                                                type: "column",
                                                color: "rgba(0,75,141,0.7)",//change it to line, area, column, pie, etc
                                                legendText: "Accepted",
                                                name: "Accepted",
                                                showInLegend: true,
                                                markerSize: 0,
                                                dataPoints: myObj
                                            },
                                            {
                                                showInLegend: true,
                                                legendMarkerType: "square",
                                                type: "column",
                                                color: "red", //change it to line, area, column, pie, etc
                                                legendText: "Declined",
                                                name: "Declined",
                                                showInLegend: true,
                                                markerSize: 0,
                                                dataPoints: myObj3
                                            }
                                            //,
                                            //{
                                            //    showInLegend: true,
                                            //    legendMarkerType: "square",
                                            //    type: "area",
                                            //    color: "rgba(0,75,141,0.9)", //change it to line, area, column, pie, etc
                                            //    legendText: "Total",
                                            //    name: "Total",
                                            //    showInLegend: true,
                                            //    markerSize: 0,
                                            //    dataPoints: myObj2
                                            //}
                                        ]
                                    };

                                    $("#chartContainer5").CanvasJSChart(options2);
                                    $('.Cl').trigger('click');
                                }
                            });

                        }
                    });

                }
            });
        });
  
            $(document).ready(function () {
                $.ajax({
                    url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Company_Profit',
                    method: 'post',
                    datatype: 'json',
                    success: function (data) {
                        var even = data.toString();
                        var myObj = JSON.parse(data);
                        console.log(myObj);

                        var arr = [];
                        for (var i in myObj) {
                            arr.push(i, myObj[i]);
                        }
                        console.log(arr);

                        var chart = new CanvasJS.Chart("chartContainer7", {
                            title: {
                                //text: "Recyclings"
                            },
                            theme: "theme3",
                            zoomEnabled: true,
                            animationEnabled: true,
                            axisY: {
                                title: "Month",
                            },
                            axisX: {
                                interval: 3
                                // labelAngle : 30,
                                // valueFormatString: "HHmm'hrs'"

                            },
                            toolTip: {
                                shared: true
                            },
                            axisX: {
                                title: "Profit(R)",
                            },
                            legend: {
                                verticalAlign: "bottom",
                                horizontalAlign: "center"
                            },
                            toolTip: {
                                content: "<span style='\"'color: {color};'\"'>{name}</span> - {y}"
                            },
                            data: [{
                                type: "area",
                                markerSize: 0,
                                xValueFormatString: "####",
                                dataPoints: myObj
                            }]
                        });

                        chart.render();


                    }
                });
        });
            $(document).ready(function () {
                $.ajax({
                    url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Site_Usage',
                    method: 'post',
                    datatype: 'json',
                    success: function (data) {
                        var even = data.toString();
                        var myObj = JSON.parse(data);
                        console.log(myObj);

                        var arr = [];
                        for (var i in myObj) {
                            arr.push(i, myObj[i]);
                        }
                        console.log(arr);
                        $.ajax({
                            url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Site_Usage',
                            method: 'post',
                            datatype: 'json',
                            success: function (data) {
                                var even = data.toString();
                                var myObj3 = JSON.parse(data);
                                console.log(myObj);

                                var arr = [];
                                for (var i in myObj) {
                                    arr.push(i, myObj[i]);
                                }
                                console.log(arr);

                                $.ajax({
                                    url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Site_Usage',
                                    method: 'post',
                                    datatype: 'json',
                                    success: function (data) {
                                        var even = data.toString();
                                        var myObj2 = JSON.parse(data);
                                        console.log(myObj);

                                        var arr = [];
                                        for (var i in myObj) {
                                            arr.push(i, myObj[i]);
                                        }
                                        console.log(arr);

                                        var options2 = {
                                            title: {
                                                //text: "Recyclings"
                                            },
                                            theme: "theme3",
                                            zoomEnabled: true,
                                            animationEnabled: true,
                                            axisY: {
                                                title: "Waste Collections",
                                            },
                                            axisX: {
                                                interval: 3
                                                // labelAngle : 30,
                                                // valueFormatString: "HHmm'hrs'"

                                            },
                                            toolTip: {
                                                shared: true
                                            },
                                            axisX: {
                                                title: "Month",
                                            },
                                            legend: {
                                                verticalAlign: "bottom",
                                                horizontalAlign: "center"
                                            },
                                            data: [
                                                {
                                                    showInLegend: true,
                                                    legendMarkerType: "square",
                                                    type: "column",
                                                    color: "rgba(0,75,141,0.7)",//change it to line, area, column, pie, etc
                                                    legendText: "Successful",
                                                    name: "Successful",
                                                    showInLegend: true,
                                                    markerSize: 0,
                                                    dataPoints: myObj
                                                },
                                                {
                                                    showInLegend: true,
                                                    legendMarkerType: "square",
                                                    type: "column",
                                                    color: "red", //change it to line, area, column, pie, etc
                                                    legendText: "Unsuccessful",
                                                    name: "Unsuccessful",
                                                    showInLegend: true,
                                                    markerSize: 0,
                                                    dataPoints: myObj3
                                                }
                                                //,
                                                //{
                                                //    showInLegend: true,
                                                //    legendMarkerType: "square",
                                                //    type: "area",
                                                //    color: "rgba(0,75,141,0.9)", //change it to line, area, column, pie, etc
                                                //    legendText: "Total",
                                                //    name: "Total",
                                                //    showInLegend: true,
                                                //    markerSize: 0,
                                                //    dataPoints: myObj2
                                                //}
                                            ]
                                        };

                                        $("#chartContainer").CanvasJSChart(options2);
                                        $('.Cl').trigger('click');
                                    }
                                });

                            }
                        });

                    }
                });
            });

    });



}