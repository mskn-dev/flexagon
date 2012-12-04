/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var flexagon = 'flexagon',
    
        defaults = {
// Settings for the id names for elements which can live outside the gallery element if you want
		 'drawerName'		:	'fgDrawer',
         'buttonName'		:	'fgButton',
         'navName'			:	'fgNav',
         'imgInfo'			:	'fgInfo',
// If not explicitly set, maxHeight and maxWidth will be based on the dimensions of the containing element.       
         'maxHeight'		: null,
         'maxWidth'			: null,
// Set galleryType to "multi" if every gallery on a page will have its own drawer, navigation, and info area		      
         "galleryType"		: 'single'
                };

    function Flexagon( element, options ) {
//    var self = this;

        this.element = element;
	    this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = flexagon;

		
        this.init(this.options);
    }

    Flexagon.prototype = {

        init: function(options) {
//        var self = this;
        
        // Define references to elements that live inside gallery element. Not alterable in settings.
          var fGallery = { };
    		this.gal = $(".fgGallery", this.element);
    		this.displayImg = $('.fgDisplay', this.element);
            this.gal = $(".fgGallery", this.element);
                    
    		this.id = "";
    		if (this.options["galleryType"] == "multi") this.id = $(this.element).attr("id"); 
    
    // Define references to elements that can live anywhere. Names can be changed in settings.
    	
    		this.drawer = $('#'+this.options["drawerName"]+this.id);
    		this.nav = $('#'+this.options["navName"]+this.id);
    		this.info = $('#'+this.options["infoName"]+this.id);
    		this.button = $('#'+this.options["buttonName"]+this.id);
    		
            this.startWidth = parseInt(this.displayImg.attr('width')); 
    		this.startHeight = 0;
        
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).
        
//        	bind drawer
//        	bind trigger
//        	bind thumbs
//        	bind gal
//        	bind images
//        	set globals
//        	bind controls, keys
//		var galToggle = this.galToggle(this.button, "farts");
//		this.button.on("click", function () {self.galToggle(self.id);});		
      console.log(this.element);
      
      
        },

        swapImg: function(el, options) {
        
//                	  if ($(".thumbnail img.active", drawer).length == 0) {
//                		this.imgSrc=$(".thumbnail", drawer).filter(":first").children('img').addClass('active');
//                	  } 
//                		  
//                      var lastActive = $('.thumbnail img.active', drawer);
//                
                // detect first or last images in gallery
//                      
//                      if (toggle=="prev"){
//                	  	lastActive.parent().prev().children('img').addClass('active');
//                		lastActive.removeClass('active');
//                      }
//                      else if (toggle == "next"){
//                		lastActive.parent().next().children('img').addClass('active');
//                		lastActive.removeClass('active');
//                      }
                // set this after updating .active
                	  // possibly not necessary if we're preloading
//                	  gallery.addClass('loading');
                	  // if we do the .prev .now .next thing, could just set this to hide() instead of remove
//                	  gallery.children("img:first").remove();
//                	  
                // try to clean this up, make it more selector agnostic
//                	  var activeImg = $('.thumbnail img.active', drawer);
//                  	  var imgSrc=activeImg.next('.link').html();
//                	  var imgCaption=activeImg.next().next('.caption').html();
//                	  var imgTitle=activeImg.attr('alt');      
//                	  
//                      var img = new Image();
//                      	$(img).load(function () {
//                      	
                //      	#TODO:: error handling goes in the params of the complete >>> function complete(responseText, textStatus, XMLHttpRequest)] / http://api.jquery.com/load/
//                
//                			$(this).hide();
//                			gallery.append(this);
//                	 		gallery.removeClass('loading');
//                		  var currentHeight = 300;
//                		  
                // possibly add the large image onclick bind here
                // figure out image dimensions	  
//                	  if (gallery.hasClass('fullscreen')){
                // note w4 margin
//                		$(this).css('max-width', ($(window).width()-90));
//                		$(this).css('max-height', ($(window).height()-90));
//                	    currentHeight = $(window).height();
//                	  }
                // w4 only
//                	  
//                	  else if(gallery.hasClass('splashy')) {
//                
//                	 $(this).css({'max-height': $('#splash').height(), 
//                			'max-width': $('#splash').width(), 
//                						 });
//                	    currentHeight = ($('#splash').height());
//                	  }
//                	 
                // end w4 only
//                	  
//                	  else {
//                	  		if (activeImg.width() > activeImg.height()){
//                	    	  	$(this).removeAttr('height');
//                		   		$(this).attr('width', gallery.css("width")); 
//                	    	}
//                	  		else {
//                			    $(this).removeAttr('width');
//                				$(this).attr('height', startHeight);    
//                	  		}
//                		  	currentHeight = $(this).height();
//                		}
//                		        
//                		gallery.animate({height: currentHeight}, 500, function(){		    
//                		      $(img).fadeIn(function(){
//                		     	$('.title', description).html(imgTitle);
//                				$('.caption', description).html(imgCaption);	     	
//                		  		});
//                			});
//                		}).attr({
//                		  src: imgSrc,
//                		  alt: imgTitle,
//                	  	  class: 'largeImage'}); 
//              
//                    
        console.log(this.options["propertyName"]);
            // some logic
        },
        
        galToggle: function(toggle) {	      
	        	alert(self.id);
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations and allowing any
    // public function (ie. a function whose name doesn't start
    // with an underscore) to be called via the jQuery plugin,
    // e.g. $(element).defaultPluginName('functionName', arg1, arg2)
    $.fn[flexagon] = function ( options ) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + flexagon)) {
                    $.data(this, 'plugin_' + flexagon, new Flexagon( this, options ));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            return this.each(function () {
                var instance = $.data(this, 'plugin_' + flexagon);
                if (instance instanceof Flexagon && typeof instance[options] === 'function') {
                    instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }
            });
        }
    }

})( jQuery, window, document );
