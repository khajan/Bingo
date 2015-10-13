/**
 @file radio-controller.js
 @controller RadioController
 @description
 The following controller will be used to manage radio
 @author skhajan
 @date 8/4/2015
 */
"use strict";

define([
    "angular",
    "bingo/scripts/commons/controllers/base-widget-controller"
], function (angular, BaseWidgetController) {
    var controllerModule = angular.module("bingo.widgets.html5.radio-controller", []);
    controllerModule.controller("RadioController", RadioController);
    RadioController.$inject = ["$scope", "$attrs", "$element"];
    function RadioController($scope, $attrs, $element) {
        var vm = this;
        RadioController.super.apply(vm, arguments);
    }

    RadioController.prototype = {
        render: function(){
            console.log(arguments);
        }
    };
    return BaseWidgetController.prototype.successor(RadioController);
});