/*
    NAME:     DEADPIXEL.JS
    FUNCTION: PUTS AN ANNOYING RED PIXEL ON THE SCREEN
    VERSION:  1.2
    AUTHOR:   DAN HOFFMAN
*/

(function(w, d, undefined) {
    /*
        Cookie functions
        Credit to http://www.quirksmode.org/js/cookies.html
    */
    function CreateCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
            d.cookie = name+"="+value+expires+"; path=/";
    }

    function ReadCookie(name) {
        var nameEQ = name + "=";
        var ca = d.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function EraseCookie(name) {
        CreateCookie(name,"",-1);
    }

    // Main function
    function AddPixel() {
        // Pixel x and y
        var pixel_x, pixel_y;

        // Parse viewport width and height
        var width = d.documentElement ? d.documentElement.clientWidth : 0;
        var height = d.documentElement ? d.documentElement.clientHeight : 0;

        // If the browser isn't terrible
        if(width != 0 && height != 0) {

            // Check for cookies
            pixel_x = ReadCookie("pixel_x");
            pixel_y = ReadCookie("pixel_y");
            
            // If no x cookie
            if(!pixel_x) {
                // Grab a random x value from width
                pixel_x = Math.floor((Math.random()*width)+1);
                // Set 90 day cookie
                CreateCookie("pixel_x", pixel_x, 90);
            }

            // If no y cookie
            if(!pixel_y) {
                // Grab a random y value from height
                pixel_y = Math.floor((Math.random()*height)+1);
                // Set 90 day cookie
                CreateCookie("pixel_y", pixel_y, 90);
            } 

            // Create our dead pixel.
            var pixel = d.createElement("div");
                pixel.style.width = "1px";
                pixel.style.height = "1px";
                pixel.style.background = "red";
                pixel.style.position = "fixed";
                pixel.style.top = pixel_y + "px";
                pixel.style.right = pixel_x + "px";

                // 16-bit signed integer for old phones
                pixel.style.zIndex = "65536"; 

            // Add dead pixel to our page body
            d.body.appendChild(pixel);
        }
    }
    
    // Add event listener to the window
    if(!w.addEventListener) {
        w.attachEvent("onload", AddPixel);
    } else {
        w.addEventListener("load", AddPixel, false);
    }

// Pass in window, document and undefined   
})(this, this.document);
