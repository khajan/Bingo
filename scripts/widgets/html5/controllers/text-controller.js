/**
 @file text-controller.js
 @controller TextController
 @description
 The following controller will be used to manage text
 @author skhajan
 @date 7/30/2015
 */
"use strict";

define([
    "angular",
    "bingo/scripts/commons/controllers/base-widget-controller"
], function (angular, BaseWidgetController) {
    var controllerModule = angular.module("bingo.widgets.html5.text-controller", []);
    controllerModule.controller("TextController", TextController);
    TextController.$inject = ["$scope", "$attrs", "$element"];
    function TextController($scope, $attrs, $element) {
        var vm = this;
        TextController.super.apply(vm, arguments);
    }
    TextController.prototype = {
        exclude: ["$attr", "$$element", "bingoText", "label", "options"],
        initControl: function(scope, attrs, element){

        }
    };
    return BaseWidgetController.prototype.successor(TextController);
});