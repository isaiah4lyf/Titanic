
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
        center: new google.maps.LatLng(31.993072, 35.862211)
    };

    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);


    var marker = new google.maps.Marker({
        position: map.getCenter(),
        animation: google.maps.Animation.BOUNCE,
        //icon: 'img/map-marker.png',
        map: map
    });

    var flightPlanCoordinates = [
        { lat: 37.772, lng: -122.214 },
        { lat: 21.291, lng: -157.821 },
        { lat: -18.142, lng: 178.431 },
        { lat: -27.467, lng: 153.027 }
    ];
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 3
    });

    flightPath.setMap(map);



 


    
    window.onload = function (e) {
        var ele = $("#myValues").myfunc({ divFact: 10, eventListenerType: 'keyup' }); // cache the reference


        for (var i = 0; i < 6; i++)
        {
            myFunction(i);

        }



        function myFunction(i) {
            ele.val(100 + i).keyup(); // change value and trigger the event
        }


    }



}