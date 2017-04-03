var GB_LOADING = false;
var GB_CURRENT=[];
GB_hide=function(cb){
GB_CURRENT.pop().hide(cb);
};
GB_getLast=function(){
return AJS.getLast(GB_CURRENT);
};
GreyBox=new AJS.Class({init:function(_2){
this.use_fx=AJS.fx;
this.type="page";
this.overlay_click_close=true;
this.salt=0;
this.root_dir=GB_ROOT_DIR;
this.callback_fns=[];
this.overlay_opacity = false;
this.reload_on_close=false;
this.src_loader = "/static/loader_frame.html?cCache=20100930";
this.cur_zindex=10000;
var _3=window.location.hostname.indexOf("www");
var _4=this.src_loader.indexOf("www");
if(_3!=-1&&_4==-1){
this.src_loader=this.src_loader.replace("://","://www.");
}
if(_3==-1&&_4!=-1){
this.src_loader=this.src_loader.replace("://www.","://");
}
this.show_loading=true;
AJS.update(this,_2);
},addCallback:function(fn){
if(fn){
this.callback_fns.push(fn);
}
},show:function(_6){
if(GB_LOADING)
    return false;
GB_LOADING = true;
if(GB_getLast()){
this.cur_zindex=GB_getLast().cur_zindex+500;
}
GB_CURRENT.push(this);
this.url=_6;
var _7=[AJS.$bytc("object"),AJS.$bytc("select")];
AJS.map(AJS.flattenList(_7),function(_8){
if(_8.style.visibility != 'hidden') {
    _8._gb_vis = 1;
    _8.style.visibility="hidden";
}
});
this.createElements();
setTimeout(function() {
    GB_LOADING = false;
}, 100);
return false;
},

hide:function(cb){

    var me=this;

    setTimeout(function(){
        
        if(AJS.isIe()){
            var iframe = AJS.$bytc('iframe', 'youtube-player');
        
            if(iframe.length > 0){
                iframe[0].src = null;
            }        
        }
        
        var _b=me.callback_fns;
        if(_b!=[]){
            AJS.map(_b,function(fn){
                fn();
            });
        }
    
        me.onHide();
        
        if(me.use_fx){
            var _d=me.overlay;
            AJS.fx.fadeOut(me.overlay,{onComplete:function(){
                AJS.removeElement(_d);
                _d=null;
            },duration:300});
            AJS.removeElement(me.g_window);
        }else{
            AJS.removeElement(me.g_window,me.overlay);
        }
        
        me.removeFrame();
        
        AJS.REV(window,"scroll",_GB_setOverlayDimension);
        AJS.REV(window,"resize",_GB_update);
        var _e=[AJS.$bytc("object"),AJS.$bytc("select")];
        AJS.map(AJS.flattenList(_e),function(_f){
            if(_f._gb_vis == 1) {
                _f._gb_vis = 0
                _f.style.visibility="visible";
            }
        });
    
        if(me.reload_on_close && GB_CURRENT.length == 0) {
            window.location.reload();
        }
    
        if(AJS.isFunction(cb)){
            cb();
        }
    
    },10);
},

update:function(){
this.setOverlayDimension();
this.setFrameSize();
this.setWindowPosition();
},createElements:function(){
this.initOverlay();
this.g_window=AJS.DIV({"class":"GB_window"});
if(this.win_class){
AJS.addClass(this.g_window,this.win_class);
}
this.g_window.style.zIndex=this.cur_zindex+100;
AJS.hideElement(this.g_window);
AJS.getBody().insertBefore(this.g_window,this.overlay.nextSibling);
this.initFrame();
this.initHook();
this.update();
var me=this;
if(this.use_fx){
AJS.fx.fadeIn(this.overlay,{duration:300,to:0.7,onComplete:function(){
me.onShow();
AJS.showElement(me.g_window);
me.startLoading();
}});
}else{
if(this.overlay_opacity)
    AJS.setOpacity(this.overlay,this.overlay_opacity);
AJS.showElement(this.g_window);
this.onShow();
this.startLoading();
}
AJS.AEV(window,"scroll",_GB_setOverlayDimension);
AJS.AEV(window,"resize",_GB_update);
},removeFrame:function(){
try{
discardElement(this.iframe);
}
catch(e){
}
this.iframe=null;
},startLoading:function(){
this.iframe.src=this.src_loader+"?s="+this.salt++;
setTimeout("AJS.showElement(this.iframe)",1000);
},setOverlayDimension:function(){
var _11=AJS.getWindowSize();
AJS.setWidth(this.overlay,"100%");
var _12=Math.max(AJS.getScrollTop()+_11.h,AJS.getScrollTop()+this.height);
if(_12<AJS.getScrollTop()){
AJS.setHeight(this.overlay,_12);
}else{
AJS.setHeight(this.overlay,AJS.getScrollTop()+_11.h);
}
},initOverlay:function(){
this.overlay=AJS.DIV({"class":"GB_overlay"});
this.overlay.style.zIndex=this.cur_zindex;
if(this.overlay_click_close){
AJS.AEV(this.overlay,"click",GB_hide);
}
if(this.overlay_opacity)
    AJS.setOpacity(this.overlay,0);
this.overlay.style.backgroundColor = 'transparent';
AJS.getBody().insertBefore(this.overlay,AJS.getBody().firstChild);
},initFrame:function(){
if(!this.iframe){
var d={"name":"GB_frame","class":"GB_frame","frameBorder":0,"id":"settingFrame","scrolling":"no"};
if(AJS.isIe()){
d.src="javascript:false;document.write(\"\");";
}
this.iframe=AJS.IFRAME(d);
this.middle_cnt=AJS.DIV({"class":"content"},AJS.DIV({c:"iframe_holder"},this.iframe));
this.top_cnt=AJS.DIV();
this.bottom_cnt=AJS.DIV();
AJS.ACN(this.g_window,this.top_cnt,this.middle_cnt,this.bottom_cnt);
}
},onHide:function(){
},onShow:function(){
},setFrameSize:function(){
},setWindowPosition:function(){
},initHook:function(){
}});
_GB_update=function(){
if(GB_getLast()){
GB_getLast().update();
}
};
_GB_setOverlayDimension=function(){
if(GB_getLast()){
GB_getLast().setOverlayDimension();
}
};
script_loaded=true;
var GB_SETS={};
function decoGreyboxLinks(){
var as=AJS.$bytc("a");
AJS.map(as,function(a){
if(a.getAttribute("href")&&a.getAttribute("rel")){
var rel=a.getAttribute("rel");
if(rel.indexOf("gb_")==0){
var _17=rel.match(/\w+/)[0];
var _18=rel.match(/\[(.*)\]/)[1];
var _19=0;
var _1a={"caption":a.title||"","url":a.href};
if(_17=="gb_pageset"||_17=="gb_imageset"){
if(!GB_SETS[_18]){
GB_SETS[_18]=[];
}
GB_SETS[_18].push(_1a);
_19=GB_SETS[_18].length;
}
if(_17=="gb_pageset"){
a.onclick=function(){
GB_showFullScreenSet(GB_SETS[_18],_19);
return false;
};
}
if(_17=="gb_imageset"){
a.onclick=function(){
GB_showImageSet(GB_SETS[_18],_19);
return false;
};
}
if(_17=="gb_image"){
a.onclick=function(){
GB_showImage(_1a.caption,_1a.url);
return false;
};
}
if(_17=="gb_page"){
a.onclick=function(){
var sp=_18.split(/, ?/);
GB_show(_1a.caption,_1a.url,parseInt(sp[1]),parseInt(sp[0]));
return false;
};
}
if(_17=="gb_page_fs"){
a.onclick=function(){
GB_showFullScreen(_1a.caption,_1a.url);
return false;
};
}
if(_17=="gb_page_center"){
a.onclick=function(){
var sp=_18.split(/, ?/);
GB_showCenter(_1a.caption,_1a.url,parseInt(sp[1]),parseInt(sp[0]));
return false;
};
}
}
}
});
}
AJS.AEV(window,"load",decoGreyboxLinks);
GB_show=function(_1d,url,_1f,_20,_21){
var _22={caption:_1d,height:_1f||500,width:_20||500,fullscreen:false,callback_fn:_21};
var win=new GB_Window(_22);
return win.show(url);
};
GB_showCenter=function(_24,url,_26,_27,_28){
var _29={caption:_24,center_win:true,height:_26||500,width:_27||500,fullscreen:false,callback_fn:_28};
var win=new GB_Window(_29);
return win.show(url);
};
GB_showFullScreen=function(_2b,url,_2d){
var _2e={caption:_2b,fullscreen:true,callback_fn:_2d};
var win=new GB_Window(_2e);
return win.show(url);
};
GB_Window=GreyBox.extend({init:function(_30){
this.parent({});
this.img_header=this.root_dir+"header_bg.gif";
this.show_close_img=true;
AJS.update(this,_30);
this.addCallback(this.callback_fn);
},initHook:function(){
AJS.addClass(this.g_window,"GB_Window");
this.header=AJS.TABLE({"class":"header"});
this.header.style.backgroundImage="url("+this.img_header+")";
var _31= AJS.setHTML(AJS.TD({"class":"caption"}) ,this.caption);
var _32=AJS.TD({"class":"close"});
if(this.show_close_img){
var _34=AJS.SPAN({"id":"gb_close_btn"}, ".");
var btn=AJS.DIV(_34);
AJS.AEV([_34],"mouseover",function(){
AJS.addClass(_34,"on");
});
AJS.AEV([_34],"mouseout",function(){
AJS.removeClass(_34,"on");
});
AJS.AEV([_34],"mousedown",function(){
AJS.addClass(_34,"click");
});
AJS.AEV([_34],"mouseup",function(){
AJS.removeClass(_34,"click");
});
AJS.AEV([_34],"click",GB_hide);
AJS.ACN(_32,btn);
}
tbody_header=AJS.TBODY();
AJS.ACN(tbody_header,AJS.TR(_31,_32));
AJS.ACN(this.header,tbody_header);
AJS.ACN(this.top_cnt,this.header);
if(this.fullscreen){
AJS.AEV(window,"scroll",AJS.$b(this.setWindowPosition,this));
}
},setFrameSize:function(){
if(this.fullscreen){
var _36=AJS.getWindowSize();
overlay_h=_36.h;
this.width=Math.round(this.overlay.offsetWidth-(this.overlay.offsetWidth/100)*10);
this.height=Math.round(overlay_h-(overlay_h/100)*10);
}
var ih=AJS.$bytc("div", "iframe_holder");
var tb=AJS.$bytc("div", "content");
var gw=AJS.$bytc("div", "GB_Window");
var tw = this.width;

AJS.setWidth(this.header,tw+2);

AJS.setWidth(this.iframe,tw);

AJS.setHeight(this.iframe, this.height);

},setWindowPosition:function(){
var _37=AJS.getWindowSize();
AJS.setLeft(this.g_window,((_37.w-this.width)/2)-13);
if(!this.center_win){
AJS.setTop(this.g_window,AJS.getScrollTop()+30);
}else{
var fl=((_37.h-this.height)/2)-20+AJS.getScrollTop();
if(fl<0){
fl=0;
}
AJS.setTop(this.g_window,fl);
}
}});

GB_showHTML = function(caption, html, /* optional */ height, width, callback_fn, center_win) {
    var options = {
        caption: caption,
        height: height || 500,
        width: width || 500,
        overlay_click_close: true,
        fullscreen: false,
        callback_fn: callback_fn,
        overlay_opacity: 0,
        use_fx: false,
        center_win: center_win
    }

    var win = new GB_HTMLWindow(html, options);
    return win.show();
}

GB_HTMLWindow = GB_Window.extend({
    init: function(elm, options) {
        this.elm = elm;
        this.parent(options);
        this.overlay_opacity = 0;
    },

    initFrame: function() {
        if(!this.iframe) {
            this.iframe = AJS.DIV(this.elm);
            this.middle_cnt = AJS.DIV({'class': 'content'}, AJS.DIV({c:"iframe_holder"},this.iframe));
            this.top_cnt = AJS.DIV();
            this.bottom_cnt = AJS.DIV();
            AJS.ACN(this.g_window, this.top_cnt, this.middle_cnt, this.bottom_cnt);
        }
    },

    initOverlay: function() {
        this.parent();
        this.overlay.style.backgroundColor = 'transparent';
    },

    setFrameSize: function() {
    	var tb=AJS.$bytc("div", "content");
		var gw=AJS.$bytc("div", "GB_Window");
		var tw = this.width;
		AJS.setWidth(this.header,tw-2);
        AJS.setWidth(this.iframe,tw-4);
    }
});

function setPngBg(elm, bg) {
    elm.style.background = bg;
}

function GB_openExternal(url) {
    var current = AJS.getLast(GB_CURRENT);
    var height = Math.min(450, current.height);
    window.open(url, current.caption, 'width=' + current.width + '&height=' + height);
    top.GB_hide();
}

script_loaded=true;
