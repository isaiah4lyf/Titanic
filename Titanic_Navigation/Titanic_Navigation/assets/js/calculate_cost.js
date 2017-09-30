$(function () {

    function calculateCost(index) {
        if(index=1)
        {

        }
        else{
    
        }
        var cost = 0;
        $('#cost').html("R" + cost);
    }

    $('#cost_form').submit(function (e) {
        event.preventDefault();
        var index = $('#DropDownList1').val();        
        var final_cost = calculateCost(index);
    });

});