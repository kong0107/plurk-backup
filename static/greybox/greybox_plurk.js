var loc = window.location;
var GB_ROOT_DIR = loc.protocol + '//' +  loc.host + "/static/greybox/";

function showGBRegister() {

    if (!jQuery || jQuery(window).width() < 525 || jQuery(window).height() < 600){
        return true;
    }

    if (jQuery(window).width() < 768){
		GB_showFullScreen(_('Sign up for Plurk'), '/Users/showRegister?overlay=1');
		return false;
    }

    if (window.GB_showCenter){
		GB_showCenter(_('Sign up for Plurk'), '/Users/showRegister?overlay=1', 400, 660);
        	return false;
    }
    
    return true;
};

function showGBLogin() {
    if (!jQuery || jQuery(window).width() < 320 || jQuery(window).height() < 400) 
        return true;
    
    if (jQuery(window).width() < 768 && window.GB_showFullScreen){
		GB_showFullScreen(_('Plurk sign in'), '/Users/showLogin?overlay=1');
        return false;
    }

    if (window.GB_showCenter){
		GB_showCenter(_('Plurk sign in'), '/Users/showLogin?overlay=1', 400, 660);
        	return false;
    }
    
    return true;    
};


var PlurkGB = {
    showAtCenter: function(title, url, width, height) {
        if (!window.GB_showCenter || (window.jQuery && (jQuery(window).width() < width || jQuery(document).height() < height))){
            window.open(url)
            return false;
        }
        GB_showCenter(title, url, height, width);
        return false;
    }
};