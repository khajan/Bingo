define([
    'angular',
    "bingo/scripts/index"
], function(angular){
    var app = angular.module('app', ['bingo']);
    app.config([
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        function($locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide){
            app.controller = $controllerProvider.register;
            app.directive  = $compileProvider.directive;
            app.filter     = $filterProvider.register;
            app.factory    = $provide.factory;
            app.service    = $provide.service;
            $locationProvider.html5Mode({ enabled: true, requireBase: false });
        }
    ]);

    app.controller("DemoController", DemoController);
    DemoController.$inject = ["$scope"];
    function DemoController($scope){
        $scope.label = "Dummy Label";
        $scope.textObject = {
            value: "Khajan Singh",
            label: "Name",
            options: {},
            required: true
        }
        var items = [{name: "Khajan Singh"}, {name: "Yogesh Kumar"}, {name: "Shalini Singh"}];
        $scope.checks = {
            items: items,
            selected: items.slice(0,1),
            label: "Names",
            itemLabel: 'name'
        };
        $scope.numberObject = {
            value: 123,
            label: "Number Field"
        };
        $scope.radioObject = {
            items: ["Radio 1", "Radio 2", "Radio 3", "Radio 4"],
            selected: "Radio 1",
            label: "Radio Names"
        };
        $scope.textAreaObject = {
            value: "I Love my India :)",
            label: "Quote",
            required: true
        };

        $scope.timeObject = {
            value: "08:34:45",
            label: "Time Picker"
        }
        $scope.combo = {
            label: "Combo Field",
            selected: null,
            itemLabel: "name",
            options: {showBlank: true},
            items: [
                {"name": "Empty Array"},
                {"name": "Array of Strings"},
                {"name": "Array of Numbers"},
                {"name": "Array of Booleans"},
                {"name": "Array of Arrays"},
                {"name": "Array of Objects"},
                {"name": "Array with Mixed Types"}
            ]
        };
        $scope.options1 = {showProgress: true, animate: true, classes: "progress-bar-success progress-bar-striped active" }
        $scope.options2 = {showProgress: true, animate: true,
            classes: ["progress-bar-success", "progress-bar-warn progress-bar-striped", "progress-bar-danger"]
        }
        $scope.progressValues = [20, 15, 29]


    }
    return app;
});