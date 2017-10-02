
         // This example adds a search box to a map, using the Google Place Autocomplete
         // feature. People can enter geographical searches. The search box will return a
         // pick list containing a mix of places and predicted search terms.

         // This example requires the Places library. Include the libraries=places
         // parameter when you first load the API. For example:
         // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initAutocomplete() {
    var mapOptions = {
        zoom: 15,
        scrollwheel: false,
        center: new google.maps.LatLng(-26.1827831, 27.9979655)
    };

    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);


    
    window.onload = function (e) {
        var ele = $("#myValues").myfunc({ divFact: 10, eventListenerType: 'keyup' }); // cache the reference


        for (var i = 0; i < 6; i++)
        {
            myFunction(i);

        }

        var markers = [];


        // Adds a marker to the map and push to the array.
        function addMarker(location) {
            var marker = new google.maps.Marker({
                position: location,
                animation: google.maps.Animation.BOUNCE,
               // icon: 'Img/3108.jpg',
                map: map
            });
            markers.push(marker);
        }

        // Sets the map on all markers in the array.
        function setMapOnAll(map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }

        // Removes the markers from the map, but keeps them in the array.
        function clearMarkers() {
            setMapOnAll(null);
        }

        // Shows any markers currently in the array.
        function showMarkers() {
            setMapOnAll(map);
        }

        // Deletes all markers in the array by removing references to them.
        function deleteMarkers() {
            clearMarkers();
            markers = [];
        }


        function autoRefresh_Polyline() {

            $(document).ready(function () {

                $.ajax({
                    url: 'http://192.168.43.175/Titanic_Service/Titanic_Service.asmx/Retrieve_Coordinates',
                    method: 'post',
                    datatype: 'json',
                    success: function (data2) {
                        var even2 = data2.toString();
                        var myObj2 = JSON.parse(even2);
                        console.log(myObj2);
                        // alert(myObj2[0].speed);



                        var flightPlanCoordinates = myObj2;

                        var flightPath = new google.maps.Polyline({
                            path: flightPlanCoordinates,
                            geodesic: true,
                            strokeColor: '#FF0000',
                            strokeOpacity: 1.0,
                            strokeWeight: 3
                        });

                        flightPath.setMap(map);
                        var currentCenter = { lat: myObj2[myObj2.length - 1].lat, lng: myObj2[myObj2.length - 1].lng};
                        map.setCenter(currentCenter);

                        deleteMarkers();
                        clearMarkers();
                        showMarkers();
                        addMarker(currentCenter);
                        showMarkers();


                    },
                    error: function (jqXHR, status, err) {
                        alert(jqXHR.responseText);
                    }
                });
            });
        }

        setInterval(autoRefresh_Polyline, 1000); // every 5 seconds
        autoRefresh_Polyline(); 



        function autoRefresh_div() {

            $(document).ready(function () {

                $.ajax({
                    url: 'http://192.168.43.175/Titanic_Service/Titanic_Service.asmx/Retrieve_Speed',
                    method: 'post',
                    datatype: 'json',
                    success: function (data2) {
                        var even2 = data2.toString();
                        var myObj2 = JSON.parse(even2);
                        console.log(myObj2);
                        // alert(myObj2[0].speed);
                        ele.val(myObj2[0].speed).keyup();

                    },
                    error: function (jqXHR, status, err) {
                        alert(jqXHR.responseText);
                    }
                });
            });
        }
        setInterval(autoRefresh_div, 300); // every 5 seconds
        autoRefresh_div(); 
        function myFunction(i) {
            ele.val(100 + i).keyup(); // change value and trigger the event
        }


    }
}