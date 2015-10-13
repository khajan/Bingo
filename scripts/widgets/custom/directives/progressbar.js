/**
 @file progressbar.js
 @directive BingoProgressBar
 @description
 The following directive will be used to manage progressBar
 @author khajan.singh
 @date 8/19/2015
 */
"use strict";

define([
    "angular",
    "bootstrap",
    "bingo/scripts/widgets/custom/controllers/progressBar-controller"
], function (angular, bootstrap, ProgressBarController) {
    var progressBarModule = angular.module("bingo.widgets.custom.progressbar", []);
    progressBarModule.directive("bingoProgressBar", BingoProgressBar);
    BingoProgressBar.$inject = [];
    function BingoProgressBar() {
        var directive = {
            restrict: "EA",
            replace: true,
            require: ["bingoProgressBar"],
            controller: ProgressBarController,
            templateUrl: "../scripts/widgets/custom/partials/progressbar.html",
            scope: {
                value: "=",
                options: "=?"
            },
            link: BingoProgressBarLink
        };
        return directive;

        function BingoProgressBarLink(scope, element, attrs, ctrl) {
        }
    }

    return progressBarModule;
});