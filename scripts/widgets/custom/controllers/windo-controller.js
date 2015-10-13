/**
 @file window-controller.js
 @controller WindowController
 @description
 The following controller will be used to manage windo
 @author skhajan
 @date 8/20/2015
 */
"use strict";

define([
    "angular",
    "bingo/scripts/commons/controllers/base-widget-controller"
], function (angular, BaseWidgetController) {
    var controllerModule = angular.module("bingo.widgets.custom.windo-controller", []);
    controllerModule.controller("WindowController", WindowController);
    WindowController.$inject = ["$scope", "$attrs", "$element"];
    function WindowController($scope, $attrs, $element) {
        var vm = this;
        WindowController.super.apply(vm, arguments);
    }
    return BaseWidgetController.prototype.successor(WindowController);
});