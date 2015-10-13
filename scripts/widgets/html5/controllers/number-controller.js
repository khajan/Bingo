/**
 @file number-controller.js
 @controller NumberController
 @description
 The following controller will be used to manage number
 @author skhajan
 @date 8/3/2015
 */
"use strict";

define([
    "angular",
    "bingo/scripts/commons/controllers/base-widget-controller"
], function (angular, BaseWidgetController) {
    var controllerModule = angular.module("bingo.widgets.html5.number-controller", []);
    controllerModule.controller("NumberController", NumberController);
    NumberController.$inject = ["$scope", "$attrs", "$element"];
    function NumberController($scope, $attrs, $element) {
        var vm = this;
        NumberController.super.apply(vm, arguments);
    }
    NumberController.prototype = {
        regex: /^[0-9]*$/i,
        setValidators: function(ngModelCntrl){
            var _self = this;
            ngModelCntrl.$validators["number"] = function NumberValidator(modelValue, viewValue){
                return _self.regex.test(viewValue);
            }
        }
    };
    return BaseWidgetController.prototype.successor(NumberController);
});