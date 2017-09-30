<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Titanic_Navigation.aspx.cs" Inherits="Titanic_Navigation.Titanic_Navigation" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <meta name="description" content="overview &amp; stats" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <!-- Favicon and touch icons -->
    <link rel="shortcut icon" href="assets/ico/favicon.png" />
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/ico/apple-touch-icon-144-precomposed.png" />
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/ico/apple-touch-icon-114-precomposed.png" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/ico/apple-touch-icon-72-precomposed.png" />
    <link rel="apple-touch-icon-precomposed" href="assets/ico/apple-touch-icon-57-precomposed.png" />
    <!-- bootstrap & fontawesome -->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="assets/font-awesome/4.5.0/css/font-awesome.min.css" />
    <!-- text fonts -->
    <link rel="stylesheet" href="assets/css/fonts.googleapis.com.css" />

    <link href="assets/css/map-autocomplete-style.css" rel="stylesheet" />
    <link href="assets/css/google-map-style.css" rel="stylesheet" />
    <script type="text/javascript" src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="https://canvasjs.com/assets/script/jquery.canvasjs.min.js"></script>
    <link rel="stylesheet" href="assets/css/ace.min.css" class="ace-main-stylesheet" />

    <!--[if lte IE 9]>
			<link rel="stylesheet" href="assets/css/ace-part2.min.css" class="ace-main-stylesheet" />
		<![endif]-->
    <link rel="stylesheet" href="assets/css/ace-skins.min.css" />
    <link rel="stylesheet" href="assets/css/ace-rtl.min.css" />

    <!--[if lte IE 9]>
		  <link rel="stylesheet" href="assets/css/ace-ie.min.css" />
		<![endif]-->

    <script src="assets/js/ace-extra.min.js"></script>

    <!--[if lte IE 8]>
		<script src="assets/js/html5shiv.min.js"></script>
		<script src="assets/js/respond.min.js"></script>
		<![endif]-->
    <script type="text/javascript" src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="https://canvasjs.com/assets/script/jquery.canvasjs.min.js"></script>
    <style>
        /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
        #map {
            height: 50%;
            width: 50%;
            position: relative;
        }
        /* Optional: Makes the sample page fill the window. */
        html, body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
        }

        #description {
            font-family: Roboto;
            font-size: 15px;
            font-weight: 300;
        }

        #infowindow-content .title {
            font-weight: bold;
        }

        #infowindow-content {
            display: none;
        }

        #map #infowindow-content {
            display: inline;
        }

        .pac-card {
            margin: 10px 10px 0 0;
            border-radius: 2px 0 0 2px;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            outline: none;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
            background-color: #fff;
            font-family: Roboto;
        }

        #pac-container {
            padding-bottom: 12px;
            margin-right: 12px;
        }

        .pac-controls {
            display: inline-block;
            padding: 5px 11px;
        }

            .pac-controls label {
                font-family: Roboto;
                font-size: 13px;
                font-weight: 300;
            }

        #pac-input {
            background-color: #fff;
            font-family: Roboto;
            font-size: 15px;
            font-weight: 300;
            margin-left: 12px;
            padding: 0 11px 0 13px;
            text-overflow: ellipsis;
            width: 400px;
        }

            #pac-input:focus {
                border-color: #4d90fe;
            }

        #title {
            color: #fff;
            background-color: #4d90fe;
            font-size: 25px;
            font-weight: 500;
            padding: 6px 12px;
        }

        #target {
            width: 345px;
        }
    </style>
    <link href="css/speedometer.css" rel="stylesheet" type="text/css" />
</head>
<body>
<input style="width: 15%; margin-left:10%;margin-top:-6%" id="myValues" />

 <div style="width: 80%; height: 350px" class="map-card">
                                
     <div style="width: 100%; height: 350px;margin-top:-3%" id="map"></div>
</div>


    <script src="map.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBgfU99qd3NqiODQr5TmzcEHpyVvtUwccg&libraries=places&callback=initAutocomplete"></script>
    <script src="assets/js/ace.min.js"></script>
    <script src="js/jquery.js"></script>
<script src="js/speedometer.js"></script>

</body>
</html>
