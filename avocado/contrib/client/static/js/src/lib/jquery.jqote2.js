/*
 * jQote2 - client-side Javascript templating engine
 * Copyright (C) 2010, aefxx
 * http://aefxx.com/
 *
 * Dual licensed under the WTFPL v2 or MIT (X11) licenses
 * WTFPL v2 Copyright (C) 2004, Sam Hocevar
 *
 * Date: Sat, Jun 29th, 2010
 * Version: 0.9.5
 */
(function($){var _=false,E1="UndefinedTemplateError",E2="TemplateCompilationError",E3="TemplateExecutionError",A="[object Array]",S="[object String]",F="[object Function]",n=1,c="%",q=/^[^<]*(<[\w\W]+>)[^>]*$/,ts=Object.prototype.toString;function r(e,x){throw $.extend(e,x),e;}function dns(f){var a=[];if(ts.call(f)!==A)return _;for(var i=0,l=f.length;i<l;i++)a[i]=f[i].id;return a.length?a.sort().join(".").replace(/(\b\d+\b)\.(?:\1(\.|$))+/g,"$1$2"):_}function l(s,t){var f,g=[],t=t||c,x=ts.call(s);
if(x===F)return s.jqote_id?[s]:_;if(x!==A)return[$.jqotec(s,t)];return g.length?g:_}$.fn.extend({jqote:function(x,y){var x=ts.call(x)===A?x:[x],d="";this.each(function(i){var f=$.jqotec(this,y);for(var j=0;j<x.length;j++)d+=f.call(x[j],i,j,x,f)});return d}});$.each({app:"append",pre:"prepend",sub:"html"},function(x,y){$.fn["jqote"+x]=function(e,d,t){var p,r,s=$.jqote(e,d,t),$$=!q.test(s)?function(s){return $(document.createTextNode(s))}:$;if(!!(p=dns(l(e))))r=new RegExp("(^|\\.)"+p.split(".").join("\\.(.*)?")+
"(\\.|$)");return this.each(function(){var z=$$(s);$(this)[y](z);(z[0].nodeType===3?$(this):z).trigger("jqote."+x,[z,r])})}});$.extend({jqote:function(e,d,t){var s="",t=t||c,f=l(e);if(f===_)r(new Error("Empty or undefined template passed to $.jqote"),{type:E1});d=ts.call(d)!==A?[d]:d;for(var i=0,m=f.length;i<m;i++)for(var j=0;j<d.length;j++)s+=f[i].call(d[j],i,j,d,f[i]);return s},jqotec:function(x,t){var h,e,y,t=t||c,z=ts.call(x);if(z===S&&q.test(x)){e=y=x;if(h=$.jqotecache[x])return h}else{e=z===
S||x.nodeType?$(x):x instanceof jQuery?x:null;if(!e[0]||!(y=e[0].innerHTML))r(new Error("Empty or undefined template passed to $.jqotec"),{type:E1});if(h=$.jqotecache[$.data(e[0],"jqote_id")])return h}var s="",i,a=y.replace(/\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\n\t]/g,"").split("<"+t).join(t+">\u001b").split(t+">");for(var m=0,k=a.length;m<k;m++)s+=a[m].charAt(0)!=="\u001b"?"out+='"+a[m].replace(/([^\\])?(["'])/g,"$1\\$2")+"'":a[m].charAt(1)==="="?";out+=("+a[m].substr(2)+");":";"+a[m].substr(1);s="try{"+
('var out="";'+s+";return out;").split("out+='';").join("").split('var out="";out+=').join("var out=")+'}catch(e){e.type="'+E3+'";e.args=arguments;e.template=arguments.callee.toString();throw e;}';try{var f=new Function("i, j, data, fn",s)}catch(e){r(e,{type:E2})}i=e instanceof jQuery?$.data(e[0],"jqote_id",n):e;return $.jqotecache[i]=(f.jqote_id=n++,f)},jqotefn:function(e){var t=ts.call(e),i=t===S&&q.test(e)?e:$.data($(e)[0],"jqote_id");return $.jqotecache[i]||_},jqotetag:function(s){c=s},jqotecache:{}});
$.event.special.jqote={add:function(o){var n,h=o.handler,d=!o.data?[]:ts.call(o.data)!==A?[o.data]:o.data;if(!d.length||!(n=dns(l(d))))return}}})(jQuery);
