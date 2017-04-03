var loading = AJS.$('loading');
var gb_type = GB.type;
var gb_url = GB.url;


//Start loading in the iframe
if(gb_type == "page") {
  document.write('<iframe id="GB_frame" src="' + gb_url + '" frameborder="0"></iframe>');
}
else {
  var img_holder = new Image();
  img_holder.src = gb_url;
  document.write('<img id="GB_frame" src="' + gb_url + '" style="cursor: pointer" onclick="top.GB_hide()">');
}

var frame = AJS.$('GB_frame');
function setupOuterGB() {
    frame.style.visibility = 'visible';
    GB.setFrameSize();
    GB.setWindowPosition();
}


function loaded() {
    if(gb_type == "image") {
        if(img_holder.width != 0 && img_holder.height != 0) {
            var width = img_holder.width;
            var height = img_holder.height;

            var viewport = top.AJS.getWindowSize();
            var ratio = height/width;

            if ((viewport.w-40) < width){
            	width = viewport.w - 120;
            	height = width*ratio;
            }

            GB.width = width;
            GB.height = height;

            img_holder.width = width;
            img_holder.height = height;

            setTimeout(function() {
                AJS.removeElement(loading);
                setupOuterGB();
            }, 100);
        }
        else {
            return setTimeout(loaded, 500);
        }
    }
    else {
        AJS.removeElement(loading);
        GB.width = frame.offsetWidth;
        GB.height = frame.offsetHeight;
        setupOuterGB();
        GB.setFrameSize(GB.iframe, frame.offsetHeight);
    }
}

if(GB.show_loading) {
    AJS.AEV(window, 'lazy_load', function(e) {
        loaded();
    });
}
else {
    loaded();
}

AJS.AEV(window, 'resize', function() {
    if(AJS.isOpera())
        AJS.setHeight(frame, GB.height);
});
