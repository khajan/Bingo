/**
 @file validation.js
 @directive BingoValidation
 @description
 The following directive will be used to manage validation
 @author khajan.singh
 @date 8/5/2015
 */
"use strict";

define([
    "angular",
    "angular-messages"
], function (angular) {
    var validationModule = angular.module("bingo.commons.directives.validation", ["ngMessages"]);
    validationModule.directive("bingoValidation", BingoValidation);
    BingoValidation.$inject = ["$compile"];
    function BingoValidation($compile) {
        var concat = String.prototype.concat;
        var directive = {
            restrict: "EA",
            require: "^?ngModel",
            link: BingoValidationLink
        };
        return directive;
        function BingoValidationLink(scope, element, attrs, ngCtrl) {
            //console.log(scope, element, attrs, ngCtrl);
            //console.log(scope, element, attrs, ngCtrl);
            var widgetId = scope.widgetId? scope.widgetId+"-validations": null;
                var formAndField = concat.call("$parent.", scope.formName, ".", ngCtrl.$name), formSubmitted = concat.call("$parent.", scope.formName, ".$submitted"),
                    formTouched = concat.call("", formAndField, ".$touched"), formError = concat.call("",formAndField, ".$error"),
                    condition = concat.call("", concat.call("(",formTouched, " && ", formError, ")"));
            var template = $('<div id="'+widgetId+'" class="validation-errors" ng-messages="'+condition+'" ng-messages-multiple></div>');
            var children = [];
            angular.forEach(ngCtrl.$validators, function(value, key){
                children.push($('<small class="error error-'+key+'" ng-message="'+key+'"><div>Validation Error</div></small>'))
            });
            template.html(children);
            $compile(template)(scope).insertAfter(element);
        }
    }

    return validationModule;
});