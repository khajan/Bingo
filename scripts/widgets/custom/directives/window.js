/**
 @file window.js
 @directive BingoWindow
 @description
 The following directive will be used to manage window
 @author khajan.singh
 @date 8/20/2015
 */
"use strict";

define([
    "angular",
    "bingo/scripts/widgets/custom/controllers/window-controller"
], function (angular, WindowController) {
    var windowModule = angular.module("bingo.widgets.custom.window", []);
    windowModule.
        directive("bingoWindowHeader", BingoWindowHeader).
        directive("bingoWindowBody", BingoWindowBody).
        directive("bingoWindowFooter", BingoWindowFooter).
        directive("bingoWindow", BingoWindow);

    BingoWindowHeader.$inject = [];
    BingoWindowBody.$inject = [];
    BingoWindowFooter.$inject = [];
    BingoWindow.$inject = [];

    function BingoWindowHeader(){
        var directive = {
            restrict: "EA",
            scope: {
                title: "=?",
                iconClass: "="
            }
        }
    }
    function BingoWindowBody(){}
    function BingoWindowFooter(){}
    function BingoWindow() {
        var directive = {
            restrict: "EA",
            require: ["bingoWindow"],
            controller: WindowController,
            templateUrl: "../scripts/widgets/custom/partials/window.html",
            scope: {},
            link: BingoWindowLink
        };
        return directive;

        function BingoWindowLink(scope, element, attrs, ctrl) {

        }
    }
    return windowModule;
});