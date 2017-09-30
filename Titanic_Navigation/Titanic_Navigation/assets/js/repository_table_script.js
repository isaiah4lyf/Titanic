(function ($) {
    "use strict";
    var mainApp = {
        slide_fun: function () {

            $('#carousel').carousel({
                interval: 3000 
            })

        },
        dataTable_fun: function () {

            $('#dataTables').dataTable();

        },

        custom_fun: function () {

        },

    }


    $(document).ready(function () {
        mainApp.slide_fun();
        mainApp.dataTable_fun();
        mainApp.custom_fun();
    });
}(jQuery));