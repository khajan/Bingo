/**
 @file checkbox.js
 @directive BingoCheckbox
 @description
 The following directive will be used to manage checkbox
 @author khajan.singh
 @date 7/31/2015
 */
"use strict";

define([
    "angular",
    "bingo/scripts/widgets/html5/controllers/checkbox-controller"
], function (angular, CheckboxController) {
    var checkboxModule = angular.module("bingo.widgets.html5.checkbox", []);
    checkboxModule.directive("bingoCheckbox", BingoCheckbox);
    BingoCheckbox.$inject = ["$timeout", "$parse"];
    function BingoCheckbox($timeout, $parse) {
        var template = '<div class="checkbox" ng-attr-bingo-label="{{label? label: null}}" bingo-validation="true">'+
            '<label class="checkbox" ng-repeat="item in ::items track by $index">' +
                '<input ng-attr-id="{{widgetId? widgetId+\'input\'+$index: null}}" type="checkbox" ng-checked="::isChecked(item)" ng-value="item" ng-click="toggle(item, $index)"/>' +
            '<span ng-bind="itemLabel? item[itemLabel]: item"></span>'+
            '</label></div>';
        var directive = {
            restrict: "EA",
            replace: true,
            require: ["ngModel", "bingoCheckbox"],
            controller: CheckboxController,
            template: template,
            scope: {
                ngModel: "=",
                label: "=?",
                items: "=?",
                itemLabel: "=?"
            },
            compile: BingoCheckboxCompile
        };
        return directive;

        function BingoCheckboxCompile(tElement, tAttrs, transclude) {
            if(tAttrs.name){
                tElement.find('input').attr("name", tAttrs.name);
            }
            return {
                post: function BingoCheckboxCompilePost(scope, element, attrs, ctrls){
                    var ngModelCtrl = ctrls[0], radioCtrl = ctrls[1];
                    radioCtrl.initNgModel(ngModelCtrl);

                    //$timeout(function(){
                    //    radioCtrl.populate(element);
                    //    scope.$apply();
                    //});
                }
            }
        }
    }

    return checkboxModule;
});