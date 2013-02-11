define [
    'jquery'
    'underscore'
    'backbone'
    'serrano'
    'mediator'
    './utils'
    './session'

    # Core plugins that extend various libraries such as Backbone and jQuery.
    # Note, these are applied in place.
    'plugins/js'
    'plugins/jquery-ajax-queue'
    'plugins/backbone-deferrable'
], ($, _, Backbone, Serrano, mediator, utils, session) ->

    # Relies on the jquery-ajax-queue plugin to supply this method.
    # This ensures data is not silently lost
    $(window).on 'beforeunload', ->
       if $.hasPendingRequest()
           return "Wow, you're quick! Your data is being saved.
               It will only take a moment."

    currentSession = null

    c = config: @cilantro or {}

    props = { $, _, Backbone, utils }

    aliases =
        dom: $
        ajax: $.ajax

    methods =
        getOption: (key) ->
            utils.getDotProp(c.config, key)

        setOption: (key, value) ->
            utils.setDotProp(c.config, key, value)

        openSession: (url, credentials) ->
            url ?= @getOption('url')
            credentials ?= @getOption('credentials')
            session.openSession url, credentials, (sessionData) ->
                currentSession = _.clone sessionData

        closeSession: ->
            session.closeSession ->
                currentSession = null

        getCurrentSession: ->
            currentSession?.root

        getSessionUrl: (name) ->
            session.getSessionUrl(currentSession, name)

    channels = _.extend {}, session.channels, Serrano.channels

    # Construct the base object which is composed core libraries, the
    # mediator methods, and the app-level config
    return _.extend c, mediator, channels, props, aliases, methods