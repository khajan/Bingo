/**
    @file label.js
    @directive Label
    @description
        This is the main module of bingo's html5 label widget.
    @author skhajan
    @date 7/30/2015
 */
"use strict";

define([
    "angular"
], function(angular){
    var labelModule = angular.module("bingo.widgets.html5.label", []);
    labelModule.directive("bingoLabel", BingoLabel);
    BingoLabel.$inject = ["$compile"];
    function BingoLabel($compile){
        var template = "<span class='control-label' ng-class='{required: isRequired}' ng-bind='label'></span>";
        var directive = {
            restrict: "A",
            replace: true,
            link: BingoLabelLink
        };
        return directive;

        function BingoLabelLink(scope, element, attrs, ctrl){
            if(scope.isFormElement){
                $compile(template)(scope).insertBefore(element);
            }else{
                $compile(template)(scope).appendTo(element);
            }
        }
    }
    return labelModule;
});