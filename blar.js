   /*
                        if (galRatio <= 1 && imgRatio <= 1) {
                            // Gallery is taller than it is wide and so is image
                            console.log("case 1");
                            disRatio = galRatio / imgRatio;
                            if (disRatio >= 1){
                                // Gallery is taller 
                                console.log("case 1.1");
                                vals["maxHeight"] = live["maxHeight"];
                                vals["maxWidth"] = vals['maxHeight']/imgRatio;   
                            }
                            else {
                                // img is taller
                                console.log("case 1.2");
                                vals["maxWidth"] = live["maxWidth"];
                                vals["maxHeight"] = vals['maxWidth']*imgRatio;     
                            }
                        }

                        else if (galRatio >= 1 && imgRatio >= 1) {
                            // Gallery is wider than it is tall and so is image
                            console.log("case 2");
                            if (disRatio >= 1){
                                // Gallery is taller 
                                console.log("case 2.1");
                                vals["maxHeight"] = live["maxWidth"]*imgRatio;
                                vals["maxWidth"] = live["maxWidth"]; 
                            }
                            else {
                                // img is taller
                                console.log("case 2.2");
                                vals["maxWidth"] = live["maxHeight"]*imgRatio;
                                vals["maxHeight"] = live["maxHeight"];    
                            }
                        }

                        else if (galRatio <=1 && imgRatio >=1){ 
                            // Gallery is taller than it is wide and image is wider than it is tall
                            console.log("case 3");
                            vals["maxWidth"] = live["maxWidth"];
                            vals["maxHeight"] = vals["maxWidth"]/imgRatio;
                        }

                        else if (galRatio >=1 && imgRatio <=1) {
                            // Gallery is wider than it is tall and image is taller than it is wide
                            console.log("case 4");
                            vals["maxHeight"] = live["maxHeight"];
                            vals["maxWidth"] = vals["maxHeight"] * imgRatio;

                        }


/*
                            if (imgRatio <= 1){
                                // image is taller than it is wide
                          
                            }
                            else {
                                // image is wider than it is tall
                                vals["maxHeight"] = live["maxHeight"];
                                vals["maxWidth"] = live["maxHeight"]/imgRatio;
                            }
                        }
                        
                            // Gallery is wider than it is tall
                            if (imgRatio <= 1){
                                // image is taller than it is wide
                                vals["maxHeight"] = live["maxHeight"];
                                vals["maxWidth"] = vals["maxHeight"]*imgRatio; 
                            }
                            else {
                                // image is wider than it is tall
                                vals["maxHeight"] = live["maxHeight"]/imgRatio;
                                vals["maxWidth"] = live["maxWidth"];                            }

                                if (imgRatio <= 1) {
                            // Taller than it is wide
                            vals["maxWidth"] = live["maxWidth"];
                            vals["maxHeight"] = (live["maxWidth"]*imgRatio);
                            if (vals["maxHeight"] > containH) vals["maxHeight"] = containH;                 
                        }
                        else {
                            vals["maxWidth"] = (live["maxHeight"]*imgRatio);
                            vals["maxHeight"] = (live["maxHeight"]);
                            if (vals["maxWidth"] > containW) vals["maxWidth"] = containW;                                                     
                        }
                                */
                        // console.log("imgRatio is "+imgRatio);
                        
                                            
                            // console.log("when it happens: "+vals[opt]); 

                    //  set based on live dimensions of fgGallery parent element, minus margins
                        // vals[opt] = live[opt]; 
                        //  // console.log("when it happens: "+opt+" "+vals[opt]);  