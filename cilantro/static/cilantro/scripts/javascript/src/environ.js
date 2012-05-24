// Generated by CoffeeScript 1.3.1
(function() {

  define(['jquery', 'use!underscore', 'use!backbone', 'use!bootstrap', 'use!jquery.chosen', 'backbone.charts'], function($, _, Backbone) {
    var ATTEMPTS, CSRF_TOKEN, ERROR, LOADING, MAX_ATTEMPTS, OFFLINE, SAVED, SCRIPT_NAME, SYNCING, absolutePath, safeMethod, sameOrigin, syncStatus, _ajax;
    LOADING = 'Loading';
    SYNCING = 'Syncing';
    SAVED = 'Saved';
    OFFLINE = 'Offline';
    ERROR = 'Error';
    ATTEMPTS = 0;
    MAX_ATTEMPTS = 3;
    _.templateSettings = {
      evaluate: /\{\{\#\s*([^\s]+?)\s*\}\}/g,
      interpolate: /\{\{\s*([^\s]+?)\s*\}\}/g,
      escape: /\{\{\-\s*([^\s]+?)\s*\}\}/g
    };
    if ((SCRIPT_NAME = this.SCRIPT_NAME) === void 0) {
      throw Error('Global "SCRIPT_NAME" not defined');
    }
    if ((CSRF_TOKEN = this.CSRF_TOKEN) === void 0) {
      throw Error('Global "CSRF_TOKEN" not defined');
    }
    sameOrigin = function(url) {
      var host, origin, protocol, sr_origin;
      host = document.location.host;
      protocol = document.location.protocol;
      sr_origin = '//' + host;
      origin = protocol + sr_origin;
      return (url === origin || url.slice(0, origin.length + 1) === origin + '/') || (url === sr_origin || url.slice(0, sr_origin.length + 1) === sr_origin + '/') || !(/^(\/\/|http:|https:).*/.test(url));
    };
    safeMethod = function(method) {
      return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
    };
    absolutePath = function(path) {
      return SCRIPT_NAME + path;
    };
    syncStatus = null;
    $(function() {
      syncStatus = $('#sync-status');
      $(document).ajaxSend(function(event, xhr, settings) {
        var type;
        if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
          xhr.setRequestHeader('X-CSRFToken', CSRF_TOKEN);
        }
        type = (settings.type || 'get').toLowerCase();
        if (type === 'get') {
          return syncStatus.text(LOADING);
        } else {
          return syncStatus.text(SYNCING);
        }
      }).ajaxStop(function() {
        var visible;
        visible = syncStatus.is(':visible');
        if (ATTEMPTS === MAX_ATTEMPTS && !visible) {
          return syncStatus.fadeIn(200);
        } else if (visible) {
          return syncStatus.fadeOut(200);
        }
      }).ajaxError(function(event, xhr, settings, error) {
        if (error === 'timeout') {
          return syncStatus.text(OFFLINE);
        } else if (xhr.status >= 500) {
          return syncStatus.text(ERROR);
        }
      });
      return $(window).on('beforeunload', function() {
        if (Backbone.ajax.pending) {
          if (ATTEMPTS === MAX_ATTEMPTS) {
            return "Unfortunately, your data hasn't been saved. The server                        or your Internet connection is acting up. Sorry!";
          } else {
            syncStatus.fadeIn(200);
            return "Wow, you're quick! Your stuff is being saved.                        It will only take a moment.";
          }
        }
      });
    });
    _ajax = Backbone.ajax;
    Backbone.ajax = function(options) {
      return this.ajax.queue(options);
    };
    Backbone.ajax.pending = false;
    Backbone.ajax.requests = [];
    Backbone.ajax.requestNext = function() {
      var next;
      if ((next = this.requests.shift())) {
        return this.request(next);
      } else {
        return this.pending = false;
      }
    };
    Backbone.ajax.request = function(options, trigger) {
      var complete,
        _this = this;
      if (trigger == null) {
        trigger = true;
      }
      complete = function(xhr, status) {
        var _ref;
        if (status === 'timeout') {
          if (ATTEMPTS < MAX_ATTEMPTS) {
            ATTEMPTS++;
            return _ajax(options);
          }
        } else if ((200 <= (_ref = xhr.status) && _ref < 300)) {
          if (options.complete) {
            options.complete(arguments);
          }
          if (trigger) {
            return _this.requestNext();
          }
        }
      };
      options.complete = complete;
      _ajax(options);
      return ATTEMPTS = 1;
    };
    Backbone.ajax.queue = function(options) {
      var type;
      type = (options.type || 'get').toLowerCase();
      if (type === 'get') {
        return this.request(options, false);
      } else if (this.pending) {
        return this.requests.push(options);
      } else {
        this.pending = true;
        return this.request(options);
      }
    };
    return {
      CSRF_TOKEN: CSRF_TOKEN,
      SCRIPT_NAME: SCRIPT_NAME,
      absolutePath: absolutePath
    };
  });

}).call(this);