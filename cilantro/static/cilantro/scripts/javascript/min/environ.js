define(["jquery","underscore","backbone","core/mixins","bootstrap","jquery.ui","panels","utils/scroller"],function($,_,Backbone,Mixins){var ATTEMPTS,CSRF_TOKEN,DONE,ERROR,LOADING,MAX_ATTEMPTS,OFFLINE,SAVED,SCRIPT_NAME,SYNCING,absolutePath,safeMethod,sameOrigin,syncStatus,_ajax;App.Models={},App.Views={},LOADING="Loading",SYNCING="Syncing",SAVED="Saved",OFFLINE="Offline",ERROR="Error",DONE="Done",ATTEMPTS=0,MAX_ATTEMPTS=3,_.templateSettings={evaluate:/\{\{\#\s*([^\s]+?)\s*\}\}/g,interpolate:/\{\{\s*([^\s]+?)\s*\}\}/g,escape:/\{\{\-\s*([^\s]+?)\s*\}\}/g};if((SCRIPT_NAME=this.SCRIPT_NAME)===void 0)throw Error('Global "SCRIPT_NAME" not defined');if((CSRF_TOKEN=this.CSRF_TOKEN)===void 0)throw Error('Global "CSRF_TOKEN" not defined');return sameOrigin=function(url){var host,origin,protocol,sr_origin;return host=document.location.host,protocol=document.location.protocol,sr_origin="//"+host,origin=protocol+sr_origin,url===origin||url.slice(0,origin.length+1)===origin+"/"||url===sr_origin||url.slice(0,sr_origin.length+1)===sr_origin+"/"||!/^(\/\/|http:|https:).*/.test(url)},safeMethod=function(method){return/^(GET|HEAD|OPTIONS|TRACE)$/.test(method)},absolutePath=function(path){return(SCRIPT_NAME!=null?SCRIPT_NAME.charAt(SCRIPT_NAME.length-1):void 0)!=="/"?SCRIPT_NAME+"/"+path:SCRIPT_NAME+path},syncStatus=$("<div id=sync-status></div>").addClass("alert"),$(document).ajaxSend(function(event,xhr,settings){var type;return syncStatus.removeClass("alert-danger"),!safeMethod(settings.type)&&sameOrigin(settings.url)&&xhr.setRequestHeader("X-CSRFToken",CSRF_TOKEN),type=(settings.type||"get").toLowerCase(),type==="get"?syncStatus.text(LOADING):syncStatus.text(SYNCING)}).ajaxStop(function(){var visible;visible=syncStatus.is(":visible");if(ATTEMPTS===MAX_ATTEMPTS&&!visible)return syncStatus.fadeIn(200);syncStatus.text(DONE);if(visible)return syncStatus.fadeOut(200)}).ajaxError(function(event,xhr,settings,error){if(error==="timeout")return syncStatus.text(OFFLINE);if(xhr.status>=500)return syncStatus.text(ERROR).addClass("alert-danger")}),$(window).on("beforeunload",function(){if(Backbone.ajax.pending)return ATTEMPTS===MAX_ATTEMPTS?"Unfortunately, your data hasn't been saved. The server                    or your Internet connection is acting up. Sorry!":(syncStatus.fadeIn(200),"Wow, you're quick! Your stuff is being saved.                    It will only take a moment.")}),_.extend(Backbone.View.prototype,Mixins.Deferrable),_.extend(Backbone.Model.prototype,Mixins.Deferrable),_.extend(Backbone.Collection.prototype,Mixins.Deferrable),_.extend(Backbone.Router.prototype,Mixins.Deferrable),_ajax=Backbone.ajax,Backbone.ajax=function(options){return this.ajax.queue(options)},Backbone.ajax.pending=!1,Backbone.ajax.requests=[],Backbone.ajax.requestNext=function(){var args,options,promise;return(args=this.requests.shift())?(options=args[0],promise=args[1],this.request(options,promise)):this.pending=!1},Backbone.ajax.request=function(_options,promise,trigger){var complete,error,options,params,success,_this=this;return trigger==null&&(trigger=!0),options=_.extend({},_options),success=options.success,error=options.error,complete=options.complete,params={complete:function(xhr,status){var _ref;if(status==="timeout"){if(ATTEMPTS<MAX_ATTEMPTS)return _ajax(params)}else{if(!(200<=(_ref=xhr.status)&&_ref<300))return _this.pending=!1;complete&&complete.apply(_this,arguments);if(trigger)return _this.requestNext()}},success:function(){return success&&success.apply(this,arguments),promise.resolveWith(this,arguments)},error:function(xhr,status,err){return status==="timeout"&&ATTEMPTS<MAX_ATTEMPTS?ATTEMPTS++:(error&&error.apply(this,arguments),promise.rejectWith(this,arguments))}},params=_.extend(options,params),_ajax(params),ATTEMPTS=1},Backbone.ajax.queue=function(options){var promise,type;return type=(options.type||"get").toLowerCase(),promise=$.Deferred(),type==="get"?this.request(options,promise,!1):this.pending?this.requests.push([options,promise]):(this.pending=!0,this.request(options,promise)),promise},$(function(){return syncStatus.appendTo("body")}),{CSRF_TOKEN:CSRF_TOKEN,SCRIPT_NAME:SCRIPT_NAME,absolutePath:absolutePath}})