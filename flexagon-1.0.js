/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */
;(function ( $, window, document, undefined ) {
    var flexagon = 'flexagon',
        defaults = {
// Settings for the id names for elements which can live outside the gallery element if you want. Using IDs instead of classes within context of gallery ID so they can live anywhere on the page
        'drawerName'    : 'fgDrawer',
        'capName'       : 'fgCaption',
        'thmbName'      : 'fgThumb',
        'buttonName'    : 'fgButton',
        'navName'       : 'fgNav',
        'nextName'      : 'fgNext',
        'prevName'      : 'fgPrev',
        'infoName'      : 'fgInfo',
        'linkName'      : 'fgLink',
// If not explicitly set, maxHeight and maxWidth will be based on the dimensions of the containing element.       
        'maxHeight'     :    null,
        'maxWidth'      :    null,
// Set galleryType to "multi" if every gallery on a page will have its own drawer, navigation, and info area          
        "galleryType"   :    'single',
        "fullscreen"    :    false,
        'margin'        :    null,
        'marginH'       :    null,
        'marginW'       :    null 
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
        //  When calling with the option "multi", make sure that the ids for all the associated
        //  elements end with the id for the parent gallery
        //  TODO:: make sure fgNext and fgPrev exist and are accounted for. should not be restricted to live in fgNa
            if (this.options["galleryType"] == "multi") id = $(this.element).attr('id');
            var fGallery = { 
        // Define references to elements that live inside gallery element. Not alterable in settings.
                "gal"            :  $(".fgGallery", this.element),
                "displayImg"     :  $('.fgDisplay', this.element),
                "id"             :  id,
        // Define references to elements that can live anywhere. Names can be changed in settings.
                "drawer"         :  $('#'+this.options["drawerName"]+id),
                "nav"            :  $('#'+this.options["navName"]+id),
                "info"           :  $('#'+this.options["infoName"]+id),
                "button"         :  $('#'+this.options["buttonName"]+id),
                "startWidth"     :  startWidth,
                "next"           :  $('#'+this.options["nextName"]+id),
                "prev"           :  $('#'+this.options["prevName"]+id),
                "startHeight"     : 0
                    };
  //          Run _fit on resize. If fullscreen or liquid, _fit will refresh image when dimensions change. 


  
            this.options = $.extend( {}, options, fGallery);
              // console.log(this.options["gal"].width());       
            //          bind drawer
            //          bind trigger
            //          bind thumbs
            //          bind gal
            //          bind images
            //          set globals
            // Store reference to options in element.data
            this.element.data = this.options;
            $("."+this.options['thmbName']+" img", this.options["drawer"]).on("click", function(){
                $("."+self.options['thmbName']+" img.active", self.options["drawer"]).removeClass('active');
                $(this).addClass('active');
                self.swapImg(self.element, self.options);       
            });
            this.options["button"].on("click", function() {
              self.options["drawer"].show();
              self.galToggle();
        //      self.swapImg(self.element, self.options);
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
//////////////////////   START swapImg //////////////////////
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
                case null:
                    imgSrc=displayImage.attr('src');
                    break;
                default: 
                //TODO:: refresh function --- ummm, do I really need it? passing with no toggle might just redo current active
              }
            // set this after updating .active
            // if we do the .prev .now .next thing, could just set this to hide() instead of remove
             displayImage.remove();
// console.log(imgSrc); 
// console.log(self.options["maxWidth"]+" maxWidth from swapImg");
            //   Ok, so you need to review where it looks for the image src, and how it swaps out. Also does not trigger on image fade, and doesn't seem to be updating .active
            var imgCaption=activeImg.next().next('.'+options["capName"]).html();
            var imgTitle=activeImg.attr('alt');      
            var img = new Image();
            
              $(img).load(function (response, status, xhr) {  
                if (status == "error") {
                    var msg = "Sorry but there was an error: ";
                    $("#error").html(msg + xhr.status + " " + xhr.statusText);
                  }
                else {
            //  Need to bind on each load to add click-image-to-advance
                    $(this).bind("click", function() 
                    {self.swapImg(self.element, self.options, "next");
                    });             
            // TODO:: error handling goes in the params of the complete >>> function complete(responseText, textStatus, XMLHttpRequest)] / http://api.jquery.com/load/
            //          $(this).hide();
                options["gal"].append($(this));
                options["gal"].removeClass('loading');
                var currentHeight = 0;
            //   Simplest way to proportionally scale to the size of the containing element. Figure out the aspect ratio based on the thmb, then set the appropriate dimension, removing the other one.
                var fitWidth = self._fit("maxWidth", $(this));
                var fitHeight = self._fit("maxHeight", $(this));
                 $(this).attr('width', fitWidth); 
                $(this).attr('height', fitHeight); 

    //             if (activeImg.width() > activeImg.height()){
    //                 $(this).removeAttr('height');
    //                 // console.log(fitWidth+" max width");
    // //                use _fit output!
    //               $(this).attr('width', fitWidth); 
    //             }
    //             else {
    //                 $(this).removeAttr('width');
    //                 $(this).attr('height', fitHeight);    
    //             }
                //TODO:: ok, here's an issue -- look down at the call the displayImg.load
                currentHeight = $(this).height();
                //TODO:: blah there's something here
                //TODO:: ok this is what's supposed to happen when the gallery starts. 
                options["gal"].animate({"height": currentHeight}, 500, function(){  
                    $(img).fadeIn(function(){                 
                        //TODO: titles aren't addressed right
                        $('.fgTitle', options["imgInfo"]).html(imgTitle);
                        $('.fgCaption', options["imgInfo"]).html(imgCaption);       
                    });
                });
            }
        }).attr({
            "src": imgSrc,
            "alt": imgTitle,
            "class": 'fgDisplay'});
            },
            
        galToggle: function(el) {
            /*
            if max height, gal should open to max height
            else
            gal opens to height of parent element - margin
                if parent element height = 0, use screen dimensions

            */
            var self = this;
            var gal = self.options['gal'];
            if (el == null) el = $(this.element);
            if (self.options["maxHeight"] != null){
                var openHeight = self.options["maxHeight"];
                }
            else if (self.options["fullscreen"] == true) {
                el.addClass("fullscreen");
                var openHeight = $(window).height();
            }
            else {
                var openHeight = self._fit("maxHeight", el, true);
            }
            // if gallery is open, close it
            if (el.hasClass("open")) { 
                el.removeClass("open");
                $(window).unbind("resize", fgResize); 
                // check if this is addressing correctly. if so, that'sprobably how swapImg should work
                // // console.log($('.fgDisplay', el).attr("src"));
                gal.fadeOut(function() {
                    $(el).animate({height: self.options["startHeight"]}, 1000);
                });       
            }
            // open gallery
            else {
                el.addClass("open");
                self.options["startHeight"]=el.height();
                // console.log("open");            
                //  bind resize behavior after opening               
                var doit;
                var fgResize = function() {
                    clearTimeout(doit);
                    doit = setTimeout(function () {
                        // fit image container to gallery container
                        gal.height(self._fit("maxHeight", gal, true));
                        gal.width(self._fit("maxWidth", gal, true));
                        self.swapImg(self.element, self.options, null);
                        // console.log(self.options["maxWidth"]+" maxWidth from outside Fit");
                        clearTimeout(doit);
                    }, 200);
                };

                //TODO:: factor in fullscreenness here. it's got to add the fullscreen class and resize height and width on window resize              
                $(window).bind("resize", fgResize);
                //            // console.log(options["id"]);
                //
                //TODO: WHY isn't animate working in either instance? the callback is.
                $(el).animate({height: openHeight}, 1000, function(){
                    // console.log("fuck   "+openHeight);
                    // fit image container to gallery container
                    gal.hide();
                    gal.width(self._fit("maxWidth", gal, true));
                    gal.height(self._fit("maxHeight", gal, true));
                    gal.fadeIn(function(){fgResize();});
                    // self.swapImg(el, self.options, null); 

                    // $("img", el).css({"maxHeight": self._fit("maxHeight"), "maxWidth": self._fit("maxWidth")}).fadeIn(function(){
                        /*
                            display gallery titling
                            set height of gallery container
                               basically just run fit

                        */
                //                    $('.title', this.options["imgInfo"]).html("flarb");
                //                  $('.caption', this.options["imgInfo"]).html('blarb');
                // this is how to call another method from a method           
                    // self.swapImg(el, self.options, "next"); 
                    // // console.log('howdy');
                    // });
                });
            }   
// console.log($(this.element).attr('id')+", "+this.options['maxHeight']);
        },
                
        _fit:function(opt, el, isGal) {
            var self = this;
            if (el == null) el = $(this.element);
            var selfContain = el.parent();
            // console.log("el is "+el.attr('id')+" self contain is "+selfContain.attr("class"));
            var vals = [];
            var live = [];
            var liveparent = [];
            live["maxWidth"] = self.options["gal"].width();
            live["maxHeight"] = self.options["gal"].height();
            liveparent["maxWidth"] = selfContain.width();
            liveparent["maxHeight"] = selfContain.height();
            // whuuuuhhhh??
            var containW = selfContain.width();
            var containH = selfContain.height();

            if (isGal == true) {
            // Resizing image container here

            /* ok, we need to look at the container values before we set / look at gallery values
            how big is the container
            if the container is smaller than opt.val, then
                look at live values
                get ratio
                shrink vals accordingly
            */
        
            // console.log("liveparent width and height"+liveparent["maxWidth"]+" "+liveparent["maxHeight"]+" self options opt: "+self.options[opt]+" and liveparent: "+liveparent[opt]);

                if (self.options[opt] != null && self.options[opt] > liveparent[opt]){
                    console.log("max values are less than live values");
                    // Max values are smaller than live values
                    var ratio = containW / containH;
                    // console.log("ratio is "+ratio);
                    // something weird is happening with the ratio and the margin on resize
                    if (ratio <= 1) {
                        vals["maxWidth"] = containW - self.options["margin"];
                        vals["maxHeight"] = (containH*ratio) - self.options["margin"];                    
                    }
                    else {
                        vals["maxHeight"] = containH - self.options["margin"];
                        vals["maxWidth"] = (containW*ratio) - self.options['margin']; 
                        // console.log("when it happens (gal): "+vals[opt]); 
                                                 
                    }
                    if (vals["maxHeight"] > containH) vals["maxHeight"] = containH;
                    if (vals["maxWidth"] > containW) vals["maxWidth"] = containW;
                    // vals[opt] = self.options[opt];
                }
                else {
                    if (self.options[opt] != null) {
                        vals[opt] = self.options[opt];
                    }
                    else {
                    // console.log("fart"+selfContain.attr('id'));
                    // if (selfContain > liveparent[opt]) selfContain = liveparent[];
                    vals[opt] = liveparent[opt]-self.options["margin"]-self.options["marginH"];
                    // console.log("when it happens: "+vals[opt]);                   
                    }
                }

            }
            else {
                // Fitting image 
                // console.log("containerW is "+containW+" containH is "+containH);
                // fullscreen should be toggleable, so make sure the check lets you do that. better on class?
                if (selfContain.parent().hasClass("fullscreen")) {
                    vals["maxHeight"] = $(window).height()-self.options["margin"]-self.options["marginH"];
                    vals["maxWidth"] = $(window).width()-self.options["margin"]-self.options["marginW"];
                } 
                else {
                    // check to see if maxHeight or maxWidth are set, and if they will fit within the live dimensions
                    if (self.options[opt] != null && self.options[opt] <= live[opt] && live[opt] != 0){
                        vals[opt] = self.options[opt];
                        }
                    else {
                        // now we calculate the image ratios

                        var imgRatio = el.width() / el.height();

                        console.log(el.attr("class"));
                        var galRatio = live["maxWidth"] / live["maxHeight"];
                        var disRatio = imgRatio / galRatio;
                        vals["maxWidth"] = live["maxWidth"];
                        vals["maxHeight"] = vals["maxWidth"]/imgRatio;
                        if (vals['maxHeight'] > live['maxHeight']){
                            vals['maxHeight'] = live['maxHeight'];
                            vals["maxWidth"] = vals["maxHeight"]*imgRatio;
                        } 

                    }
                    }
                }
                // console.log(vals[opt]+" is the "+opt);
                return vals[opt];                   
                },                       
                /* What we want to happen is
                    if fullscreen
                        use screen dimensions
                            on swapimage
                        gallery opens to container dimensions - margin as specified

                        on resize, keep fullscreen dimensions
                    if max dimensions
                        gallery container opens to max dimensions
                        on swapimage
                        gallery opens to container dimensions - margin as specified
                        on resize, if containing element is smaller than max dimensions, shrink gal container, preserving aspect ratio
                    else
                    gallery container opens to parent element dimensions

                    on resize fit to parent element, aspect ratio be damned

                    on swapimage
                        gallery opens to container dimensions - margin as specified
                 



                        if 
                        (so if no parent element, basically full screen)
                    if fullscreen, on resize, keep fullscreen dimensions

                    if liquid container, keep aspect ratio on resize
                    if fixed container, just fit that shit 
                TODO:: Ok here's what needs to happen.
                Check for fullscreen
                    yes -- use window dimensions, minus margin
                    no
                        is max(opt) set?
                        yes
                            does it match live(opt)?
                            yes
                                val[opt] = max(opt)
                            no 
                            <-
                        no
                            get container ratio
                            check if it's tall or wide
                            adjust accordingly
                            val[w] = container width - margin
                            val[h] = container width * ratio
                            is val[h] taller than windowH?
                            val[h]= windowH - margin
                            adjust val[w] according to ratio
                        return val(opt)
                
                
                */
        
        barf: function(blerp, blorp) {
            // console.log($(this.element).attr('id')+", "+this.options['id']);
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
