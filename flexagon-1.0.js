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
		 'capName'			:	'fgCaption',
		 'thmbName'			:	'fgThumb',
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
        
        var self = this;
        
  		var startWidth = parseInt($('.fgDisplay', this.element).attr('width'));
  		var id = "";
  		
//	When calling with the option "multi", make sure that the ids for all the associated
// elements end with the id for the parent gallery
  
  		if (this.options["galleryType"] == "multi") id = $(this.element).attr('id');
  		
          var fGallery = { 
// Define references to elements that live inside gallery element. Not alterable in settings.
          	"gal"			:	$(".fgGallery", this.element),
   			"displayImg"	: 	$('.fgDisplay', this.element),
          	"id"			:	id,
// Define references to elements that can live anywhere. Names can be changed in settings.
          	"drawer"   		:	$('#'+this.options["drawerName"]+id),
          	"nav"   		:	$('#'+this.options["navName"]+id),
          	"info"   		:	$('#'+this.options["infoName"]+id),
          	"button"   		:	$('#'+this.options["buttonName"]+id),
          	"startWidth"   	:	startWidth,
          	"startHeight" 	:	0
          	};
       		 
// Add fGallery to options
    	    this.options = $.extend( {}, options, fGallery);
    	    
    	    if (this.options["maxHeight"] == null) this.options["maxHeight"] = $(this.element).parent().height();
    	    if (this.options["maxWidth"] == null) this.options["maxWidth"] = $(this.element).parent().width();
    	    
        
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
		
				this.element.data = this.options;
		this.options["button"].on("click", function() {self.galToggle(self.element);});		
      console.log(this.options);
      
        },

        swapImg: function(el, options) {
        
        if (options == "") options = el.data;
        
                	  if ($(".thumbnail img.active", options["drawer"]).length == 0) {
                		this.imgSrc=$("."+options['thmbName'], options["drawer"]).filter(":first").children('img').addClass('active');
                	  } 
//                		  
                      var lastActive = $('.'+options['thmbName']+' img.active', options["drawer"]);
//                
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
                	 options["gal"].addClass('loading');
                	  // if we do the .prev .now .next thing, could just set this to hide() instead of remove
                	  options["gal"].children("img:first").remove();

// Get image information from the drawer list

                	  var activeImg = $('.'+options['thmbName']+' img.active', options["drawer"]);
                  	  var imgSrc=activeImg.next('.link').html();
                	  var imgCaption=activeImg.next().next('.'+options["capName"]).html();
                	  
                	  var imgTitle=activeImg.attr('alt');      
                      var img = new Image();
                      
                      
                      	$(img).load(function () {
//                      	
//      	#TODO:: error handling goes in the params of the complete >>> function complete(responseText, textStatus, XMLHttpRequest)] / http://api.jquery.com/load/
                			$(this).hide();
                			options["gal"].append(this);
                	 		options["gal"].removeClass('loading');
	                		var currentHeight = 0;
//TODO:: possibly add the large image onclick bind here
                // figure out image dimensions	  
                	  if (options["gal"].hasClass('fullscreen')){
	                		$(this).css('max-width', $(window).width()-10);
	                		$(this).css('max-height', $(window).height()-10);
	                	    currentHeight = $(window).height();
                	  }
                	  
                	  else {
           
          
                	  		if (activeImg.width() > activeImg.height()){
                	    	  	$(this).removeAttr('height');
                		   		$(this).attr('width', gallery.css("width")); 
                	    	}
                	  		else {
                			    $(this).removeAttr('width');
                				$(this).attr('height', options["maxHeight"]);    
                	  		}
           //TODO:: ok, here's an issue -- look down at the call the displayImg.load
                		  	currentHeight = $(this).height();
                		}
                		option["gal"].animate({"height": currentHeight}, 500, function(){	
                			    
                		      $(img).fadeIn(function(){
                		     	$('.fgTitle', options["imgInfo"]).html(imgTitle);
                				$('.fgCption', options["imgInfo"]).html(imgCaption);	     	
                		  		});
                			});
                		}).attr({
                		  "src": imgSrc,
                		  "alt": imgTitle,
//TODO:: make sure you don't need .largeImage anymore
                	  	  "class": 'largeImage'});
                	  	  

//        console.log(this.options["propertyName"]);
        },
        
        galToggle: function(el, options, toggle) {
               if (options == null) {options = el.data};	      
	        	console.log(options["id"]);
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
