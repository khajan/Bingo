/**
 * Created by sKhajan
 * Date 4/1/2015.
 */

'use strict';

if(window.__karma__) {
    var allTestFiles = [];
    var TEST_REGEXP = /spec\.js$/;

    var pathToModule = function(path) {
        return path.replace(/^\/base\/app\//, '').replace(/\.js$/, '');
    };

    Object.keys(window.__karma__.files).forEach(function(file) {
        if (TEST_REGEXP.test(file)) {
            // Normalize paths to RequireJS module names.
            allTestFiles.push(pathToModule(file));
        }
    });
}

require.config({
    // alias libraries paths
    paths: {
        'domReady': 			'bingo/thirdparty/require-js/domReady',
        'jquery': 				'bingo/thirdparty/jquery/jquery-1.11.2',
        'bootstrap': 			'bingo/thirdparty/bootstrap-3.3.4-dist/js/bootstrap',
        'angular': 				'bingo/thirdparty/angular-1.3.9/angular',
        'angular-resource': 	'bingo/thirdparty/angular-1.3.9/angular-resource',
        'angular-sanitize': 	'bingo/thirdparty/angular-1.3.9/angular-sanitize',
        'angular-bootstrap': 	'bingo/thirdparty/angular-1.3.9/docs/js/angular-bootstrap/bootstrap',
        'angular-route': 		'bingo/thirdparty/angular-1.3.9/angular-route',
        'angular-touch': 		'bingo/thirdparty/angular-1.3.9/angular-touch',
        'angular-animate': 		'bingo/thirdparty/angular-1.3.9/angular-animate',
        'angular-aria': 		'bingo/thirdparty/angular-1.3.9/angular-aria',
        'angular-cookies': 		'bingo/thirdparty/angular-1.3.9/angular-cookies',
        'angular-loader': 		'bingo/thirdparty/angular-1.3.9/angular-loader',
        'angular-scenario': 	'bingo/thirdparty/angular-1.3.9/angular-scenario',
        'angular-messages': 	'bingo/thirdparty/angular-1.3.9/angular-messages'
    },

    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'domReady': {exports: 'domReady'},
        'jquery': {exports: 'jquery'},
        'bootstrap': {deps: ['jquery'], exports: 'bootstrap'},
        'angular': {deps: ['jquery'], exports: 'angular'},
        'angular-resource': {deps: ['angular']},
        'angular-sanitize': {deps: ['angular']},
        'angular-bootstrap': {deps: ['angular']},
        'angular-route': {deps: ['angular']},
        'angular-touch': {deps: ['angular']},
        'angular-animate': {deps: ['angular']},
        'angular-aria': {deps: ['angular']},
        'angular-cookies': {deps: ['angular']},
        'angular-loader': {deps: ['angular']},
        'angular-scenario': {deps: ['angular']},
        'angular-messages': {deps: ['angular']}
    },
    priority: [ "angular" ],
    deps: window.__karma__ ? allTestFiles : [],
    callback: window.__karma__ ? window.__karma__.start : null,
    baseUrl: window.__karma__ ? '/' : '/'
});

require([
        'angular',
        'bingo/examples/demo'
    ], function(angular, demo) {
        var body = angular.element('body');
        body.ready(function() {
            angular.bootstrap(body, ['app']);
        });
    }
);