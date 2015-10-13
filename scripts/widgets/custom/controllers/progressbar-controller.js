/**
 @file progressbar-controller.js
 @controller ProgressbarController
 @description
 The following controller will be used to manage progressbar
 @author skhajan
 @date 8/19/2015
 */
"use strict";

define([
    "angular",
    "bingo/scripts/commons/controllers/base-widget-controller"
], function (angular, BaseWidgetController) {
    var controllerModule = angular.module("bingo.widgets.custom.progressbar-controller", []);
    controllerModule.controller("ProgressbarController", ProgressbarController);
    ProgressbarController.$inject = ["$scope", "$attrs", "$element"];
    function ProgressbarController($scope, $attrs, $element) {
        var vm = this;
        var defaultOptions = {
            animate: false,
            type: "default",
            min: 0,
            max: 100,
            showProgress: false
        };
        vm.addBar = function(bar) {
            bar.min = $scope.options.min;
            bar.max = $scope.options.max;
            bar.message = bar.value + "%";
            bar.recalculatePercentage = function() {
                var self = this;
                this.percent = +(100 * this.value / this.max).toFixed(2);

                var totalPercentage = $scope.bars.reduce(function(total, bar) {
                    return total + self.percent;
                }, 0);

                if (totalPercentage > 100) {
                    this.percent -= totalPercentage - 100;
                }
            };
            $scope.bars.push(bar);
        };
        vm.removeBar = function(bar) {
            $scope.bars.splice($scope.bars.indexOf(bar), 1);
        };
        ProgressbarController.super.apply(vm, arguments);
        $scope.bars = [];
        var options = angular.extend({}, defaultOptions,  $scope.options);
        $scope.options = options;
        if(angular.isArray($scope.value)){
            angular.forEach($scope.value, function(v, index){
                vm.addBar({
                    value: v,
                    classes: angular.isArray(options.classes)? options.classes[index]: options.classes
                });
            });
        }else{
            vm.addBar({
                value: $scope.value,
                classes: options.classes
            });
        }
        $scope.$watch('max', function(newMax, oldMax) {
            if(newMax != oldMax){
                $scope.bars.forEach(function(bar) {
                    bar.max = max;
                    bar.recalculatePercentage();
                });
            }
        });
        $scope.$on('$destroy', function() {
            $scope.bars.forEach(function(bar) {
                vm.removeBar(bar);
            });
        });
    }
    return BaseWidgetController.prototype.successor(ProgressbarController);
});