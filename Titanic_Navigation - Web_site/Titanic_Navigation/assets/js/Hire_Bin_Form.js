///<reference path="angular.min.js" />
jQuery(function ($) {
    $("#Button1").click(function () {

        $(document).ready(function () {
            function getParameterByName(name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            };

            var id = getParameterByName('fnandvuenvljdnvuisdboajbfxjababdbjzhg');
            $(document).ready(function () {
                $.ajax({
                    url: 'http://10.254.116.132/Repository_Service/Repository_Service.asmx/Decline_Collection',
                    data: { Collection_Id: id },
                    method: 'post',
                    datatype: 'xml',
                    success: function (data) {
                        var jqueryXml = jQuery(data).text();;
                        alert(jqueryXml);

                    }
                });
            });
        });
    })
})