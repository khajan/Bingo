/**
 @file number.js
 @directive BingoNumber
 @description
 The following directive will be used to manage number
 @author khajan.singh
 @date 8/3/2015
 */
"use strict";

define([
    "angular",
    "bingo/scripts/widgets/html5/controllers/number-controller"
], function (angular, NumberController) {
    var numberModule = angular.module("bingo.widgets.html5.number", ["bingo.widgets.html5.number-controller"]);
    numberModule.directive("bingoNumber", BingoNumber);
    BingoNumber.$inject = [];
    function BingoNumber() {
        var template = "<input class='form-control' type='number' ng-attr-bingo-label='{{label? label: null}}' bingo-validation>";
        var directive = {
            restrict: "EA",
            replace: true,
            require: ["ngModel", "bingoNumber"],
            controller: NumberController,
            template: template,
            scope: {
                ngModel: "=",
                label: "=?"
            },
            compile: BingoNumberCompile
        };
        return directive;

        function BingoNumberCompile(tElement, tAttrs){
            return {
                post: function BingoNumberCompilePost(scope, element, attrs, ctrls) {
                    var ngModelCtrl = ctrls[0], numberCtrl = ctrls[1];
                    numberCtrl.initNgModel(ngModelCtrl);
                }
            }
        }

    }

    return numberModule;
});