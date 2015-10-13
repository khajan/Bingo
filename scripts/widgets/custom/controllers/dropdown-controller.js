/**
 @file dropdown-controller.js
 @controller DropdownController
 @description
 The following controller will be used to manage dropdown
 @author skhajan
 @date 8/18/2015
 */
"use strict";

define([
    "angular",
    "bingo/scripts/commons/controllers/base-widget-controller"
], function (angular, BaseWidgetController) {
    var controllerModule = angular.module("bingo.widgets.html5.dropdown-controller", []);
    controllerModule.controller("DropdownController", DropdownController);
    DropdownController.$inject = ["$scope", "$attrs", "$element"];
    function DropdownController($scope, $attrs, $element) {
        var vm = this;
        $scope.selectedLabel = $scope.ngModel;
        $scope.options = $scope.options || {};
        if($scope.options["showBlank"]){
            var obj = " ";
            if($scope.itemLabel){
                obj = {};
                obj[$scope.itemLabel] = "";
            }
            $scope.items.unshift(obj);
        }
        $scope.selectItem = function(item, index){
            this.$parent.selectedIndex = index;
            this.$parent.selectedLabel = $scope.itemLabel? item[$scope.itemLabel]: item;
            var ngModel = $element.data('$ngModelController');
            ngModel.$setTouched();
            ngModel.$setViewValue(item);
        };
        vm.setValidators = function(ngModelCntrl){
            var _self = this;
            ngModelCntrl.$isEmpty = function(ngModelValue){
                console.log('$isEmpty', ngModelValue);
                return !ngModelValue || !ngModelValue[$scope.itemLabel];
            }
        };
        DropdownController.super.apply(vm, arguments);

    }
    return BaseWidgetController.prototype.successor(DropdownController);
});