/**
 * @file data-store.js
 * @store DataStore
 * @description
 The following store will be used to manage data
 * @author Khajan.Singh
 * @date 6/27/2015
 */
"use strict";

define([
    "angular",
    "bingo/scripts/commons/models/store"
], function (angular, store) {
    store.service("DataStore", DataStore);
    DataStore.$inject = ["$http"];
    function DataStore($http) {
        this.http = $http;
    }
    DataStore.prototype = {
        constructor: DataStore,
        get: function(url, params){
            return this.http.get(url, params)
        }
    };
    return DataStore;
});