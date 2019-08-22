
$(document).ready(function() {
    var kk = setInterval(
        function() {
            var xRam = Math.floor(Math.random()*250+3);
            var yRam = Math.floor(Math.random()*250+5);

            var leftNow = parseInt( $(".pig")[0].style.left.replace("px",""));
            var topNow = parseInt( $(".pig")[0].style.top.replace("px",""));

            var xPx = "";
            var xPx = "";

            if(leftNow < 0){
                xPx = "100px";
            }else if( xRam%2 == 0){
                xPx = "+=" + xRam + "px";
            }else{
                xPx = "-=" + xRam + "px";
            }
            if(topNow < 0){
                yPx = "100px";
            }else if( yRam%2 == 0){
                yPx = "+=" + yRam + "px";
            }else{
                yPx = "-=" + yRam + "px";
        }
            $(".pig").animate({
                left:xPx,
                top: yPx
        });
    },1000);
});