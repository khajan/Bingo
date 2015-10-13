/**
 @file dropdown.js
 @directive BingoDropdown
 @description
 The following directive will be used to manage dropdown
 @author khajan.singh
 @date 8/18/2015
 */
"use strict";

define([
    "angular",
    "bootstrap",
    "bingo/scripts/widgets/custom/controllers/dropdown-controller"
], function (angular, bootstrap, DropdownController) {
    var dropdownModule = angular.module("bingo.widgets.custom.dropdown", []);
    dropdownModule.directive("bingoDropdown", BingoDropdown);
    BingoDropdown.$inject = [];
    function BingoDropdown() {
        var directive = {
            restrict: "EA",
            replace: true,
            require: ["ngModel", "bingoDropdown"],
            controller: DropdownController,
            templateUrl: "../scripts/widgets/custom/partials/dropdown.html",
            scope: {
                ngModel: "=",
                label: "=?",
                items: "=",
                itemLabel: "=?",
                options: "=?"
            },
            link: BingoDropdownLink
        };
        return directive;

        function BingoDropdownLink(scope, element, attrs, ctrls) {
            var ngModelCtrl = ctrls[0], dropdownCtrl = ctrls[1];
            dropdownCtrl.initNgModel(ngModelCtrl);
        }
    }

    return dropdownModule;
});