/**
 * @file property-descriptor.js
 * @descriptor PropertyDescriptor
 * @description
 The following descriptor will be used to manage property
 * @author Khajan.Singh
 * @date 6/27/2015
 */
"use strict";

define([
    "angular",
    "bingo/scripts/commons/services"
], function (angular, services) {
    app.service("Property", PropertyDescriptor);
    PropertyDescriptor.$inject = [];
    function PropertyDescriptor() {
        //return this;
    }
    var defaultSetter = function(value){ this.meta['key'] = value; };
    function funct(fn, key){
        var anonymous = null;
        eval("anonymous = " + fn.toString().replace(/key/g, key));
        return anonymous;
    }

    PropertyDescriptor.prototype = {
        constructor: PropertyDescriptor,
        configurable: false,
        enumerable: true,
        type: function(type, key, configurable){
            var property = {constructor: PropertyDescriptor}
            property.configurable = configurable? configurable: false;
            //this.writable = writable? writable: false;
            property.key = key;
            var getter = funct(function(){ return this.meta['key']; }, key);
            switch(type){
                case "string":
                    property.get = funct(function(){ return this.meta['key']; }, key);;
                    property.set = funct(function(value){ this.meta['key'] = value; }, key);
                    break;
                case "integer":
                    property.get = funct(function(){ return this.meta['key']; }, key);;
                    property.set = funct(function(value){ this.meta['key'] = typeof value === "string"? parseInt(value) : value; }, key);
                    break;
                case "number":
                    property.get = funct(function(){ return this.meta['key']; }, key);;
                    property.set = funct(function(value){ this.meta['key'] = typeof value === "string"? parseFloat(parseFloat(value).toFixed(2)) : value; }, key);
                    break;
                case "date":
                    property.get = getter;
                    property.set = funct(function(value) {
                        var date = value;
                        if(typeof date === 'string'){
                            date = Date.parse(date);
                        }
                        this.meta['key']= date;
                    }, key);
                    break;
                case "array":
                    property.get = getter;
                    property.set = funct(function (value) {
                        if(typeof value === 'string'){
                            value = value.split(",");
                        }
                        this.meta['key'] = value;
                    }, key);
                    property.enumerable = true;
                    break;
                case "time":
                    property.get = getter;
                    property.set = funct(function (value) {
                        if(typeof value === "number"){
                            var hours = parseInt(value/3600000).toFixed();
                            var hourMod = value % 3600000;
                            var number = parseFloat((hourMod) / 60000);
                            var minutes = number.toFixed(2).split(".")[1];
                            var seconds = parseFloat(hourMod%1000).toFixed(2).split(".")[1];
                            value = String.prototype.concat(hours, ":", minutes, ":", seconds)
                        }
                        this.meta['key'] = value;
                    }, key)
                    break;
                case "object":
                    property.get = getter;
                    property.set = funct(
                        function (value) {
                            this.meta['key'] = value;
                        },
                        key
                    )
            }
            return property;
        }
    };
    return PropertyDescriptor;
});