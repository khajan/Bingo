/**
 @file time.js
 @directive BingoTime
 @description
 The following directive will be used to manage time
 @author khajan.singh
 @date 8/5/2015
 */
"use strict";

define([
    "angular",
    "bingo/scripts/widgets/html5/controllers/time-controller"
], function (angular, TimeController) {
    var timeModule = angular.module("bingo.widgets.html5.time", []);
    timeModule.directive("bingoTime", BingoTime);
    BingoTime.$inject = ["$filter"];
    function BingoTime($filter) {
        var template = '<input class="form-control" type="text" ' +
            ' ng-attr-bingo-label="{{label? label: null}}" bingo-validation ng-pattern="pattern">';
        var directive = {
            restrict: "EA",
            replace: true,
            require: ["ngModel", "bingoTime"],
            controller: TimeController,
            template: template,
            scope: {
                ngModel: "=",
                label: "=?",
                step: "=?",
                format: "=?",
                showSpinner: "=?",
                keyboardNavigation: "=?"
            },
            compile: BingoTimeCompile
        };
        return directive;

        function BingoTimeCompile(tElement, tAttrs, tTransclude) {
            return {
                post: function BingoTimePostCompile(scope, element, attrs, ctrls) {
                    var ngModelCtrl = ctrls[0], timeCtrl = ctrls[1];
                    timeCtrl.initNgModel(ngModelCtrl);
                    timeCtrl.ngModelCtrl = ngModelCtrl;
                    var self = this;
                    ngModelCtrl.$formatters.unshift(function TimeFormatter(value){
                        var v = value? $filter('date')(timeCtrl.getDateTime(value), scope.format): null;
                        console.log("formatted", v);
                        return v;
                    });
                    ngModelCtrl.$parsers.unshift(function TimeParser(value){
                        var v = value && value.trim() ? (value.match(scope.pattern)? $filter('date')(timeCtrl.getDateTime(value), "HH:mm:ss"): value): null;
                        console.log("parser", v);
                        return v ;
                    });
                    element.bind('blur', function TimeInputBlurEvent(e){
                        if(ngModelCtrl && ngModelCtrl.$valid){
                            var value = $(this).val();
                            angular.forEach(ngModelCtrl.$formatters, function(formatter){
                                value = formatter.call(scope, value);
                            });
                            console.log("Blured value", value);
                            ngModelCtrl.$viewValue = value;
                            ngModelCtrl.$render();
                        }
                    });
                }
            }
        }
    }

    return timeModule;
});