
jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    //$.backstretch("assets/img/backgrounds/1.jpg");
    $.backstretch([
                "assets/img/backgrounds/2.jpg"
              , "assets/img/backgrounds/4.jpg"
              , "assets/img/backgrounds/6.jpg"
              , "assets/img/backgrounds/7.jpg"
    ], { duration: 3000, fade: 750 });


    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$.backstretch("resize");
    });
    
    /*
        Form
    */
    $('#field_1').fadeIn('slow');
    
    $('#registration_form input[type="text"], #registration_form input[type="password"], #registration_form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    // next step
    $('#registration_form .btn-next').on('click', function() {
        var parent_fieldset = $(this).parents('fieldset');
    	var next_step = true;
    	
    	parent_fieldset.find('input[type="text"], input[type="password"], textarea').each(function() {
    		if( $(this).val() == "" ) {
    			$(this).addClass('input-error');
    			next_step = false;
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
    	
    	if( next_step ) {
    		parent_fieldset.fadeOut(400, function() {
	    		$(this).next().fadeIn();
	    	});
    	}
    	
    });
    
    // previous step
    $('#registration_form .btn-previous').on('click', function() {
    	$(this).parents('fieldset').fadeOut(400, function() {
    		$(this).prev().fadeIn();
    	});
    });
    
    // submit
    $('#registration_form').on('submit', function(e) {
    	
    	$(this).find('input[type="text"], input[type="password"], textarea').each(function() {
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});
    	
    });
    
    
});
