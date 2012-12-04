function(){
  
 var startSlideshow = function(gal){
// active elements for this gallery
   	var drawer = '#'+gal.attr("id")+'drawer';
   	var drawer = $(drawer);
	var displayImg = $('.largeImage', gal);
	var gallery = $('.gallery', gal);
	var galleryContainer = $('.galleryContainer', gal);
	var nav = $('.controls', gal);
	var description = $('.image-description', gal);
	var startWidth = parseInt(displayImg.attr('width')); 
	var startHeight= 0;
	
// start swapImage ////////////////////		
	function swapImage(toggle){    
	  if ($(".thumbnail img.active", drawer).length > 0) {
	  }
	  else {
		var imgSrc=$(".thumbnail", drawer).filter(":first").children('img').addClass('active');
	  } 
		  
      var lastActive = $('.thumbnail img.active', drawer);

// detect first or last images in gallery
      
      if (toggle=="prev"){
	  	lastActive.parent().prev().children('img').addClass('active');
		lastActive.removeClass('active');
      }
      else if (toggle == "next"){
		lastActive.parent().next().children('img').addClass('active');
		lastActive.removeClass('active');
      }
// set this after updating .active
	  // possibly not necessary if we're preloading
	  gallery.addClass('loading');
	  // if we do the .prev .now .next thing, could just set this to hide() instead of remove
	  gallery.children("img:first").remove();
	  
// try to clean this up, make it more selector agnostic
	  var activeImg = $('.thumbnail img.active', drawer);
  	  var imgSrc=activeImg.next('.link').html();
	  var imgCaption=activeImg.next().next('.caption').html();
	  var imgTitle=activeImg.attr('alt');      
	  
      var img = new Image();
      	$(img).load(function () {
      	
//      	#TODO:: error handling goes in the params of the complete >>> function complete(responseText, textStatus, XMLHttpRequest)] / http://api.jquery.com/load/

			$(this).hide();
			gallery.append(this);
	 		gallery.removeClass('loading');
		  var currentHeight = 300;
		  
// possibly add the large image onclick bind here
// figure out image dimensions	  
	  if (gallery.hasClass('fullscreen')){
// note w4 margin
		$(this).css('max-width', ($(window).width()-90));
		$(this).css('max-height', ($(window).height()-90));
	    currentHeight = $(window).height();
	  }
// w4 only
	  
	  else if(gallery.hasClass('splashy')) {

	 $(this).css({'max-height': $('#splash').height(), 
			'max-width': $('#splash').width(), 
						 });
	    currentHeight = ($('#splash').height());
	  }
	 
// end w4 only
	  
	  else {
	  		if (activeImg.width() > activeImg.height()){
	    	  	$(this).removeAttr('height');
		   		$(this).attr('width', gallery.css("width")); 
	    	}
	  		else {
			    $(this).removeAttr('width');
				$(this).attr('height', startHeight);    
	  		}
		  	currentHeight = $(this).height();
		}
		        
		gallery.animate({height: currentHeight}, 500, function(){		    
		      $(img).fadeIn(function(){
		     	$('.title', description).html(imgTitle);
				$('.caption', description).html(imgCaption);	     	
		  		});
			});
		}).attr({
		  src: imgSrc,
		  alt: imgTitle,
	  	  class: 'largeImage'}); 
    }    
// end swapImage ////////////////////
   
 // this should probably happen elsewhere
    displayImg.load(function(){

// set new height value
      startHeight = parseInt(displayImg.height());     

// enable key navigation
		$(document).keydown(function(event) {
			switch (event.keyCode) {
				case 37: swapImage('prev'); break;
				case 39: swapImage('next'); break;
	//   		case 27: $('#fullscreen').trigger('click');
			}
		});
    });
      

// overlay button functions
// #TODO:: probably need to rewrite a little
	$('.overlay', gal).click(function(){
		$('.gallery, .gallery-container', gal).animate({width:startWidth, height:startHeight}, 500, function(){
			gallery.removeClass('collapsed');
			gallery.removeClass('open');
			$('.overlay', gal).toggle();
			drawer.toggle('slow');			
			description.css({'width':startWidth});
			description.show();
			});

		});
   
	
    /* figure out how to preserve this function after unloading and reloading the image. 
    $('#largeImage').bind('click', swapImage("next"));	
	});
	*/

	 
	$('.thumbnail img', drawer).click(function(){
		$('.thumbnail img.active', drawer).removeClass('active');
		$(this).addClass('active');
		swapImage();	    	
	});
	
  	$('.previous', nav).click(function(){
      		swapImage('prev');
    	});
	$('.next', nav).click(function(){
     	 swapImage('next');
    	});
			 
$(".fullscreen", nav).click(function(){

      var windowWidth = $(window).width();
      var windowHeight = $(window).height();
      var imgRatio = displayImg.width()/displayImg.height();
      var browserRatio = windowWidth / windowHeight;
      var ratioDisparity = imgRatio / browserRatio;
      
// check to see if the image is already fullscreen
     if (gallery.hasClass('fullscreen')){

       // reset the icon and view size 
       gallery.removeClass('fullscreen');
       gallery.addClass('open');
       gallery.css({'postion':'relative'});
       $(this).css({'background-position':'0px 0px'});
		windowWidth = startWidth;
     }
     
     else{
       //	   gallery.addClass('fullscreen');
      // change the icon 
//#TODO:: not very clean with css for icon.
// CAN be fixed with somekinda toggle class

       $(this).css({'background-position':'0px -11px'});
	 }
 			   
       var galContainerCSS = {
      	'border' : '0px none',
      	'padding' : '0px',
		'width' : windowWidth,
	 	'position': 'absolute'
    	};

      var controlsCSS = {
      	'position' : 'absolute',
      	'z-index' : '500',
		'width' : windowWidth,
		'top' : '0px'
    	};

		drawer.hide();
		description.css(controlsCSS);
      	gallery.css(galContainerCSS);
      //activeImg.width(windowWidth);
      	swapImage();
    });     
    
    
    $(".drawer-toggle", nav).click(function(){
      drawer.toggle('slow');
    });

//#TODO:: learn how to do a proper callback -- do you even need one if it's a plugin?
   //   if (callback){return callback;}
}
// end startSlideshow ////////////////////

     	$('.galleryContainer').each(function(){startSlideshow($(this));});
 }