/*!
 * jQuery blockUI plugin
 * Version 2.33 (29-MAR-2010)
 * @requires jQuery v1.2.3 or later
 *
 * Examples at: http://malsup.com/jquery/block/
 * Copyright (c) 2007-2008 M. Alsup
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Thanks to Amir-Hossein Sobhi for some excellent contributions!
 */
(function(b){function r(c,a){var e=c==window,d=a&&a.message!==undefined?a.message:undefined;a=b.extend({},b.blockUI.defaults,a||{});a.overlayCSS=b.extend({},b.blockUI.defaults.overlayCSS,a.overlayCSS||{});var g=b.extend({},b.blockUI.defaults.css,a.css||{}),i=b.extend({},b.blockUI.defaults.themedCSS,a.themedCSS||{});d=d===undefined?a.message:d;e&&k&&o(window,{fadeOut:0});if(d&&typeof d!="string"&&(d.parentNode||d.jquery)){var h=d.jquery?d[0]:d,f={};b(c).data("blockUI.history",f);f.el=h;f.parent=h.parentNode;
f.display=h.style.display;f.position=h.style.position;f.parent&&f.parent.removeChild(h)}f=a.baseZ;var l=b.browser.msie||a.forceIframe?b('<iframe class="blockUI" style="z-index:'+f++ +';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+a.iframeSrc+'"></iframe>'):b('<div class="blockUI" style="display:none"></div>');h=b('<div class="blockUI blockOverlay" style="z-index:'+f++ +';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');
f=b(a.theme&&e?'<div class="blockUI blockMsg blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+f+';display:none;position:fixed"><div class="ui-widget-header ui-dialog-titlebar blockTitle">'+(a.title||"&nbsp;")+'</div><div class="ui-widget-content ui-dialog-content"></div></div>':a.theme?'<div class="blockUI blockMsg blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+f+';display:none;position:absolute"><div class="ui-widget-header ui-dialog-titlebar blockTitle">'+(a.title||
"&nbsp;")+'</div><div class="ui-widget-content ui-dialog-content"></div></div>':e?'<div class="blockUI blockMsg blockPage" style="z-index:'+f+';display:none;position:fixed"></div>':'<div class="blockUI blockMsg blockElement" style="z-index:'+f+';display:none;position:absolute"></div>');if(d)if(a.theme){f.css(i);f.addClass("ui-widget-content")}else f.css(g);if(!a.applyPlatformOpacityRules||!(b.browser.mozilla&&/Linux/.test(navigator.platform)))h.css(a.overlayCSS);h.css("position",e?"fixed":"absolute");
if(b.browser.msie||a.forceIframe)l.css("opacity",0);g=[l,h,f];var z=e?b("body"):b(c);b.each(g,function(){this.appendTo(z)});a.theme&&a.draggable&&b.fn.draggable&&f.draggable({handle:".ui-dialog-titlebar",cancel:"li"});g=A&&(!b.boxModel||b("object,embed",e?null:c).length>0);if(s||g){e&&a.allowBodyStretch&&b.boxModel&&b("html,body").css("height","100%");if((s||!b.boxModel)&&!e){g=n(c,"borderTopWidth");i=n(c,"borderLeftWidth");var t=g?"(0 - "+g+")":0,u=i?"(0 - "+i+")":0}b.each([l,h,f],function(B,C){var j=
C[0].style;j.position="absolute";if(B<2){e?j.setExpression("height","Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:"+a.quirksmodeOffsetHack+') + "px"'):j.setExpression("height",'this.parentNode.offsetHeight + "px"');e?j.setExpression("width",'jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'):j.setExpression("width",'this.parentNode.offsetWidth + "px"');u&&j.setExpression("left",u);t&&j.setExpression("top",t)}else if(a.centerY){e&&
j.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"');j.marginTop=0}else if(!a.centerY&&e){var D="((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "+(a.css&&a.css.top?parseInt(a.css.top):0)+') + "px"';j.setExpression("top",D)}})}if(d){a.theme?f.find(".ui-widget-content").append(d):
f.append(d);if(d.jquery||d.nodeType)b(d).show()}if((b.browser.msie||a.forceIframe)&&a.showOverlay)l.show();if(a.fadeIn){g=a.onBlock?a.onBlock:p;l=a.showOverlay&&!d?g:p;g=d?g:p;a.showOverlay&&h._fadeIn(a.fadeIn,l);d&&f._fadeIn(a.fadeIn,g)}else{a.showOverlay&&h.show();d&&f.show();a.onBlock&&a.onBlock()}v(1,c,a);if(e){k=f[0];m=b(":input:enabled:visible",k);a.focusInput&&setTimeout(w,20)}else E(f[0],a.centerX,a.centerY);if(a.timeout){d=setTimeout(function(){e?b.unblockUI(a):b(c).unblock(a)},a.timeout);
b(c).data("blockUI.timeout",d)}}function o(c,a){var e=c==window,d=b(c),g=d.data("blockUI.history"),i=d.data("blockUI.timeout");if(i){clearTimeout(i);d.removeData("blockUI.timeout")}a=b.extend({},b.blockUI.defaults,a||{});v(0,c,a);var h;h=e?b("body").children().filter(".blockUI").add("body > .blockUI"):b(".blockUI",c);if(e)k=m=null;if(a.fadeOut){h.fadeOut(a.fadeOut);setTimeout(function(){x(h,g,a,c)},a.fadeOut)}else x(h,g,a,c)}function x(c,a,e,d){c.each(function(){this.parentNode&&this.parentNode.removeChild(this)});
if(a&&a.el){a.el.style.display=a.display;a.el.style.position=a.position;a.parent&&a.parent.appendChild(a.el);b(d).removeData("blockUI.history")}typeof e.onUnblock=="function"&&e.onUnblock(d,e)}function v(c,a,e){var d=a==window;a=b(a);if(!(!c&&(d&&!k||!d&&!a.data("blockUI.isBlocked")))){d||a.data("blockUI.isBlocked",c);!e.bindEvents||c&&!e.showOverlay||(c?b(document).bind("mousedown mouseup keydown keypress",e,y):b(document).unbind("mousedown mouseup keydown keypress",y))}}function y(c){if(c.keyCode&&
c.keyCode==9)if(k&&c.data.constrainTabKey){var a=m,e=c.shiftKey&&c.target==a[0];if(!c.shiftKey&&c.target==a[a.length-1]||e){setTimeout(function(){w(e)},10);return false}}if(b(c.target).parents("div.blockMsg").length>0)return true;return b(c.target).parents().children().filter("div.blockUI").length==0}function w(c){if(m)(c=m[c===true?m.length-1:0])&&c.focus()}function E(c,a,e){var d=c.parentNode,g=c.style,i=(d.offsetWidth-c.offsetWidth)/2-n(d,"borderLeftWidth");c=(d.offsetHeight-c.offsetHeight)/2-
n(d,"borderTopWidth");if(a)g.left=i>0?i+"px":"0";if(e)g.top=c>0?c+"px":"0"}function n(c,a){return parseInt(b.css(c,a))||0}if(/1\.(0|1|2)\.(0|1|2)/.test(b.fn.jquery)||/^1.1/.test(b.fn.jquery))alert("blockUI requires jQuery v1.2.3 or later!  You are using v"+b.fn.jquery);else{b.fn._fadeIn=b.fn.fadeIn;var p=function(){},q=document.documentMode||0,A=b.browser.msie&&(b.browser.version<8&&!q||q<8),s=b.browser.msie&&/MSIE 6.0/.test(navigator.userAgent)&&!q;b.blockUI=function(c){r(window,c)};b.unblockUI=
function(c){o(window,c)};b.growlUI=function(c,a,e,d){var g=b('<div class="growlUI"></div>');c&&g.append("<h1>"+c+"</h1>");a&&g.append("<h2>"+a+"</h2>");if(e==undefined)e=3E3;b.blockUI({message:g,fadeIn:700,fadeOut:1E3,centerY:false,timeout:e,showOverlay:false,onUnblock:d,css:b.blockUI.defaults.growlCSS})};b.fn.block=function(c){return this.unblock({fadeOut:0}).each(function(){if(b.css(this,"position")=="static")this.style.position="relative";if(b.browser.msie)this.style.zoom=1;r(this,c)})};b.fn.unblock=
function(c){return this.each(function(){o(this,c)})};b.blockUI.version=2.33;b.blockUI.defaults={message:"<h1>Please wait...</h1>",title:null,draggable:true,theme:false,css:{padding:0,margin:0,width:"30%",top:"40%",left:"35%",textAlign:"center",color:"#000",border:"3px solid #aaa",backgroundColor:"#fff",cursor:"wait"},themedCSS:{width:"30%",top:"40%",left:"35%"},overlayCSS:{backgroundColor:"#000",opacity:0.6,cursor:"wait"},growlCSS:{width:"350px",top:"10px",left:"",right:"10px",border:"none",padding:"5px",
opacity:0.6,cursor:"default",color:"#fff",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px","border-radius":"10px"},iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",forceIframe:false,baseZ:1E3,centerX:true,centerY:true,allowBodyStretch:true,bindEvents:true,constrainTabKey:true,fadeIn:200,fadeOut:400,timeout:0,showOverlay:true,focusInput:true,applyPlatformOpacityRules:true,onBlock:null,onUnblock:null,quirksmodeOffsetHack:4};var k=null,
m=[]}})(jQuery);