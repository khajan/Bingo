/**
 @file model.js
 @directive BingoModel
 @description
 The following directive will be used to manage model
 @author khajan.singh
 @date 8/9/2015
 */
"use strict";

define([
    "angular"
], function (angular) {
    var modelModule = angular.module("bingo.commons.directives.model", []);
    modelModule.directive("bingoModel", BingoModel);
    BingoModel.$inject = ["$compile"];
    function BingoModel($compile) {
        var directive = {
            restrict: "EA",
            replace: true,
            require: "^?form",
            link: BingoModelLink
        };
        return directive;

        function BingoModelLink(scope, element, attrs, ctrls) {

        }
    }

    return modelModule;
});