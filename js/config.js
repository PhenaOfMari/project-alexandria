requirejs.config({
    urlArgs: 'bust=' + (new Date()).getTime(),
    baseUrl: 'js',
    deps: ['main'],
    paths: {
        'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min',
        'lodash': 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.2/lodash.min',
        'underscore': 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
        'backbone': 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min',
        'backbone.radio': 'https://cdnjs.cloudflare.com/ajax/libs/backbone.radio/2.0.0/backbone.radio.min',
        'marionette': 'https://cdnjs.cloudflare.com/ajax/libs/backbone.marionette/3.1.0/backbone.marionette.min',
        'handlebars': 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.6/handlebars.min',
        'require': 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.2/require.min',
        text: 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
        'templates': '/assets/templates',
        'json': '/assets/json'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'lodash': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Bb'
        },
        'marionette': {
            deps: ['backbone', 'backbone.radio'],
            exports: 'Mn'
        }
    }
});
