/**
 @file textarea.js
 @directive BingoTextarea
 @description
 The following directive will be used to manage textarea
 @author khajan.singh
 @date 8/5/2015
 */
"use strict";

define([
    "angular",
    "bingo/scripts/widgets/html5/controllers/textarea-controller"
], function (angular, TextAreaController) {
    var textAreaModule = angular.module("bingo.widgets.html5.textarea", []);
    textAreaModule.directive("bingoTextarea", BingoTextArea);
    BingoTextArea.$inject = [];
    function BingoTextArea() {
        var template = "<input class='form-control' type='textarea' ng-attr-bingo-label='{{label? label: null}}' bingo-validation>";
        var directive = {
            restrict: "EA",
            replace: true,
            require: ["ngModel", "bingoTextarea"],
            controller: TextAreaController,
            template: template,
            scope: {
                ngModel: "=",
                label: "=?"
            },
            link: BingoTextAreaLink
        };
        return directive;

        function BingoTextAreaLink(scope, element, attrs, ctrls) {
            var ngModelCtrl = ctrls[0], textAreaCtrl = ctrls[1];
            textAreaCtrl.initNgModel(ngModelCtrl);
        }
    }

    return textAreaModule;
});