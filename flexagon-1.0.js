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
// Settings for the id names for elements which can live outside the gallery element if you want. Using IDs instead of classes within context of gallery ID so they can live anywhere on the page
		 'drawerName'		:	'fgDrawer',
		 'capName'			:	'fgCaption',
		 'thmbName'			:	'fgThumb',
         'buttonName'		:	'fgButton',
         'navName'			:	'fgNav',
         'nextName'			:	'fgNext',
         'prevName'			:	'fgPrev',
         'imgInfo'			:	'fgInfo',
         'link'				:	'fgLink',
// If not explicitly set, maxHeight and maxWidth will be based on the dimensions of the containing element.       
         'maxHeight'		: null,
         'maxWidth'			: null,
// Set galleryType to "multi" if every gallery on a page will have its own drawer, navigation, and info area		      
         "galleryType"		: 'single',
         'margin'			:	45;
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
//  elements end with the id for the parent gallery
//  TODO:: make sure fgNext and fgPrev exist and are accounted for. should not be restricted to live in fgNav
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
          	"next"			:	$('#'+this.options["nextName"]+id),
         	"prev"			:	$('#'+this.options["prevName"]+id),
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

// Store reference to options in element.data
		
		this.element.data = this.options;
		
		$("."+this.options['thmbName']+" img", this.options["drawer"]).on("click", function(){
			$("."+self.options['thmbName']+" img.active", self.options["drawer"]).removeClass('active');
			$(this).addClass('active');
			self.swapImg(self.element, self.options);	    	
		});

		this.options["button"].on("click", function() {
			self.options["drawer"].show();
			self.galToggle(self.element);
//			self.swapImg(self.element, self.options);
			
			});		
			
// Activate buttons
//TODO:: probably be more crap to do here

      		this.options["next"].on("click", function() {
      		self.swapImg(self.element, self.options, "next");
      		});
      		this.options["prev"].on("click", function() {
      		self.swapImg(self.element, self.options, "prev");
      		});
        },

        swapImg: function(el, options, toggle) {
//        	if (el=="") el = element;
        	var self = this;
	        var displayImage = $(".largeImage", el);
		    if (options == "") options = el.data;
// detect first or last images in gallery
          var lastActive = $('.'+options['thmbName']+' img.active', options["drawer"]);
          switch (toggle) {
          	case "prev":
              	lastActive.parent().prev().children('img').addClass('active');
              	lastActive.removeClass('active');
              	break;
          	
          	case "next":
          		lastActive.parent().next().children('img').addClass('active');
          		lastActive.removeClass('active');
          		break;
          		
          	default: 
//TODO:: refresh function
          }

// set this after updating .active
    	  // possibly not necessary if we're preloading
    	 displayImage.addClass('loading');
    	  // if we do the .prev .now .next thing, could just set this to hide() instead of remove
    	 displayImage.remove();
//  Add active to first thumbnail if there is none
          if ($("."+options['thmbName']+" img.active", options["drawer"]).length == 0) {
          	$("."+options['thmbName'], options["drawer"]).filter(":first").children('img').addClass('active');
          } 

// Get image information from the drawer list

    	  var activeImg = $('.'+options['thmbName']+' img.active', options["drawer"]);
    
//TODO:: fix the .link 
	  	  var imgSrc=activeImg.next('.'+options["link"]).html();
 console.log(imgSrc);
	 	 
	 	 
	 //XMARKS
//	 Ok, so you need to review where it looks for the image src, and how it swaps out. Also does not trigger on image fade, and doesn't seem to be updating .active


    	  var imgCaption=activeImg.next().next('.'+options["capName"]).html();
    	  var imgTitle=activeImg.attr('alt');      
          var img = new Image();

          	$(img).load(function () {
//	Need to bind on each load to add click-image-to-advance
          	$(this).bind("click", function() 
          		{self.swapImg(self.element, self.options, "next");
          	});
    console.log("hello");
//                      	
// TODO:: error handling goes in the params of the complete >>> function complete(responseText, textStatus, XMLHttpRequest)] / http://api.jquery.com/load/
//    			$(this).hide();
    			options["gal"].append($(this));
    	 		options["gal"].removeClass('loading');
        		var currentHeight = 0;

    // figure out image dimensions	  
    	  if (options["gal"].hasClass('fullscreen')){
        		$(this).css('max-width', $(window).width()-10);
        		$(this).css('max-height', $(window).height()-10);
        	    currentHeight = $(window).height();
    	  }
    	  
    	  else {
    	  		if (activeImg.width() > activeImg.height()){
    	    	  	$(this).removeAttr('height');
    		   		$(this).attr('width', options["gal"].css("width")); 
    	    	}
    	  		else {
    			    $(this).removeAttr('width');
    				$(this).attr('height', options["maxHeight"]);    
    	  		}
//TODO:: ok, here's an issue -- look down at the call the displayImg.load
    		  	currentHeight = $(this).height();
    		}
    		
    		// blah there's something here 
    		// ok this is what's supposed to happen when the gallery starts. 
    		options["gal"].animate({"height": currentHeight}, 500, function(){	
    			    
    		      $(img).fadeIn(function(){
    		      
//TODO:    		      titles aren't addressed right
    		     	$('.fgTitle', options["imgInfo"]).html(imgTitle);
    				$('.fgCaption', options["imgInfo"]).html(imgCaption);	     	
    		  		});
    			});
    		}).attr({
    		  "src": imgSrc,
    		  "alt": imgTitle,
//TODO:: make sure you don't need .largeImage anymore
    	  	  "class": 'largeImage'});
        },
        
        galToggle: function(toggle, el, options) {
        		if (el == null) el = $(this.element);
               if (options == null) options = this.options;
		        console.log($(this.element).attr('id')+", "+options['maxHeight']);
               
//               TOTALLY ok to be doing this, because I need it within the scope of the animate callback. 
//TODO:: add "close" option
	if (toggle == "open") console.log("open");
               var self = this;    
//	        	console.log(options["id"]);
	        	$(el).animate({height: options["maxHeight"]}, 500, function(){		    
	        	      $("img", el).fadeIn(function(){
	        	     	$('.title', options["imgInfo"]).html("flarb");
	        			$('.caption', options["imgInfo"]).html('blarb');
	        			// this	is how to call another method from a method        		
		        		self.swapImg(el, options, "next");
	        				     	
	        	  		});
	        		});
        },
        
        supersize: function() {
        
        //		this is the goofy shit	   
        			    
        			    $('.gallery').height($('#splash').height()+options['margin']); 
        			    $('.largeImage').css({'max-height': ($('#splash').height()+options['margin']), 
        						  'max-width': $('#splash').width(), 
        						 });
        					
        			    $('.gallery').fadeIn();
        			    //  $('.galleryContainer').each(function(){startSlideshow($(this));});
        				});
            $(window).unbind("resize");
            $(window).bind("resize", function() {
        	$('#splash').resizenow(90, '45px');
              //  	startSlideshow.swapImage();
        	});
  
        
        
        
        },
        
        barf: function(blerp, blorp) {
        console.log($(this.element).attr('id')+", "+this.options['id']);
        alert(blerp);
        alert(blorp);
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
