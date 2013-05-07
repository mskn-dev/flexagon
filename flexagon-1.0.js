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
         'infoName'			:	'fgInfo',
         'linkName'			:	'fgLink',
// If not explicitly set, maxHeight and maxWidth will be based on the dimensions of the containing element.       
         'maxHeight'		:    null,
         'maxWidth'			:    null,
// Set galleryType to "multi" if every gallery on a page will have its own drawer, navigation, and info area		      
         "galleryType"		:    'single',
         'margin'			:	 45
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
    	    this.options = $.extend( {}, options, fGallery);
    	    
//    	    Run _fit on resize. If fullscreen or liquid, _fit will refresh image when dimensions change. 
//			Make gallery fixed-dimensions by making gallery container fixed-dimensions

			if (this.options["maxHeight"] == null) this.options["maxHeight"] = this.options["gal"].height();
			if (this.options["maxWidth"] == null) this.options["maxWidth"] = this.options["gal"].width();
			console.log(this.options["gal"].width());
			

        
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
			var self = this;
				if (options == null) options = this.options;
				

			var displayImage = $(".fgDisplay", el);
//  Add active to first thumbnail if there is none
			if ($("."+options['thmbName']+" img.active", options["drawer"]).length == 0) {
				$("."+options['thmbName'], options["drawer"]).filter(":first").children('img').addClass('active');
			}			
// Get image information from the drawer list	
			var activeImg = $('.'+options['thmbName']+' img.active', options["drawer"]);
			var imgSrc=activeImg.parent().children('.'+options['linkName']).html();	
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
//TODO:: refresh function --- ummm, do I really need it? passing with no toggle might just redo current active

          }
// set this after updating .active
    	  // possibly not necessary if we're preloading
	    	 displayImage.addClass('loading');
	    	  // if we do the .prev .now .next thing, could just set this to hide() instead of remove
	    	 displayImage.remove();
			 console.log(imgSrc);
//	 Ok, so you need to review where it looks for the image src, and how it swaps out. Also does not trigger on image fade, and doesn't seem to be updating .active
    	  var imgCaption=activeImg.next().next('.'+options["capName"]).html();
    	  var imgTitle=activeImg.attr('alt');      
          var img = new Image();

          	$(img).load(function () {
//	Need to bind on each load to add click-image-to-advance
          	$(this).bind("click", function() 
          		{self.swapImg(self.element, self.options, "next");
          	});
//                      	
// TODO:: error handling goes in the params of the complete >>> function complete(responseText, textStatus, XMLHttpRequest)] / http://api.jquery.com/load/
//    			$(this).hide();
    			options["gal"].append($(this));
    	 		options["gal"].removeClass('loading');
        		var currentHeight = 0;

//   Simplest way to proportionally scale to the size of the containing element. Figure out the aspect ratio based on the thmb, then set the appropriate dimension, removing the other one.
    	  		if (activeImg.width() > activeImg.height()){
    	    	  	$(this).removeAttr('height');
    	    	  	
  					console.log(options["maxWidth"]+" yono");
    		   		$(this).attr('width', options["maxWidth"]); 
    	    	}
    	  		else {
    			    $(this).removeAttr('width');
    				$(this).attr('height', options["maxHeight"]);    
    	  		}
//TODO:: ok, here's an issue -- look down at the call the displayImg.load
    		  	currentHeight = $(this).height();
 
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
//TODO:: make sure you don't need .displayImage anymore
    	  	  "class": 'fgDisplay'});
        },
        
        galToggle: function(toggle, el) {
            var self = this;
    		if (el == null) el = $(this.element);
    		if (el.hasClass("open")) { 
    			el.removeClass("open");
    			$(window).unbind("resize", fgResize);	    
				$("img", el).fadeOut(function() {
					$(el).animate({height: self.options["startHeight"]}, 500);
				});   			
           	}
           	else {
           		el.addClass("open");
           		this.options["startHeight"]=el.height();
				console.log("open");            

	//	bind resize behavior after opening               
	             var doit;
	             var fgResize = function() {
		             clearTimeout(doit);
		             doit = setTimeout(function () {
		             	if(self._fit() == true){
		             	 self.swapImg(self.element, self.options);
		             	 console.log(self.options["maxWidth"]+" yo");
		                	clearTimeout(doit);
		                	}
		             }, 200);
	             };
	              $(window).bind("resize", fgResize);
	//	        	console.log(options["id"]);
		        	$(el).animate({height: this.options["maxHeight"]}, 500, function(){		    
		        	

		        	      $("img", el).fadeIn(function(){
//		        	     	$('.title', this.options["imgInfo"]).html("flarb");
//		        			$('.caption', this.options["imgInfo"]).html('blarb');
		        			// this	is how to call another method from a method        		
			        		self.swapImg(el, self.options, "next");
		        				     	
		        	  		});
		        		});
           		
           	}
           	
   
		    console.log($(this.element).attr('id')+", "+this.options['maxHeight']);
//               TOTALLY ok to be doing this, because I need it within the scope of the animate callback. 
			if (toggle == "open") {
						        		
		        }
		        
		        
        },
                
        _fit:function() {
        	var liveWidth = this.options["gal"].width()-this.options["margin"];
        	var liveHeight = this.options["gal"].height()-this.options["margin"];
        	
        	if ((this.options["maxHeight"]-this.options["margin"]) != liveHeight){
	        	 this.options["maxHeight"] = liveHeight;
	        	 return true;
        	 }
        	if ((this.options["maxWidth"]-this.options["margin"]) != liveWidth){ 	
        		this.options["maxWidth"] = liveWidth;
        		console.log((this.options["maxWidth"]-this.options["margin"])+" and "+liveWidth);
        		
        		return true;
        		
        		}
        		
        		
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
