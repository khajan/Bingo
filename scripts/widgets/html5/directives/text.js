/**
 @file text.js
 @directive BingoText
 @description
 The following directive will be used to manage input type text
 @author khajan.singh
 @date 7/30/2015
 */
"use strict";

define([
    "angular",
    "bingo/scripts/widgets/html5/controllers/text-controller"
], function (angular, TextController) {
    var inputModule = angular.module("bingo.widgets.html5.text", []);
    inputModule.directive("bingoText", BingoText);
    BingoText.$inject = ["$compile"];
    function BingoText($compile) {
        var template = "<input class='form-control' type='text' ng-attr-bingo-label='{{label? label: null}}' bingo-validation>";
        var directive = {
            restrict: "EA",
            replace: true,
            require: ["ngModel", "bingoText"],
            controller: TextController,
            template: template,
            scope: {
                ngModel: "=",
                label: "=?"
            },
            link: BingoTextLink
        };
        return directive;

        function BingoTextLink(scope, element, attrs, ctrls) {
            var ngModelCtrl = ctrls[0], textCtrl = ctrls[1];
            textCtrl.initNgModel(ngModelCtrl);
        }
    }

    return inputModule;
});