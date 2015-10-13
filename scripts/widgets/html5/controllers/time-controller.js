/**
 @file time-controller.js
 @controller TimeController
 @description
 The following controller will be used to manage time
 @author skhajan
 @date 8/5/2015
 */
"use strict";

define([
    "angular",
    "bingo/scripts/commons/controllers/base-widget-controller"
], function (angular, BaseWidgetController) {
    var controllerModule = angular.module("bingo.widgets.html5.time-controller", []);
    controllerModule.controller("TimeController", TimeController);
    TimeController.$inject = ["$scope", "$attrs", "$element", "$locale", "$filter"];
    var AM = "AM", PM = "PM";
    var TIME_FORMATS = /((?:[^Hhmsa']+)|(?:'(?:[^']|'')*')|(?:H+|h+|m+|s+|\ a|a|Z))(.*)/;
    var SERVER_TIME_FORMAT = "(0[0-9]|1[0-9]|2[0-3])(:(0[0-9]|[1-5][0-9])){0,2}";
    var TIME_EXP = {
        H: "([0-9]|1[0-9]|2[0-3])",
        HH: "(0[0-9]|1[0-9]|2[0-3])",
        h: "([0-9]|1[0-2])",
        hh: "(0[0-9]|1[0-2])",
        m: "(:([0-5][0-9]))?",
        mm: "(:(0[0-9]|[1-5][0-9]))?",
        s: "(:([0-5][0-9]))?",
        ss: "(:(0[0-9]|[1-5][0-9]))?",
        sss: "(:(00[0-9]|0[1-9][0-9]||[1-9][0-9][0-9]))?",
        a: "("+ AM + "|" + AM.toLowerCase()+ "|" + PM + "|" + PM.toLowerCase() +")?",
        " a": "(\ "+ AM + "|\ " + AM.toLowerCase()+ "|\ " + PM + "|\ " + PM.toLowerCase() +")?"
    }, concatFunc = String.prototype.concat, filter = null;

    function TimeController($scope, $attrs, $element, $locale, $filter) {
        var vm = this;
        filter = $filter;
        $.extend(true, $scope, this.defaultConfig);
        vm.isMeridian = $scope.format.indexOf("a");
        vm.is12HourFormat = $scope.format.indexOf("hh") || $scope.format.indexOf("h");
        $scope.pattern = this.getExpression($scope.format);
        TimeController.super.apply(vm, arguments);
    }

    TimeController.prototype = {
        defaultConfig: {
            step: 1,
            format: "hh:mma",
            showSpinner: false,
            keyboardNavigation: true
        },
        /**
         * The following method takes preferences as a argument and manipulate the regular expression for time
         * on the basis of preferences.
         * @param preferences
         * @returns {String}
         * @private
         */
        getExpression: function BuildExpression(format){
            var exp = "^(("+SERVER_TIME_FORMAT+")|(", match = null;
            while (format) {
                match = TIME_FORMATS.exec(format);
                if (match) {
                    format = match.pop();
                    var chunk = TIME_EXP[match.pop()];
                    exp = concatFunc.call(exp, (chunk? chunk: ""));
                } else {
                    exp = concatFunc.call(exp, TIME_EXP[format]);
                    format = null;
                }
            }
            return exp+"))$";
        },
        addMinutes: function addMinutes( minutes ) {
            var dt = new Date( this.time + minutes * 60000 );
            var ngModelCtrl = this.ngModelCtrl, value = filter('date')(dt, this.$scope.format);
            ngModelCtrl.$viewValue = value;
            ngModelCtrl.$render();
        },
        incrementHours: function() {
            return this.addMinutes( this.$scope.step * 60 );
        },
        decrementHours: function() {
            return this.addMinutes(-this.$scope.step * 60);
        },
        incrementMinutes: function() {
            return this.addMinutes( this.$scope.step );
        },
        decrementMinutes: function() {
            return this.addMinutes( - this.$scope.step );
        },
        incrementSeconds: function() {
            return this.addMinutes( this.$scope.step/60 );
        },
        decrementSeconds: function() {
            return this.addMinutes( - this.$scope.step/60);
        },
        toggleMeridian: function() {
            this.addMinutes( 12 * 60 * (( new Date(this.time).getHours() < 12 ) ? 1 : -1) );
        },
        increment: function (cursor, index) {
            if(cursor == 'h' || cursor == 'H'){
                this.incrementHours();
            }else if(cursor == 'm' && index < 5){
                this.incrementMinutes();
            }else if(cursor == 's'){
                this.incrementSeconds();
            }else{
                this.toggleMeridian();
            }
        },
        decrement: function (cursor, index) {
            if(cursor == 'h' || cursor == 'H'){
                this.decrementHours();
            }else if(cursor == 'm' && index < 5){
                this.decrementMinutes();
            }else if(cursor == 's'){
                this.decrementSeconds();
            }else{
                this.toggleMeridian();
            }
        },
        /**
         * The following method getDateTime takes time string as an argument and returns date object. The date
         * object represent today's date but includes hours, minutes & seconds from the time string.
         * @param time
         * @returns {Date}
         */
        getDateTime: function(time){
            console.log("getDateTime", time);
            var date = new Date(), timeSeparator = ":";
            if(time) {
                var splits = time.split(timeSeparator),
                    hours = isNaN(parseInt(splits[0])) ? 0 : parseInt(splits[0]), minutes = 0, seconds = 0;
                if (splits.length == 3) {
                    minutes = parseInt(splits[1].length == 1? splits[1]+"0": splits[1]);
                    seconds = parseInt(splits[2].length == 1? splits[2]+"0": splits[2]);
                    if(/(p|P)?/.exec(splits[2]).shift()){
                        hours += 12;
                    }
                } else if (splits.length == 2) {
                    minutes = parseInt(splits[1].length == 1? splits[1]+"0": splits[1]);
                }
                date.setHours(hours);
                date.setMinutes(minutes);
                date.setSeconds(seconds);
                this.time = date.getTime();
                if (this.isMeridian) {
                    var addHours = (time.toLowerCase().indexOf(PM.toLowerCase()) != -1) ? 12 : 0;
                    date.setHours(date.getHours() + addHours);
                }

            }
            return date;
        },
        setupMouseEvents: function SetupMouseEvents(scope, attrs, element){
            var isScrollingUp = function(e) {
                if (e.originalEvent) {
                    e = e.originalEvent;
                }
                //pick correct delta variable depending on event
                var delta = (e.wheelDelta) ? e.wheelDelta : -e.deltaY;
                return (e.detail || delta > 0);
            };
            var self = this;
            element.bind('mousewheel wheel', function(e) {
                var index = self.getCaretPosition(element);
                var func = (isScrollingUp(e)) ? self.increment : self.decrement;
                func.call(self, scope.format[index], index);
                e.preventDefault();
                scope.$digest();
            });
        },
        setupKeyboardEvents: function setupKeyboardEvents(scope, attrs, element){
            var self = this;
            element
                .bind('keydown', function(e) {
                    var index = self.getCaretPosition(element);
                    var func = e.which === 38 ? self.increment : (e.which === 40 ? self.decrement: null);
                    if(func){
                        func.call(self, scope.format[index], index);
                    }
                    e.preventDefault();
                    scope.$digest();
                }
            );
        },
        setValidators: function (ngModelCtrl) {
            //this.addValidation()
        }
    };
    return BaseWidgetController.prototype.successor(TimeController);
});