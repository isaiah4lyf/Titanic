
         // This example adds a search box to a map, using the Google Place Autocomplete
         // feature. People can enter geographical searches. The search box will return a
         // pick list containing a mix of places and predicted search terms.

         // This example requires the Places library. Include the libraries=places
         // parameter when you first load the API. For example:
         // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initAutocomplete() {
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    $(document).ready(function () {
        $.ajax({
            url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Coordinates_Web',

            method: 'post',
            datatype: 'xml',
            success: function (data2) {
                var even2 = data2.toString();
                var myObj2 = JSON.parse(even2);
                console.log(myObj2);

                var markers = [];
                // Listen for the event fired when the user selects a prediction and retrieve
                // more details for that place.



                var map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: myObj2[0].lat, lng: myObj2[0].lng},
                    zoom: 16,
                    mapTypeId: 'roadmap'
                });

                var image = {
                    url: '/assets/images/Icons-Land-Transport-Truck.ico', // image is 512 x 512
                    scaledSize: new google.maps.Size(42, 52)
                };
                for (var i = 0; i < myObj2.length;i++)
                {
                    markers[i] = new google.maps.Marker({
                        position: { lat: myObj2[i].lat, lng: myObj2[i].lng },
                        map: map,
                        icon: image,
                        title: myObj2[i].Collector_Name
                    });
                }


                $(document).ready(function () {
                    var id = getParameterByName('argstrewzevr');
                    $.ajax({
                        url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Collections_Collector_Web_Total',
                        data: { Company_ID: id },
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

                            var chart = new CanvasJS.Chart("chartContainer73", {
                                title: {
                                    //text: "Recyclings"
                                },
                                theme: "theme3",
                                zoomEnabled: true,
                                animationEnabled: true,
                                axisY: {
                                    title: "Collections",
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
                    var id = getParameterByName('argstrewzevr');
                    $.ajax({
                        url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Collectors_IDs',
                        data: { Company_ID: id},
                        method: 'post',
                        datatype: 'xml',
                        success: function (data2) {
                            var even2 = data2.toString();
                            var myObj2 = JSON.parse(even2);
                            console.log(myObj2);
                            var graphs = "";
                            for (var i = 0; i < myObj2.length;i++)
                            {
                                var graph_For_Collec = "<div class='col-xs-6'>";
                                graph_For_Collec += "<div class='widget-box transparent'>";
                                graph_For_Collec += "<div class='widget-header widget-header-flat'> ";
                                graph_For_Collec += "<h4 class='widget-title lighter'> ";
                                graph_For_Collec += "<i class='fa fa-user'></i> ";
                                graph_For_Collec += " " + myObj2[i].Collector_Name + " " + myObj2[i].Collector_Surname;
                                graph_For_Collec += "</h4>";
                                graph_For_Collec += "<div class='widget-toolbar'>";
                                graph_For_Collec += "<a href='#' class='Cl' data-action='collapse'>";
                                graph_For_Collec += "<i class='ace-icon fa fa-chevron-up'></i> ";
                                graph_For_Collec += "</a>";
                                graph_For_Collec += "</div>";
                                graph_For_Collec += " </div>";
                                graph_For_Collec += "<div class='widget-body'>";
                                graph_For_Collec += "<div class='box box-primary'> ";
                                graph_For_Collec += "<div class='box-header'>";
                                graph_For_Collec += "</div>";
                                graph_For_Collec += "<div class='box-body'> ";
                                graph_For_Collec += "<div id='xx" + i +"'style='height: 200px; width: 100%;'> ";
                                graph_For_Collec += "</div>";
                                graph_For_Collec += " </div>";
                                graph_For_Collec += " </div> ";;
                                graph_For_Collec += "</div> ";
                                graph_For_Collec += "</div> ";
                                graph_For_Collec += "</div>";


                                graphs += graph_For_Collec;

                               
                            }
                            document.getElementById('row').innerHTML = graphs;

                        }
                    });
                });


                $(document).ready(function () {
                    var id = getParameterByName('argstrewzevr');
                    $.ajax({
                        url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Collectors_IDs',
                        data: { Company_ID: id},
                        method: 'post',
                        datatype: 'xml',
                        success: function (data2) {
                            var even2 = data2.toString();
                            var myObj2 = JSON.parse(even2);
                            console.log(myObj2);


                            var key = 0;
                            var key2 = 0;
                            for (var j = 0; j < myObj2.length; j++) {

                                $.ajax({
                                    url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Collections_Collector_Web',
                                    method: 'post',
                                    data: { Colector_ID: myObj2[j].Collector_ID },
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
                                     

                                        var options2 = {
                                            title: {
                                                //text: "Recyclings"
                                            },
                                            theme: "theme3",
                                            zoomEnabled: true,
                                            animationEnabled: true,
                                            axisY: {
                                                title: "Collections",
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
                                            toolTip: {
                                                content: "<span style='\"'color: {color};'\"'>{name}</span> - {y}"
                                            },
                                            data: [
                                                {
                                                    type: "area",
                                                    markerSize: 0,
                                                    xValueFormatString: "####",
                                                    color: "green",
                                                    dataPoints: myObj
                                                },

                                            ]
                                        };

                                        $("#xx" +key +"").CanvasJSChart(options2);



                                        key += 1;

                                    }

                                });

                                key2 += 1;
                                // key = key2;
                            }
                        }
                    });
                });
            }
        });
    });

 }
