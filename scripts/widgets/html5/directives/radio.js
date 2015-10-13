/**
 @file radio.js
 @directive BingoRadio
 @description
 The following directive will be used to manage radio
 @author khajan.singh
 @date 8/4/2015
 */
"use strict";

define([
    "angular",
    "bingo/scripts/widgets/html5/controllers/radio-controller"
], function (angular, RadioController) {
    var radioModule = angular.module("bingo.widgets.html5.radio", []);
    radioModule.directive("bingoRadio", BingoRadio);
    BingoRadio.$inject = ["$parse"];
    function BingoRadio($parse) {
        var template = "<div class='radio' ng-attr-bingo-label='{{label? label: null}}'>" +
            "<label class='radio' ng-repeat='item in items track by $index'>" +
            "<input ng-attr-id='{{widgetId? widgetId+\"input\"+$index: null}}' ng-model='ngModel' ng-value='item' type='radio' ng-click='$parent.ngModel = item'><span ng-bind='itemLabel? item[itemLabel]: item'></span>" +
            "</label>" +
            "</div>";
        var directive = {
            restrict: "EA",
            replace: true,
            require: ["ngModel", "bingoRadio"],
            controller: RadioController,
            template: template,
            scope: {
                ngModel: "=",
                label: "=?",
                items: "=?",
                itemLabel: "=?"
            },
            compile: BingoRadioCompile
        };
        return directive;

        function BingoRadioCompile(tElement, tAttrs, tTransclude){
            if(tAttrs.name){
                tElement.find('input').attr("name", tAttrs.name);
            }
            return {
                post: function BingoRadioPostCompile(scope, element, attrs, ctrls){
                    var ngModelCtrl = ctrls[0], radioCtrl = ctrls[1];
                    radioCtrl.initNgModel(ngModelCtrl);
                }
            }
        }
    }

    return radioModule;
});