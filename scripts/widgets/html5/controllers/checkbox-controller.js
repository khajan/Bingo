/**
 @file checkbox-controller.js
 @controller CheckboxController
 @description
 The following controller will be used to manage checkbox
 @author skhajan
 @date 7/31/2015
 */
"use strict";

define([
    "angular",
    "bingo/scripts/commons/controllers/base-widget-controller"
], function (angular, BaseWidgetController) {
    var controllerModule = angular.module("bingo.widgets.html5.checkbox-controller", []);
    controllerModule.controller("CheckboxController", CheckboxController);
    CheckboxController.$inject = ["$scope", "$attrs", "$element"];
    function CheckboxController($scope, $attrs, $element) {
        var vm = this;
        if(!($scope.items || $scope.items.length)){ $scope.items = [$scope.itemLabel];}
        $scope.toggle = function toggleCheckbox(item, index, element){
            console.log(arguments);
            var model = angular.copy(this.$parent.ngModel) || [];
            var filtered = model.filter(function(obj){ return angular.equals(item, obj)});
            if(!filtered.length){
                model.push(item);
            }else{
                model.splice(model.indexOf(filtered[item]),1);
            }
            console.log("ngCtrl",this.ngCntrl);
            this.ngCntrl.$setTouched();
            this.ngCntrl.$setViewValue(model);
            return model;
        };
        $scope.isChecked = function(item){
            var model = this.$parent.ngModel || [];
            var filtered = model.filter(function(obj){ return angular.equals(item, obj)});
            console.log("isChecked", item, !!filtered.length)
            return !!filtered.length;
        };
        CheckboxController.super.apply(vm, arguments);
    }

    CheckboxController.prototype = {
        setValidators: function(ngModelCntrl){
            var _self = this;
            this.$scope.ngCntrl = ngModelCntrl;
            ngModelCntrl.$isEmpty = function(ngModelValue){
                console.log('$isEmpty', ngModelValue)
                return !ngModelValue || ngModelValue.length == 0;
            }
        },
        populate: function(element){
            angular.forEach(element.find("input"), function(input){
                var $input = $(input);
                if(this.isChecked($input.parent().data("$scope").item)){
                    $input.prop("checked", true);
                }else{
                    $input.removeAttr("checked");
                }
            }, this);
        }
    };
    return BaseWidgetController.prototype.successor(CheckboxController);
});